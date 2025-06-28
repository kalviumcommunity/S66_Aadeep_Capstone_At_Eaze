const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const crypto = require("crypto");
const Order = require("../models/Order");
const Product = require("../models/Product");
const Razorpay = require("razorpay");
const { protect, authorize } = require("../middlewares/auth");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Get all orders (admin only)
router.get("/", [protect, authorize("admin")], async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "name price")
      .populate("items.vendor", "name vendorDetails.shopName")
      .sort("-createdAt");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get user orders
router.get("/my-orders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("items.product", "name price images")
      .populate("items.vendor", "name vendorDetails.shopName")
      .sort("-createdAt");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get vendor orders
router.get(
  "/vendor-orders",
  [protect, authorize("vendor")],
  async (req, res) => {
    try {
      const orders = await Order.find({ "items.vendor": req.user.id })
        .populate("user", "name email")
        .populate("items.product", "name price")
        .sort("-createdAt");

      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Create order
router.post(
  "/",
  [
    protect,
    body("items").isArray().withMessage("Items must be an array"),
    body("items.*.product").isMongoId().withMessage("Invalid product ID"),
    body("items.*.quantity")
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),
    body("shippingAddress")
      .isObject()
      .withMessage("Shipping address is required"),
    body("shippingAddress.street").notEmpty().withMessage("Street is required"),
    body("shippingAddress.city").notEmpty().withMessage("City is required"),
    body("shippingAddress.state").notEmpty().withMessage("State is required"),
    body("shippingAddress.country")
      .notEmpty()
      .withMessage("Country is required"),
    body("shippingAddress.zipCode")
      .notEmpty()
      .withMessage("Zip code is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { items, shippingAddress } = req.body;

      // Wrap order creation in a try-catch block for rollback
      let newOrder;
      try {
        // Calculate total amount and validate products
        let totalAmount = 0;
        const orderItems = [];

        for (const item of items) {
          const product = await Product.findById(item.product);
          if (!product || !product.isActive) {
            return res.status(400).json({
              message: `Product with ID ${item.product} not found or is inactive.`,
            });
          }

          if (product.stock < item.quantity) {
            return res
              .status(400)
              .json({ message: `Insufficient stock for ${product.name}` });
          }

          totalAmount += product.price * item.quantity;
          orderItems.push({
            product: product._id,
            quantity: item.quantity,
            price: product.price,
            vendor: product.vendor,
          });
        }

        // Create Razorpay order before creating our own
        const razorpayOrder = await razorpay.orders.create({
          amount: totalAmount * 100, // Razorpay expects amount in paise
          currency: "INR",
          receipt: `receipt_order_${Date.now()}`,
        });

        newOrder = new Order({
          user: req.user.id,
          items: orderItems,
          shippingAddress,
          totalAmount,
          razorpayOrderId: razorpayOrder.id,
        });

        await newOrder.save();

        // After order is successfully created, update stock
        for (const item of newOrder.items) {
          await Product.updateOne(
            { _id: item.product },
            { $inc: { stock: -item.quantity } }
          );
        }

        res.status(201).json({
          order: newOrder,
          razorpayOrder,
        });
      } catch (error) {
        // If anything fails, rollback the order if it was created
        if (newOrder && newOrder._id) {
          await Order.findByIdAndDelete(newOrder._id);
        }
        console.error("ORDER_CREATION_ERROR:", error);
        res
          .status(500)
          .json({ message: "Failed to create order. Please try again." });
      }
    } catch (error) {
      console.error("OUTER_ORDER_ERROR:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Update order status (vendor/admin only)
router.patch(
  "/:id/status",
  [
    protect,
    authorize("vendor", "admin"),
    body("status")
      .isIn(["processing", "shipped", "delivered", "cancelled"])
      .withMessage("Invalid status"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Check if vendor is authorized to update this order
      if (req.user.role === "vendor") {
        const vendorItems = order.items.filter(
          (item) => item.vendor.toString() === req.user.id
        );
        if (vendorItems.length === 0) {
          return res
            .status(403)
            .json({ message: "Not authorized to update this order" });
        }
      }

      order.status = req.body.status;
      await order.save();

      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Verify payment
router.post(
  "/verify-payment",
  [
    protect,
    body("razorpay_order_id").notEmpty().withMessage("Order ID is required"),
    body("razorpay_payment_id")
      .notEmpty()
      .withMessage("Payment ID is required"),
    body("razorpay_signature").notEmpty().withMessage("Signature is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;

      const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Verify signature
      const generated_signature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      if (generated_signature !== razorpay_signature) {
        // Generic error message for security
        return res
          .status(400)
          .json({ message: "Payment verification failed." });
      }

      order.paymentInfo = {
        id: razorpay_payment_id,
        status: "completed",
        type: "razorpay",
      };
      order.razorpayPaymentId = razorpay_payment_id;
      order.razorpaySignature = razorpay_signature;
      order.status = "processing";

      await order.save();

      res.json({ message: "Payment verified successfully" });
    } catch (error) {
      console.error("PAYMENT_VERIFICATION_ERROR:", error);
      res
        .status(500)
        .json({ message: "An error occurred during payment verification." });
    }
  }
);

module.exports = router;
