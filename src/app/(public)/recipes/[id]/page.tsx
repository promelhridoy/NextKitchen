import type { Metadata } from "next";
import RecipeDetailClient from "@/components/recipe/RecipeDetailClient";
import { getRecipeDetail } from "@/data/recipeDetailData";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const recipe = getRecipeDetail(id);
  return {
    title: recipe?.title ?? "Recipe",
    description: recipe?.description ?? "Discover this recipe on NestKitchen.",
  };
}

export default async function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <RecipeDetailClient recipeId={id} />;
}