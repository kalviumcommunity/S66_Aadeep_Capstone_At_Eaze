const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: ["Home Decor", "Jewelry", "Art", "Clothing", "Accessories", "Other"],
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ratings: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      review: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  averageRating: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Calculate average rating before saving
productSchema.pre("save", function (next) {
  if (this.ratings.length > 0) {
    this.averageRating =
      this.ratings.reduce((acc, item) => acc + item.rating, 0) /
      this.ratings.length;
  }
  next();
});

productSchema.statics.recalculateAverageRating = async function (productId) {
  const product = await this.findById(productId);
  if (!product) return;
  if (product.ratings.length > 0) {
    product.averageRating =
      product.ratings.reduce((acc, item) => acc + item.rating, 0) /
      product.ratings.length;
  } else {
    product.averageRating = 0;
  }
  await product.save();
};

productSchema.post(["findOneAndUpdate", "updateOne"], async function (doc) {
  if (doc && doc._id) {
    await doc.constructor.recalculateAverageRating(doc._id);
  }
});

module.exports = mongoose.model("Product", productSchema);
