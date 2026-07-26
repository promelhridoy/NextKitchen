// app/(admin)/admin/recipes/page.tsx
import type { Metadata } from "next";
import RecipesManagerClient from "@/components/admin/RecipesManagerClient";

export const metadata: Metadata = { title: "Manage Recipes" };

export default function AdminRecipesPage() {
  return <RecipesManagerClient />;
}