import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  Clock, 
  Users, 
  ChefHat, 
  ArrowLeft, 
  Heart, 
  Share2, 
  Bookmark, 
  Utensils, 
  CheckCircle2 
} from "lucide-react";

// Mock data array for demonstration (Later you can replace this with database/API call)
const MOCK_RECIPES = [
  {
    id: "1",
    title: "Classic Creamy Pasta Alfredo",
    description: "A rich and delicious Italian pasta cooked with garlic butter, heavy cream, parmesan, and fresh herbs.",
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281318?auto=format&fit=crop&q=80&w=1200",
    prepTime: "15 mins",
    cookTime: "20 mins",
    servings: 4,
    category: "Italian",
    author: {
      name: "Chef John",
      avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=200",
      role: "Head Chef"
    },
    ingredients: [
      "250g Fettuccine pasta",
      "1/2 cup heavy cream",
      "1/2 cup unsalted butter",
      "1 cup freshly grated Parmesan cheese",
      "3 cloves garlic, minced",
      "Fresh parsley, chopped",
      "Salt and freshly cracked black pepper to taste"
    ],
    instructions: [
      "Bring a large pot of salted water to a boil. Cook fettuccine according to package instructions until al dente.",
      "Melt butter in a large skillet over medium heat. Add minced garlic and sauté for 1 minute until fragrant.",
      "Pour in heavy cream and let it simmer for 3-4 minutes until slightly thickened.",
      "Stir in grated Parmesan cheese until melted and smooth.",
      "Toss cooked pasta into the sauce until thoroughly coated.",
      "Garnish with chopped fresh parsley and fresh black pepper before serving."
    ]
  }
];

interface RecipePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RecipeDetailsPage({ params }: RecipePageProps) {
  // Next.js 15+ dynamic params unwrapping
  const resolvedParams = await params;
  const recipeId = resolvedParams.id;

  // Fetch recipe (Using mock for demo; fallback to first mock recipe or trigger notFound)
  const recipe = MOCK_RECIPES.find((r) => r.id === recipeId) || MOCK_RECIPES[0];

  if (!recipe) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50/50 py-8 dark:bg-gray-950 sm:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400"
          >
            <ArrowLeft size={18} />
            Back to Explore
          </Link>
        </div>

        {/* Header Section */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600 dark:bg-orange-950/50 dark:text-orange-400">
              {recipe.category}
            </span>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
              {recipe.title}
            </h1>
            <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
              {recipe.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button 
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-600 transition-all hover:bg-red-50 hover:text-red-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-red-950/30"
              aria-label="Favorite"
            >
              <Heart size={18} />
            </button>
            <button 
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-600 transition-all hover:bg-orange-50 hover:text-orange-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-orange-950/30"
              aria-label="Bookmark"
            >
              <Bookmark size={18} />
            </button>
            <button 
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-600 transition-all hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
              aria-label="Share"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative mb-8 h-72 w-full overflow-hidden rounded-3xl border border-gray-100 bg-gray-100 dark:border-gray-800 dark:bg-gray-800 sm:h-96 lg:h-[420px]">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        </div>

        {/* Quick Info Banner */}
        <div className="mb-10 grid grid-cols-2 gap-4 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:grid-cols-4 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 dark:bg-orange-950/50 dark:text-orange-400">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Prep Time</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{recipe.prepTime}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 dark:bg-orange-950/50 dark:text-orange-400">
              <Utensils size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Cook Time</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{recipe.cookTime}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 dark:bg-orange-950/50 dark:text-orange-400">
              <Users size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Servings</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{recipe.servings} People</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 dark:bg-orange-950/50 dark:text-orange-400">
              <ChefHat size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Author</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{recipe.author.name}</p>
            </div>
          </div>
        </div>

        {/* Content Section: Ingredients & Instructions */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Ingredients Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
                Ingredients
              </h2>
              <ul className="flex flex-col gap-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-orange-500" />
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Instructions Column */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">
              <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-gray-100">
                Instructions
              </h2>
              <ol className="flex flex-col gap-6">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-sm font-bold text-white shadow-sm">
                      {index + 1}
                    </span>
                    <p className="pt-1 text-sm leading-relaxed text-gray-700 dark:text-gray-300 sm:text-base">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}