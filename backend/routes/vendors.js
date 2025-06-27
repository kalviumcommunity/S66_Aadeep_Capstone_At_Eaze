const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { protect, authorize } = require("../middlewares/auth");

// Get vendor profile
router.get("/profile", [protect, authorize("vendor")], async (req, res) => {
  try {
    const vendor = await User.findById(req.user.id)
      .select("-password")
      .populate({
        path: "products",
        match: { isActive: true },
      });

    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update vendor profile
router.put(
  "/profile",
  [
    protect,
    authorize("vendor"),
    body("vendorDetails.shopName")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Shop name cannot be empty"),
    body("vendorDetails.description").optional().trim(),
    body("vendorDetails.address").optional().trim(),
    body("vendorDetails.phone").optional().trim(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const vendor = await User.findById(req.user.id);
      if (!vendor) {
        return res.status(404).json({ message: "Vendor not found" });
      }

      if (req.body.vendorDetails) {
        vendor.vendorDetails = {
          ...vendor.vendorDetails,
          ...req.body.vendorDetails,
        };
      }

      await vendor.save();

      // Filter the response to avoid leaking sensitive data
      const vendorData = {
        _id: vendor._id,
        name: vendor.name,
        email: vendor.email,
        isVendor: vendor.isVendor,
        vendorDetails: vendor.vendorDetails,
      };

      res.json(vendorData);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Get vendor statistics
router.get("/stats", [protect, authorize("vendor")], async (req, res) => {
  try {
    const vendor = await User.findById(req.user.id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const stats = await Promise.all([
      // Total products
      Product.countDocuments({ vendor: vendor._id, isActive: true }),
      // Total orders
      Order.countDocuments({ "items.vendor": vendor._id }),
      // Total revenue
      Order.aggregate([
        { $match: { "items.vendor": vendor._id } },
        { $unwind: "$items" },
        { $match: { "items.vendor": vendor._id } },
        {
          $group: {
            _id: null,
            total: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
          },
        },
      ]),
      // Average rating
      Product.aggregate([
        { $match: { vendor: vendor._id } },
        { $unwind: "$ratings" },
        {
          $group: {
            _id: null,
            averageRating: { $avg: "$ratings.rating" },
          },
        },
      ]),
    ]);

    res.json({
      totalProducts: stats[0],
      totalOrders: stats[1],
      totalRevenue: stats[2][0]?.total || 0,
      averageRating: stats[3][0]?.averageRating || 0,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get vendor products
router.get("/products", [protect, authorize("vendor")], async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const products = await Product.find({ vendor: req.user.id })
      .sort("-createdAt")
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Product.countDocuments({ vendor: req.user.id });

    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get vendor orders
router.get("/orders", [protect, authorize("vendor")], async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const { status } = req.query;
    const query = { "items.vendor": req.user.id };

    if (status) {
      query.status = status;
    }

    const orders = await Order.find(query)
      .populate("user", "name email")
      .populate("items.product", "name price")
      .sort("-createdAt")
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Order.countDocuments(query);

    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
