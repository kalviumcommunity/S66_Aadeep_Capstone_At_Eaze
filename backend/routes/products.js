const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Product = require("../models/Product");
const { protect, authorize } = require("../middlewares/auth");

// Get all products
router.get("/", async (req, res) => {
  try {
    const { category, search, sort, page = 1, limit = 10 } = req.query;
    const query = { isActive: true };

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const sortOptions = {
      "price-asc": { price: 1 },
      "price-desc": { price: -1 },
      "rating-desc": { averageRating: -1 },
      newest: { createdAt: -1 },
    };

    const products = await Product.find(query)
      .sort(sortOptions[sort] || { createdAt: -1 })
      .populate("vendor", "name vendorDetails.shopName")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("vendor", "name vendorDetails.shopName")
      .populate("ratings.user", "name");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create product (vendor only)
router.post(
  "/",
  [
    protect,
    authorize("vendor"),
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required"),
    body("price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
    body("category")
      .isIn([
        "Home Decor",
        "Jewelry",
        "Art",
        "Clothing",
        "Accessories",
        "Other",
      ])
      .withMessage("Invalid category"),
    body("stock")
      .isInt({ min: 0 })
      .withMessage("Stock must be a non-negative integer"),
    body("images").isArray().withMessage("Images must be an array"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const product = new Product({
        ...req.body,
        vendor: req.user.id,
      });

      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Update product (vendor only)
router.put(
  "/:id",
  [
    protect,
    authorize("vendor"),
    body("name")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Name cannot be empty"),
    body("description")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Description cannot be empty"),
    body("price")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
    body("category")
      .optional()
      .isIn([
        "Home Decor",
        "Jewelry",
        "Art",
        "Clothing",
        "Accessories",
        "Other",
      ])
      .withMessage("Invalid category"),
    body("stock")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Stock must be a non-negative integer"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.vendor.toString() !== req.user.id) {
        return res
          .status(403)
          .json({ message: "Not authorized to update this product" });
      }

      Object.assign(product, req.body);
      await product.save();

      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Delete product (vendor only)
router.delete("/:id", [protect, authorize("vendor")], async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.vendor.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this product" });
    }

    product.isActive = false;
    await product.save();

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add product rating
router.post(
  "/:id/ratings",
  [
    protect,
    body("rating")
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be between 1 and 5"),
    body("review").optional().trim(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const { rating, review } = req.body;

      // Check if user has already rated
      const existingRating = product.ratings.find(
        (r) => r.user.toString() === req.user.id
      );

      if (existingRating) {
        existingRating.rating = rating;
        existingRating.review = review;
      } else {
        product.ratings.push({
          user: req.user.id,
          rating,
          review,
        });
      }

      await product.save();
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
