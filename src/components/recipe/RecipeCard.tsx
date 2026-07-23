"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Star, Heart, ChefHat } from "lucide-react";

export interface Recipe {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  cookTime: number;
  difficulty: "Easy" | "Medium" | "Hard";
  averageRating: number;
  ratingCount: number;
  author: { name: string; avatar: string };
  category: string;
  likeCount: number;
}

const difficultyColor: Record<Recipe["difficulty"], string> = {
  Easy: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400",
  Medium: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400",
  Hard: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
};

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
    >
      <Link href={`/recipes/${recipe.id}`} className="relative block h-48 w-full overflow-hidden">
        <Image
          src={recipe.coverImage}
          alt={recipe.title}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <span className={`absolute left-3 top-3 rounded-2xl px-2.5 py-1 text-xs font-semibold ${difficultyColor[recipe.difficulty]}`}>
          {recipe.difficulty}
        </span>
        <button
          aria-label="Save recipe"
          onClick={(e) => e.preventDefault()}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-2xl bg-white/90 text-gray-600 backdrop-blur-sm transition-colors hover:text-orange-500 dark:bg-gray-900/90 dark:text-gray-300"
        >
          <Heart size={15} />
        </button>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-medium text-orange-500">{recipe.category}</span>
        <Link href={`/recipes/${recipe.id}`}>
          <h3 className="mt-1 line-clamp-2 text-base font-semibold text-gray-900 transition-colors hover:text-orange-500 dark:text-gray-100">
            {recipe.title}
          </h3>
        </Link>

        <div className="mt-3 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Clock size={13} /> {recipe.cookTime} min
          </span>
          <span className="flex items-center gap-1">
            <Star size={13} className="fill-orange-400 text-orange-400" />
            {recipe.averageRating.toFixed(1)} ({recipe.ratingCount})
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <div className="relative h-6 w-6 overflow-hidden rounded-full">
              <Image src={recipe.author.avatar} alt={recipe.author.name} fill sizes="24px" className="object-cover" />
            </div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{recipe.author.name}</span>
          </div>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <ChefHat size={13} /> {recipe.likeCount}
          </span>
        </div>
      </div>
    </motion.div>
  );
}