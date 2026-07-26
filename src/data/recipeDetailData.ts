import { SAMPLE_RECIPES } from "@/data/homeData";
import { FEATURED_CREATORS } from "@/data/homeData";

export interface RecipeDetail {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  gallery: string[];
  videoUrl?: string;
  cookTime: number;
  prepTime: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  cuisine: string;
  tags: string[];
  averageRating: number;
  ratingCount: number;
  views: number;
  likeCount: number;
  author: { id: string; name: string; avatar: string; bio: string; followerCount: number };
  ingredients: { id: string; name: string; quantity: string }[];
  steps: { id: string; instruction: string }[];
  nutrition: { calories: number; protein: number; carbs: number; fat: number };
}

const AUTHOR_LOOKUP: Record<string, { bio: string; followerCount: number }> = {
  u1: { bio: "Home cook sharing traditional Bengali family recipes", followerCount: 12400 },
  u2: { bio: "Ex-restaurant chef turned home cooking teacher", followerCount: 28900 },
  u3: { bio: "Modern Korean fusion, one gochujang jar at a time", followerCount: 9800 },
  u4: { bio: "Home-style Indian cooking, no fancy equipment needed", followerCount: 15600 },
  u5: { bio: "Classically trained, cooking French comfort food at home", followerCount: 8200 },
  u6: { bio: "Thai flavors made approachable for weeknight dinners", followerCount: 6100 },
};

// TODO(wire-up): replace with GET /api/recipes/:id
export function getRecipeDetail(id: string): RecipeDetail | undefined {
  const base = SAMPLE_RECIPES.find((r) => r.id === id);
  if (!base) return undefined;

  const authorMeta = AUTHOR_LOOKUP[base.author.id] ?? { bio: "Home cook on NestKitchen", followerCount: 0 };

  return {
    id: base.id,
    title: base.title,
    description:
      "A comforting, restaurant-quality dish made entirely from pantry staples and fresh ingredients. This recipe has been tested and refined over dozens of family dinners — every step is written the way I actually cook it.",
    coverImage: base.coverImage,
    gallery: [base.coverImage, base.coverImage, base.coverImage],
    videoUrl: undefined,
    cookTime: base.cookTime,
    prepTime: Math.round(base.cookTime * 0.4),
    servings: 4,
    difficulty: base.difficulty,
    category: base.category,
    cuisine: base.category,
    tags: [base.category.toLowerCase(), base.difficulty.toLowerCase(), "homemade"],
    averageRating: base.averageRating,
    ratingCount: base.ratingCount,
    views: base.ratingCount * 23,
    likeCount: base.likeCount,
    author: {
      id: base.author.id,
      name: base.author.name,
      avatar: base.author.avatar,
      bio: authorMeta.bio,
      followerCount: authorMeta.followerCount,
    },
    ingredients: [
      { id: "i1", name: "Onions, thinly sliced", quantity: "3 large" },
      { id: "i2", name: "Garlic cloves, minced", quantity: "6 cloves" },
      { id: "i3", name: "Ginger, grated", quantity: "1 tbsp" },
      { id: "i4", name: "Main protein of choice", quantity: "1 kg" },
      { id: "i5", name: "Cooking oil", quantity: "4 tbsp" },
      { id: "i6", name: "Salt", quantity: "to taste" },
      { id: "i7", name: "Fresh herbs, chopped", quantity: "1/4 cup" },
    ],
    steps: [
      { id: "s1", instruction: "Heat oil in a heavy-bottomed pan over medium heat. Add the sliced onions and cook until deeply golden, about 12-15 minutes, stirring occasionally." },
      { id: "s2", instruction: "Add garlic and ginger, cook for another 1-2 minutes until fragrant." },
      { id: "s3", instruction: "Add the main protein and sear on all sides until browned." },
      { id: "s4", instruction: "Reduce heat, cover, and let simmer until fully cooked through and tender." },
      { id: "s5", instruction: "Season with salt to taste, garnish with fresh herbs, and serve hot." },
    ],
    nutrition: { calories: 420, protein: 32, carbs: 18, fat: 24 },
  };
}

export function getRelatedRecipes(currentId: string, category: string, limit = 4) {
  return SAMPLE_RECIPES.filter((r) => r.id !== currentId && r.category === category).slice(0, limit);
}