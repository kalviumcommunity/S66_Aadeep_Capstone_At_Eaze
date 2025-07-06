const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { protect, authorize } = require("../middlewares/auth");
const { handleError } = require("../utils/errorHandler");

// Seller Application Model
const SellerApplication = require("../models/SellerApplication");

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
    handleError(error, req, res, "fetch vendor profile");
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
      handleError(error, req, res, "update vendor profile");
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
    handleError(error, req, res, "fetch vendor statistics");
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
    handleError(error, req, res, "fetch vendor products");
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
    handleError(error, req, res, "fetch vendor orders");
  }
});

// Submit seller application
router.post(
  "/applications",
  [
    protect,
    body("name")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Please enter a valid email address"),
    body("phone")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Please enter a valid phone number"),
    body("businessName")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Business name must be at least 2 characters"),
    body("category")
      .trim()
      .notEmpty()
      .withMessage("Please select a primary category"),
    body("experience")
      .trim()
      .notEmpty()
      .withMessage("Please select your experience level"),
    body("description")
      .trim()
      .isLength({ min: 20 })
      .withMessage("Description must be at least 20 characters"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Check if user already has a pending or approved application
      const existingApplication = await SellerApplication.findOne({
        user: req.user.id,
        status: { $in: ["pending", "approved"] },
      });

      if (existingApplication) {
        return res.status(400).json({
          message: "You already have a pending or approved seller application",
        });
      }

      // Create new seller application
      const application = new SellerApplication({
        user: req.user.id,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        businessName: req.body.businessName,
        website: req.body.website,
        category: req.body.category,
        experience: req.body.experience,
        description: req.body.description,
        images: req.body.images || [],
        submittedAt: req.body.submittedAt || new Date(),
        status: "pending",
      });

      await application.save();

      res.status(201).json({
        message: "Seller application submitted successfully",
        application: {
          id: application._id,
          status: application.status,
          submittedAt: application.submittedAt,
        },
      });
    } catch (error) {
      console.error("Seller application error:", {
        error: error.message,
        stack: error.stack,
        userId: req.user?.id,
        endpoint: "/vendors/applications",
        method: "POST",
      });

      // Provide more specific error messages for common issues
      if (error.name === "ValidationError") {
        return res.status(400).json({
          message: "Validation error",
          details: Object.values(error.errors).map((err) => err.message),
        });
      }

      if (error.code === 11000) {
        return res.status(409).json({
          message: "Application already exists for this user",
        });
      }

      res.status(500).json({
        message: "Failed to submit seller application. Please try again.",
      });
    }
  }
);

// Get seller application status (for users to check their application)
router.get("/applications/status", protect, async (req, res) => {
  try {
    const application = await SellerApplication.findOne({
      user: req.user.id,
    }).sort("-submittedAt");

    if (!application) {
      return res.status(404).json({
        message: "No seller application found",
      });
    }

    res.json({
      application: {
        id: application._id,
        status: application.status,
        submittedAt: application.submittedAt,
        reviewedAt: application.reviewedAt,
        feedback: application.feedback,
      },
    });
  } catch (error) {
    handleError(error, req, res, "fetch seller application status");
  }
});

module.exports = router;
