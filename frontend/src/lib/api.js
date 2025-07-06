const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function fetchProducts(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/products?${query}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProductById(id) {
  const res = await fetch(`${API_URL}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

// File Upload Functions
export async function uploadFile(file, type = "image") {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);

  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to upload file");
  }

  return res.json();
}

export async function uploadMultipleFiles(files, type = "image") {
  const formData = new FormData();
  files.forEach((file, index) => {
    formData.append(`files`, file);
  });
  formData.append("type", type);

  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/upload/multiple`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to upload files");
  }

  return res.json();
}

// Product Management with File Upload
export async function createProduct(productData, images = []) {
  const token = localStorage.getItem("token");

  // First upload images if provided
  let imageUrls = [];
  if (images.length > 0) {
    try {
      const uploadResult = await uploadMultipleFiles(images, "product");
      imageUrls = uploadResult.urls;
    } catch (error) {
      throw new Error(`Failed to upload images: ${error.message}`);
    }
  }

  // Then create product with image URLs
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...productData,
      images: imageUrls,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to create product");
  }

  return res.json();
}

export async function updateProduct(productId, productData, images = []) {
  const token = localStorage.getItem("token");

  // First upload new images if provided
  let imageUrls = productData.images || [];
  if (images.length > 0) {
    try {
      const uploadResult = await uploadMultipleFiles(images, "product");
      imageUrls = [...imageUrls, ...uploadResult.urls];
    } catch (error) {
      throw new Error(`Failed to upload images: ${error.message}`);
    }
  }

  // Then update product with image URLs
  const res = await fetch(`${API_URL}/products/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...productData,
      images: imageUrls,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to update product");
  }

  return res.json();
}

// Auth Functions
export async function login(credentials) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }

  return res.json();
}

export async function register(userData) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Registration failed");
  }

  return res.json();
}

export async function googleAuth(token) {
  const res = await fetch(`${API_URL}/auth/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Google authentication failed");
  }

  return res.json();
}

// Order Functions
export async function fetchOrders(role = "user") {
  const token = localStorage.getItem("token");
  const endpoint = role === "admin" ? "/orders" : "/orders/my-orders";

  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    if (res.status === 403) {
      throw new Error("You do not have permission to view these orders");
    }
    throw new Error("Failed to fetch orders");
  }

  return res.json();
}

export async function createOrder(orderData) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to create order");
  }

  return res.json();
}

export async function verifyPayment(paymentData) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/orders/verify-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paymentData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Payment verification failed");
  }

  return res.json();
}

export function decodeJWT(token) {
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export function getUserRole() {
  const token = localStorage.getItem("token");
  const decoded = decodeJWT(token);
  return decoded?.user?.role || decoded?.role || null;
}
