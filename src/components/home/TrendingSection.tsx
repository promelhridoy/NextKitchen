import { Flame } from "lucide-react";
import RecipeCard from "@/components/recipe/RecipeCard";
import { SAMPLE_RECIPES } from "@/data/homeData";

export default function TrendingSection() {
  const trending = SAMPLE_RECIPES.slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-orange-100 text-orange-500 dark:bg-orange-900/40">
            <Flame size={18} />
          </span>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Trending Now</h2>
        </div>
        <a href="/trending" className="text-sm font-semibold text-orange-500 hover:underline">
          View all
        </a>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {trending.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </section>
  );
}