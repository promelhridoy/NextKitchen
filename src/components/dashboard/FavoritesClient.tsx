"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Plus, X, FolderHeart } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import RecipeCard from "@/components/recipe/RecipeCard";
import { FAVORITE_COLLECTIONS, COLLECTION_RECIPES } from "@/data/dashboardData";

export default function FavoritesClient() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [activeCollection, setActiveCollection] = useState(FAVORITE_COLLECTIONS[0]?.id ?? "");
  const [newCollectionOpen, setNewCollectionOpen] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");

  useEffect(() => {
    if (!isPending && !session) router.replace("/login");
  }, [isPending, session, router]);

  if (isPending) return <div className="h-64 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800" />;
  if (!session) return null;

  const recipes = COLLECTION_RECIPES[activeCollection] ?? [];

  const handleCreateCollection = () => {
    if (!newCollectionName.trim()) return;
    toast.success(`Collection "${newCollectionName}" created`);
    setNewCollectionName("");
    setNewCollectionOpen(false);
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Favorites</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Recipes you&apos;ve saved, organized by collection</p>
        </div>
        <button onClick={() => setNewCollectionOpen(true)} className="flex items-center gap-1.5 rounded-2xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600">
          <Plus size={16} /> New Collection
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {FAVORITE_COLLECTIONS.map((c) => {
          const isActive = activeCollection === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setActiveCollection(c.id)}
              className={`relative flex items-center gap-2 overflow-hidden rounded-2xl border px-4 py-2 text-sm font-medium transition-colors ${isActive ? "border-orange-500 bg-orange-50 text-orange-600 dark:border-orange-500/50 dark:bg-orange-900/20 dark:text-orange-400" : "border-gray-200 text-gray-600 hover:border-gray-300 dark:border-gray-700 dark:text-gray-300"}`}
            >
              <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-lg">
                <Image src={c.coverImage} alt={c.name} fill sizes="24px" className="object-cover" />
              </div>
              {c.name}
              <span className="text-xs opacity-60">({c.recipeCount})</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeCollection} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
          {recipes.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-gray-200 py-16 text-center dark:border-gray-800">
              <FolderHeart size={32} className="text-gray-300" />
              <p className="mt-3 text-sm font-medium text-gray-500 dark:text-gray-400">No recipes saved in this collection yet</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {newCollectionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-sm rounded-2xl bg-white p-6 dark:bg-gray-900">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">New Collection</h3>
              <button onClick={() => setNewCollectionOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>
            <input
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              placeholder="e.g. Sunday Brunch Ideas"
              autoFocus
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-orange-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
            <button onClick={handleCreateCollection} className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-2xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600">
              <Heart size={15} /> Create Collection
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}