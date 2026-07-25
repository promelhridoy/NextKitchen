import type { Metadata } from "next";
import RecipeForm from "@/components/recipe/RecipeForm";

export const metadata: Metadata = {
  title: "Add Recipe",
};

export default function AddRecipePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Add a New Recipe</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Share a dish you love — fill in the details below and publish, or save it as a draft to finish later.
        </p>
      </div>
      <RecipeForm />
    </div>
  );
}