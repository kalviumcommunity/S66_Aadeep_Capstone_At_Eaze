// MongoDB initialization script
// This script runs when the MongoDB container starts for the first time

// Create the at-eaze database
db = db.getSiblingDB("at-eaze");

// Create a user for the application with read/write permissions
db.createUser({
  user: "at-eaze-user",
  pwd: "at-eaze-password",
  roles: [
    {
      role: "readWrite",
      db: "at-eaze",
    },
  ],
});

// Create collections with proper indexes
db.createCollection("users");
db.createCollection("products");
db.createCollection("orders");
db.createCollection("sellerapplications");

// Create indexes for better performance
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ googleId: 1 }, { sparse: true });
db.users.createIndex({ role: 1 });

db.products.createIndex({ vendor: 1 });
db.products.createIndex({ category: 1 });
db.products.createIndex({ isActive: 1 });
db.products.createIndex({ name: "text", description: "text" });
db.products.createIndex({ averageRating: -1 });
db.products.createIndex({ createdAt: -1 });

db.orders.createIndex({ user: 1 });
db.orders.createIndex({ "items.vendor": 1 });
db.orders.createIndex({ status: 1 });
db.orders.createIndex({ createdAt: -1 });
db.orders.createIndex({ razorpayOrderId: 1 }, { unique: true });

db.sellerapplications.createIndex({ user: 1 });
db.sellerapplications.createIndex({ status: 1 });
db.sellerapplications.createIndex({ submittedAt: -1 });

print("MongoDB initialization completed successfully!");
print("Database: at-eaze");
print("User: at-eaze-user");
print("Collections created: users, products, orders, sellerapplications");
