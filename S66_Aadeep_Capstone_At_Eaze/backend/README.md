# At Eaze Backend

Backend for At Eaze - A Multi-Vendor E-Commerce Platform for Handmade Gifts.

## Features

- User Authentication (JWT + Google OAuth)
- Multi-vendor System
- Product Management
- Order Processing
- Payment Integration (Razorpay)
- Rating & Review System

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Google OAuth
- Razorpay Payment Gateway

## API Endpoints

### Authentication

- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user
- POST `/api/auth/google` - Google OAuth login
- GET `/api/auth/me` - Get current user

### Products

- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get single product
- POST `/api/products` - Create product (vendor)
- PUT `/api/products/:id` - Update product (vendor)
- DELETE `/api/products/:id` - Delete product (vendor)
- POST `/api/products/:id/ratings` - Add product rating

### Orders

- GET `/api/orders` - Get all orders (admin)
- GET `/api/orders/my-orders` - Get user orders
- GET `/api/orders/vendor-orders` - Get vendor orders
- POST `/api/orders` - Create order
- PATCH `/api/orders/:id/status` - Update order status
- POST `/api/orders/verify-payment` - Verify payment

### Vendors

- GET `/api/vendors/profile` - Get vendor profile
- PUT `/api/vendors/profile` - Update vendor profile
- GET `/api/vendors/stats` - Get vendor statistics
- GET `/api/vendors/products` - Get vendor products
- GET `/api/vendors/orders` - Get vendor orders

### File Upload (Cloudinary)

- POST `/api/upload` - Upload single image
- POST `/api/upload/multiple` - Upload multiple images
- DELETE `/api/upload/:public_id` - Delete image from cloud

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` file:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/at_eaze
JWT_SECRET=your_jwt_secret_key_here
GOOGLE_CLIENT_ID=your_google_client_id_here
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here

# Cloudinary Configuration (Free image hosting)
# Sign up at https://cloudinary.com/ for free account
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

3. Start development server:

```bash
npm run dev
```

## Environment Variables

- `PORT` - Server port (default: 4000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `RAZORPAY_KEY_ID` - Razorpay API key ID
- `RAZORPAY_KEY_SECRET` - Razorpay API key secret
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
