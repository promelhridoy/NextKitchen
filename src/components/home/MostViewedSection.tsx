import { Eye } from "lucide-react";
import RecipeCard from "@/components/recipe/RecipeCard";
import { SAMPLE_RECIPES } from "@/data/homeData";

export default function MostViewedSection() {
  const mostViewed = [...SAMPLE_RECIPES].sort((a, b) => b.ratingCount - a.ratingCount).slice(0, 4);

  return (
    <section className="bg-gray-50 py-16 dark:bg-gray-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-orange-100 text-orange-500 dark:bg-orange-900/40">
            <Eye size={18} />
          </span>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Most Viewed</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {mostViewed.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </section>
  );
}