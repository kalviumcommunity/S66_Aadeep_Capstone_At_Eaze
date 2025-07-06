# Cloudinary Setup Guide

This guide will help you set up Cloudinary for free image hosting in the At Eaze platform.

## What is Cloudinary?

Cloudinary is a cloud service that provides solutions for image and video management. It offers a generous free tier that includes:
- 25 GB storage
- 25 GB bandwidth per month
- Automatic image optimization
- CDN delivery
- Image transformations

## Setup Steps

### 1. Create a Cloudinary Account

1. Go to [https://cloudinary.com/](https://cloudinary.com/)
2. Click "Sign Up For Free"
3. Fill in your details and create an account
4. Verify your email address

### 2. Get Your Credentials

After logging in to your Cloudinary dashboard:

1. Go to the **Dashboard** section
2. You'll see your credentials:
   - **Cloud Name** (e.g., `my-cloud-name`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz`)

### 3. Configure Environment Variables

Create a `.env` file in the `backend` directory with your Cloudinary credentials:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/at-eaze

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server
PORT=5000

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

### 4. Test the Integration

1. Start your backend server: `npm run dev`
2. Upload an image through the frontend
3. Check your Cloudinary dashboard to see the uploaded image

## Features

### Automatic Image Optimization

Images are automatically:
- Resized to max 800x600 pixels
- Quality optimized
- Served via CDN for fast loading

### Folder Organization

All images are stored in the `at-eaze` folder in your Cloudinary account for easy management.

### Security

- Only authenticated users can upload images
- File type validation (images only)
- File size limits (5MB max)
- Secure URLs with HTTPS

## API Endpoints

- `POST /api/upload` - Upload single image
- `POST /api/upload/multiple` - Upload multiple images
- `DELETE /api/upload/:public_id` - Delete image

## Benefits Over Local Storage

1. **Scalability**: No server storage limits
2. **Performance**: Global CDN delivery
3. **Reliability**: 99.9% uptime guarantee
4. **Cost**: Free tier is generous
5. **Features**: Automatic optimization, transformations
6. **Backup**: Automatic cloud backup

## Troubleshooting

### Common Issues

1. **"Invalid credentials" error**
   - Double-check your Cloudinary credentials in `.env`
   - Ensure no extra spaces in the values

2. **"File too large" error**
   - Images must be under 5MB
   - Use image compression tools if needed

3. **"Only image files allowed" error**
   - Ensure you're uploading image files (JPG, PNG, GIF, etc.)
   - Check file extension and MIME type

### Support

- Cloudinary Documentation: [https://cloudinary.com/documentation](https://cloudinary.com/documentation)
- Cloudinary Support: Available in your dashboard 