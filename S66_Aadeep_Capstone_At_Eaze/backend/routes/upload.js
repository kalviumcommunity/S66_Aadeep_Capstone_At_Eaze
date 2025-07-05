const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { protect } = require("../middlewares/auth");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer for memory storage (no local files)
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Single file upload to Cloudinary
router.post("/", protect, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Convert buffer to base64
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "at-eaze",
      resource_type: "auto",
      transformation: [
        { width: 800, height: 600, crop: "limit" }, // Resize for optimization
        { quality: "auto" }, // Auto optimize quality
      ],
    });

    res.json({
      message: "File uploaded successfully",
      url: result.secure_url,
      public_id: result.public_id,
      filename: req.file.originalname,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({ message: "Error uploading file to cloud" });
  }
});

// Multiple files upload to Cloudinary
router.post(
  "/multiple",
  protect,
  upload.array("files", 5),
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      const uploadPromises = req.files.map(async (file) => {
        const b64 = Buffer.from(file.buffer).toString("base64");
        const dataURI = `data:${file.mimetype};base64,${b64}`;

        return cloudinary.uploader.upload(dataURI, {
          folder: "at-eaze",
          resource_type: "auto",
          transformation: [
            { width: 800, height: 600, crop: "limit" },
            { quality: "auto" },
          ],
        });
      });

      const results = await Promise.all(uploadPromises);
      const urls = results.map((result) => result.secure_url);

      res.json({
        message: "Files uploaded successfully",
        urls: urls,
        count: req.files.length,
      });
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      res.status(500).json({ message: "Error uploading files to cloud" });
    }
  }
);

// Delete file from Cloudinary
router.delete("/:public_id", protect, async (req, res) => {
  try {
    const { public_id } = req.params;

    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result === "ok") {
      res.json({ message: "File deleted successfully" });
    } else {
      res.status(400).json({ message: "Failed to delete file" });
    }
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    res.status(500).json({ message: "Error deleting file" });
  }
});

// Error handling middleware for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ message: "File too large. Maximum size is 5MB" });
    }
    if (error.code === "LIMIT_FILE_COUNT") {
      return res
        .status(400)
        .json({ message: "Too many files. Maximum is 5 files" });
    }
    return res.status(400).json({ message: "File upload error" });
  }

  if (error.message === "Only image files are allowed") {
    return res.status(400).json({ message: error.message });
  }

  res.status(500).json({ message: "Server error" });
});

module.exports = router;
