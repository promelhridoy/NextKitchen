// app/(admin)/admin/categories/page.tsx
import type { Metadata } from "next";
import CategoriesManagerClient from "@/components/admin/CategoriesManagerClient";

export const metadata: Metadata = { title: "Manage Categories" };

export default function AdminCategoriesPage() {
  return <CategoriesManagerClient />;
}