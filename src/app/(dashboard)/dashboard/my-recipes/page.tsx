// app/(dashboard)/dashboard/my-recipes/page.tsx
import type { Metadata } from "next";
import MyRecipesClient from "@/components/dashboard/MyRecipesClient";

export const metadata: Metadata = { title: "My Recipes" };

export default function MyRecipesPage() {
  return <MyRecipesClient />;
}