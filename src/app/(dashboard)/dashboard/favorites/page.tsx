// app/(dashboard)/dashboard/favorites/page.tsx
import type { Metadata } from "next";
import FavoritesClient from "@/components/dashboard/FavoritesClient";

export const metadata: Metadata = { title: "Favorites" };

export default function FavoritesPage() {
  return <FavoritesClient />;
}