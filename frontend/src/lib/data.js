// Mock data for products, categories, and sellers
// Note: This file contains mock data that should be replaced with real API calls

export const products = [
  {
    id: "1",
    name: "Handcrafted Ceramic Mug",
    price: 24.99,
    description:
      "Beautiful hand-thrown ceramic mug with a unique glaze pattern. Perfect for your morning coffee or tea.",
    category: "Home Decor",
    seller: "Pottery Paradise",
    rating: 4.8,
    reviews: 127,
    images: ["/placeholder.svg"],
    inStock: true,
    featured: true,
  },
  // ... rest of the products array
];

export const categories = [
  {
    id: "1",
    name: "Home Decor",
    description: "Beautiful handmade items to enhance your living space",
    imageUrl: "/placeholder.svg",
  },
  // ... rest of the categories array
];

export const sellers = [
  {
    id: "1",
    name: "Pottery Paradise",
    location: "Portland, OR",
    rating: 4.9,
    products: 45,
    description: "Specializing in handcrafted ceramic pieces for your home.",
    imageUrl: "/placeholder.svg",
  },
  // ... rest of the sellers array
];

// Helper functions
export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}

export function getProductById(id) {
  return products.find((product) => product.id === id);
}

export function getSellerById(id) {
  return sellers.find((seller) => seller.id === id);
}
