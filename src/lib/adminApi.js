"use client";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const getToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("blog_admin_token") : null;

const authHdr = () => ({
  "Content-Type": "application/json",
  ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
});

const handle = async (res) => {
  const d = await res.json();
  if (!res.ok) throw new Error(d.message || "Request failed");
  return d;
};

export const api = {
  login: (e, p) =>
    fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: authHdr(),
      body: JSON.stringify({ email: e, password: p }),
    }).then(handle),

  me: () => fetch(`${BASE_URL}/auth/me`, { headers: authHdr() }).then(handle),

  blogs: (q = {}) =>
    fetch(`${BASE_URL}/blogs?${new URLSearchParams(q)}`, { headers: authHdr() }).then(handle),

  stats: () => fetch(`${BASE_URL}/blogs/stats`, { headers: authHdr() }).then(handle),

  getById: (id) => fetch(`${BASE_URL}/blogs/${id}`, { headers: authHdr() }).then(handle),

  create: (d) =>
    fetch(`${BASE_URL}/blogs`, {
      method: "POST",
      headers: authHdr(),
      body: JSON.stringify(d),
    }).then(handle),

  update: (id, d) =>
    fetch(`${BASE_URL}/blogs/${id}`, {
      method: "PUT",
      headers: authHdr(),
      body: JSON.stringify(d),
    }).then(handle),

  toggleStatus: (id) =>
    fetch(`${BASE_URL}/blogs/${id}/status`, {
      method: "PATCH",
      headers: authHdr(),
    }).then(handle),

  toggleFeatured: (id) =>
    fetch(`${BASE_URL}/blogs/${id}/featured`, {
      method: "PATCH",
      headers: authHdr(),
    }).then(handle),

  delete: (id) =>
    fetch(`${BASE_URL}/blogs/${id}`, {
      method: "DELETE",
      headers: authHdr(),
    }).then(handle),

  bulk: (action, ids) =>
    fetch(`${BASE_URL}/blogs/bulk`, {
      method: "POST",
      headers: authHdr(),
      body: JSON.stringify({ action, ids }),
    }).then(handle),

  uploadImg: (file) => {
    const f = new FormData();
    f.append("image", file);
    return fetch(`${BASE_URL}/upload/image`, {
      method: "POST",
      headers: { Authorization: `Bearer ${getToken()}` },
      body: f,
    }).then(handle);
  },
};
