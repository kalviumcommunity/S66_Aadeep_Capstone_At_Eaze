const mongoose = require("mongoose");

const sellerApplicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    businessName: {
      type: String,
      required: true,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "jewelry",
        "home_decor",
        "pottery",
        "paper_crafts",
        "candles",
        "textiles",
        "woodworking",
        "other",
      ],
    },
    experience: {
      type: String,
      required: true,
      enum: ["beginner", "intermediate", "experienced", "professional"],
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    images: [
      {
        type: String, // Cloudinary URLs
        required: false,
      },
    ],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    reviewedAt: {
      type: Date,
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    feedback: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
sellerApplicationSchema.index({ user: 1, status: 1 });
sellerApplicationSchema.index({ status: 1, submittedAt: -1 });

module.exports = mongoose.model("SellerApplication", sellerApplicationSchema);
