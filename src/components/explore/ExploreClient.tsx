"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import RecipeCard from "@/components/recipe/RecipeCard";
import { SAMPLE_RECIPES } from "@/data/homeData";
import { CUISINES, DIFFICULTIES, SORT_OPTIONS, COOK_TIME_OPTIONS, RATING_OPTIONS } from "@/data/exploreFilters";

const PAGE_SIZE = 8;

export default function ExploreClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [cuisine, setCuisine] = useState(searchParams.get("cuisine") ?? "");
  const [difficulty, setDifficulty] = useState(searchParams.get("difficulty") ?? "");
  const [maxCookTime, setMaxCookTime] = useState(Number(searchParams.get("maxCookTime") ?? 0));
  const [minRating, setMinRating] = useState(Number(searchParams.get("minRating") ?? 0));
  const [sort, setSort] = useState(searchParams.get("sort") ?? "newest");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Sync filters to URL query string
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (cuisine) params.set("cuisine", cuisine);
    if (difficulty) params.set("difficulty", difficulty);
    if (maxCookTime) params.set("maxCookTime", String(maxCookTime));
    if (minRating) params.set("minRating", String(minRating));
    if (sort !== "newest") params.set("sort", sort);
    router.replace(`/explore?${params.toString()}`, { scroll: false });
  }, [search, category, cuisine, difficulty, maxCookTime, minRating, sort, router]);

  // TODO(wire-up): replace SAMPLE_RECIPES + client-side filtering with
  // TanStack Query -> GET /api/recipes?search=&cuisine=&difficulty=&maxCookTime=&minRating=&sort=&page=
  const filtered = useMemo(() => {
    let result = [...SAMPLE_RECIPES];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((r) => r.title.toLowerCase().includes(q) || r.category.toLowerCase().includes(q));
    }
    if (category) result = result.filter((r) => r.category === category);
    if (cuisine) result = result.filter((r) => r.category === cuisine);
    if (difficulty) result = result.filter((r) => r.difficulty === difficulty);
    if (maxCookTime) result = result.filter((r) => r.cookTime <= maxCookTime);
    if (minRating) result = result.filter((r) => r.averageRating >= minRating);

    if (sort === "mostLiked") result.sort((a, b) => b.likeCount - a.likeCount);
    else if (sort === "topRated") result.sort((a, b) => b.averageRating - a.averageRating);

    return result;
  }, [search, category, cuisine, difficulty, maxCookTime, minRating, sort]);

  const visibleRecipes = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const loadMore = useCallback(() => setVisibleCount((c) => c + PAGE_SIZE), []);

  const clearFilters = () => {
    setCategory("");
    setCuisine("");
    setDifficulty("");
    setMaxCookTime(0);
    setMinRating(0);
    setSort("newest");
  };

  const activeFilterCount = [category, cuisine, difficulty, maxCookTime, minRating].filter(Boolean).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Explore Recipes</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {filtered.length} recipe{filtered.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Search bar */}
      <div className="mb-6 flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <Search size={18} className="shrink-0 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setVisibleCount(PAGE_SIZE) || setSearch(e.target.value)}
          placeholder="Search by recipe title or ingredient..."
          className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100 dark:placeholder:text-gray-500"
        />
        <button
          onClick={() => setFiltersOpen((v) => !v)}
          className="flex shrink-0 items-center gap-1.5 rounded-2xl bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
        >
          <SlidersHorizontal size={15} />
          Filters
          {activeFilterCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Filters panel */}
      {filtersOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6 grid grid-cols-1 gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:grid-cols-2 lg:grid-cols-5"
        >
          <FilterSelect label="Cuisine" value={cuisine} onChange={setCuisine} options={CUISINES.map((c) => ({ label: c, value: c }))} />
          <FilterSelect
            label="Difficulty"
            value={difficulty}
            onChange={setDifficulty}
            options={DIFFICULTIES.map((d) => ({ label: d, value: d }))}
          />
          <FilterSelect
            label="Cooking Time"
            value={String(maxCookTime)}
            onChange={(v) => setMaxCookTime(Number(v))}
            options={COOK_TIME_OPTIONS.map((o) => ({ label: o.label, value: String(o.value) }))}
          />
          <FilterSelect
            label="Rating"
            value={String(minRating)}
            onChange={(v) => setMinRating(Number(v))}
            options={RATING_OPTIONS.map((o) => ({ label: o.label, value: String(o.value) }))}
          />
          <FilterSelect
            label="Sort by"
            value={sort}
            onChange={setSort}
            options={SORT_OPTIONS.map((o) => ({ label: o.label, value: o.value }))}
          />

          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="col-span-full flex w-fit items-center gap-1 text-sm font-medium text-orange-500 hover:underline"
            >
              <X size={14} /> Clear all filters
            </button>
          )}
        </motion.div>
      )}

      {/* Results grid */}
      {visibleRecipes.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visibleRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-gray-200 py-16 text-center dark:border-gray-800">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No recipes match your filters.</p>
          <button onClick={clearFilters} className="mt-3 text-sm font-semibold text-orange-500 hover:underline">
            Clear filters
          </button>
        </div>
      )}

      {/* Load more (infinite scroll trigger) */}
      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={loadMore}
            className="rounded-2xl bg-green-800 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700"
          >
            Load more recipes
          </button>
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-gray-500 dark:text-gray-400">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-orange-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
      >
        <option value="">All</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}