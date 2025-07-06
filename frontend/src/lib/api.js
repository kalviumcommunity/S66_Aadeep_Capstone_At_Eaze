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
  files.forEach((file) => {
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
