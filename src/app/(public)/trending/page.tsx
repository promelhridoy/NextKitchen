import type { Metadata } from "next";
import TrendingClient from "@/components/trending/TrendingClient";

export const metadata: Metadata = {
  title: "Trending Recipes",
  description: "Discover what's trending, most viewed, and most liked on NestKitchen right now.",
};

export default function TrendingPage() {
  return <TrendingClient />;
}