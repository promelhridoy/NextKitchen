"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Eye, Heart } from "lucide-react";
import RecipeCard from "@/components/recipe/RecipeCard";
import { SAMPLE_RECIPES } from "@/data/homeData";

const TABS = [
  { key: "trending", label: "Trending", icon: Flame },
  { key: "mostViewed", label: "Most Viewed", icon: Eye },
  { key: "mostLiked", label: "Most Liked", icon: Heart },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function TrendingClient() {
  const [activeTab, setActiveTab] = useState<TabKey>("trending");

  // TODO(wire-up): replace with separate API calls per tab:
  // GET /api/recipes?sort=newest (trending), ?sort=mostViewed, ?sort=mostLiked
  const getRecipes = () => {
    const list = [...SAMPLE_RECIPES];
    if (activeTab === "mostViewed") return list.sort((a, b) => b.ratingCount - a.ratingCount);
    if (activeTab === "mostLiked") return list.sort((a, b) => b.likeCount - a.likeCount);
    return list.sort((a, b) => b.averageRating - a.averageRating);
  };

  const recipes = getRecipes();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">What&apos;s Hot Right Now</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          See what the NestKitchen community is cooking, viewing, and loving this week
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-8 flex justify-center">
        <div className="inline-flex gap-1 rounded-2xl border border-gray-200 bg-white p-1 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative flex items-center gap-1.5 rounded-2xl px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive ? "text-white" : "text-gray-600 dark:text-gray-300"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="trending-tab-bg"
                    className="absolute inset-0 rounded-2xl bg-orange-500"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <tab.icon size={15} className="relative z-10" />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}