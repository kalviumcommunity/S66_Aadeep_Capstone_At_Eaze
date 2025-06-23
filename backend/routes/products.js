const express = require("express");
const router = express.Router();
const { body, validationResult, param } = require("express-validator");
const Product = require("../models/Product");
const { protect, authorize } = require("../middleware/auth");

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
router.get(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid product ID")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
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
  }
);

module.exports = router;
