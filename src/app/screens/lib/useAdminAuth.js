"use client";
// src/app/admin/lib/useAdminAuth.js
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { adminApi } from "./api";

export function useAdminAuth() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadAdmin = useCallback(async () => {
    const token = typeof window !== "undefined" && localStorage.getItem("siacc_admin_token");
    if (!token) { setLoading(false); router.replace("/admin/login"); return; }
    try {
      const data = await adminApi.getMe();
      setAdmin(data.admin);
    } catch {
      localStorage.removeItem("siacc_admin_token");
      router.replace("/admin/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => { loadAdmin(); }, [loadAdmin]);

  const logout = () => {
    localStorage.removeItem("siacc_admin_token");
    setAdmin(null);
    router.push("/admin/login");
  };

  return { admin, loading, logout };
}
