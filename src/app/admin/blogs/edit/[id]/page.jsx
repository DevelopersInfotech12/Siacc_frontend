"use client";
import AdminBlogFormScreen from "@/app/screens/AdminBlogFormScreen";
import { use } from "react";

export default function Page({ params }) {
  const { id } = use(params);
  return <AdminBlogFormScreen blogId={id} />;
}