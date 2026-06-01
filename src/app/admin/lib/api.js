// src/app/admin/lib/api.js
// Centralised fetch wrapper for the blog-admin backend (http://localhost:5000)

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("siacc_admin_token");
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (res.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("siacc_admin_token");
      window.location.href = "/admin/login";
    }
    throw new Error("Unauthorized");
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

export const adminApi = {
  // Auth
  login: (email, password) =>
    request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  getMe: () => request("/auth/me"),
  changePassword: (currentPassword, newPassword) =>
    request("/auth/change-password", {
      method: "PUT",
      body: JSON.stringify({ currentPassword, newPassword }),
    }),

  // Blogs
  getBlogs: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/blogs${qs ? "?" + qs : ""}`);
  },
  getStats: () => request("/blogs/stats"),
  getBlog: (id) => request(`/blogs/${id}`),
  createBlog: (data) =>
    request("/blogs", { method: "POST", body: JSON.stringify(data) }),
  updateBlog: (id, data) =>
    request(`/blogs/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  toggleStatus: (id) => request(`/blogs/${id}/status`, { method: "PATCH" }),
  toggleFeatured: (id) => request(`/blogs/${id}/featured`, { method: "PATCH" }),
  deleteBlog: (id) => request(`/blogs/${id}`, { method: "DELETE" }),
  bulkAction: (action, ids) =>
    request("/blogs/bulk", { method: "POST", body: JSON.stringify({ action, ids }) }),
  
  uploadImage: async (file) => {
    const token = getToken();
    const form = new FormData();
    form.append("image", file);
    const res = await fetch(`${BASE_URL}/upload/image`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: form,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Upload failed");
    // Fix: prepend backend base (strip /api suffix) if path is relative
    const backendBase = BASE_URL.replace(/\/api$/, "");
    const url = data.url?.startsWith("/")
      ? `${backendBase}${data.url}`
      : data.url;
    return { ...data, url };
  },
};