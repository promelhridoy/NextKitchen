import { Sparkles } from "lucide-react";
import RecipeCard from "@/components/recipe/RecipeCard";
import { SAMPLE_RECIPES } from "@/data/homeData";

export default function EditorsPicksSection() {
  const picks = SAMPLE_RECIPES.slice(2, 6);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400">
          <Sparkles size={18} />
        </span>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Editor&apos;s Picks</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {picks.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </section>
  );
}