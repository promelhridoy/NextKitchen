import type { Metadata } from "next";
import ExploreClient from "@/components/explore/ExploreClient";

export const metadata: Metadata = {
  title: "Explore Recipes",
  description: "Search and filter thousands of homemade recipes by cuisine, difficulty, cooking time, and rating.",
};

export default function ExplorePage() {
  return <ExploreClient />;
}