"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Clock,
  Users,
  ChefHat,
  Star,
  Heart,
  Bookmark,
  Share2,
  Printer,
  UserPlus,
  MessageCircle,
  Check,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import RecipeCard from "@/components/recipe/RecipeCard";
import { getRecipeDetail, getRelatedRecipes } from "@/data/recipeDetailData";

const inputClass =
  "w-full rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-orange-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100";

interface CommentItem {
  id: string;
  author: string;
  avatar: string;
  text: string;
  time: string;
}

const MOCK_COMMENTS: CommentItem[] = [
  { id: "c1", author: "Priya Nair", avatar: "https://i.pravatar.cc/100?img=25", text: "Made this last night, the onions really do make all the difference. Family loved it!", time: "2 days ago" },
  { id: "c2", author: "Fahim Rahman", avatar: "https://i.pravatar.cc/100?img=8", text: "Any tips for doubling the recipe for a party of 10?", time: "5 days ago" },
];

export default function RecipeDetailClient({ recipeId }: { recipeId: string }) {
  const { data: session } = useSession();
  const recipe = getRecipeDetail(recipeId);

  const [activeImage, setActiveImage] = useState(0);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set());
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [commentText, setCommentText] = useState("");

  if (!recipe) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recipe not found</p>
        <Link href="/explore" className="mt-3 inline-block text-sm font-semibold text-orange-500 hover:underline">
          Back to Explore
        </Link>
      </div>
    );
  }

  const related = getRelatedRecipes(recipe.id, recipe.category);
  const isOwnRecipe = session?.user?.id === recipe.author.id;

  const toggleIngredient = (id: string) => {
    setCheckedIngredients((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleLike = () => {
    setLiked((v) => !v);
    // TODO(wire-up): POST /api/recipes/:id/like
  };

  const handleSave = () => {
    setSaved((v) => !v);
    // TODO(wire-up): POST /api/recipes/:id/save
    toast.success(saved ? "Removed from favorites" : "Saved to favorites");
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Could not copy link");
    }
  };

  const handleFollow = () => {
    // TODO(wire-up): POST /api/users/:id/follow
    setIsFollowing((v) => !v);
    toast.success(isFollowing ? "Unfollowed" : `Now following ${recipe.author.name}`);
  };

  const handleRate = (value: number) => {
    setUserRating(value);
    // TODO(wire-up): POST /api/ratings/recipe/:id { value }
    toast.success(`You rated this recipe ${value} stars`);
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    if (!session) {
      toast.error("Please log in to comment");
      return;
    }
    const newComment: CommentItem = {
      id: `c${Date.now()}`,
      author: session.user.name,
      avatar: session.user.image || "/default-avatar.png",
      text: commentText,
      time: "Just now",
    };
    setComments((prev) => [newComment, ...prev]);
    // TODO(wire-up): POST /api/comments/recipe/:id { text }
    setCommentText("");
    toast.success("Comment added");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-1.5 text-xs text-gray-400">
        <Link href="/explore" className="hover:text-orange-500">Explore</Link>
        <span>/</span>
        <span>{recipe.category}</span>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
        <div className="relative h-72 overflow-hidden rounded-2xl sm:col-span-3 sm:h-96">
          <Image src={recipe.gallery[activeImage]} alt={recipe.title} fill priority sizes="(max-width: 768px) 100vw, 700px" className="object-cover" />
        </div>
        <div className="flex gap-2 sm:flex-col">
          {recipe.gallery.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`relative h-16 flex-1 overflow-hidden rounded-2xl sm:h-[7.75rem] ${activeImage === i ? "ring-2 ring-orange-500" : ""}`}
            >
              <Image src={img} alt={`View ${i + 1}`} fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Title + meta */}
      <div className="mt-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-orange-500">{recipe.cuisine}</span>
            <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100 sm:text-3xl">{recipe.title}</h1>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button onClick={handleLike} className={`flex h-10 w-10 items-center justify-center rounded-2xl border transition-colors ${liked ? "border-orange-500 bg-orange-50 text-orange-500 dark:bg-orange-900/20" : "border-gray-200 text-gray-500 dark:border-gray-700"}`} aria-label="Like">
              <Heart size={17} className={liked ? "fill-orange-500" : ""} />
            </button>
            <button onClick={handleSave} className={`flex h-10 w-10 items-center justify-center rounded-2xl border transition-colors ${saved ? "border-orange-500 bg-orange-50 text-orange-500 dark:bg-orange-900/20" : "border-gray-200 text-gray-500 dark:border-gray-700"}`} aria-label="Save">
              <Bookmark size={17} className={saved ? "fill-orange-500" : ""} />
            </button>
            <button onClick={handleShare} className="flex h-10 w-10 items-center justify-center rounded-2xl border border-gray-200 text-gray-500 dark:border-gray-700" aria-label="Share">
              <Share2 size={17} />
            </button>
            <button onClick={() => window.print()} className="flex h-10 w-10 items-center justify-center rounded-2xl border border-gray-200 text-gray-500 dark:border-gray-700" aria-label="Print">
              <Printer size={17} />
            </button>
          </div>
        </div>

        <p className="mt-3 max-w-2xl text-sm text-gray-500 dark:text-gray-400">{recipe.description}</p>

        <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-gray-600 dark:text-gray-300">
          <span className="flex items-center gap-1.5"><Clock size={15} /> {recipe.prepTime + recipe.cookTime} min total</span>
          <span className="flex items-center gap-1.5"><Users size={15} /> {recipe.servings} servings</span>
          <span className="flex items-center gap-1.5"><ChefHat size={15} /> {recipe.difficulty}</span>
          <span className="flex items-center gap-1.5"><Star size={15} className="fill-orange-400 text-orange-400" /> {recipe.averageRating.toFixed(1)} ({recipe.ratingCount} ratings)</span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {recipe.tags.map((tag) => (
            <span key={tag} className="rounded-2xl bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">#{tag}</span>
          ))}
        </div>
      </div>

      {/* ⭐ Creator card — this is the key requested feature */}
      <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:flex-row">
        <Link href={`/profile/${recipe.author.id}`} className="flex items-center gap-3 hover:opacity-90">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl ring-2 ring-orange-500/30">
            <Image src={recipe.author.avatar} alt={recipe.author.name} fill sizes="56px" className="object-cover" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-gray-100">{recipe.author.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{recipe.author.bio}</p>
            <p className="mt-0.5 text-xs text-gray-400">{(recipe.author.followerCount / 1000).toFixed(1)}k followers</p>
          </div>
        </Link>

        {!isOwnRecipe && (
          <button
            onClick={handleFollow}
            className={`flex shrink-0 items-center gap-1.5 rounded-2xl px-5 py-2.5 text-sm font-semibold transition-colors ${
              isFollowing
                ? "border border-gray-200 text-gray-700 dark:border-gray-700 dark:text-gray-300"
                : "bg-green-800 text-white hover:bg-green-700"
            }`}
          >
            <UserPlus size={15} />
            {isFollowing ? "Following" : "Follow"}
          </button>
        )}
      </div>

      {/* Ingredients + Steps */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Ingredients */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 lg:sticky lg:top-20 lg:col-span-1 lg:h-fit">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">Ingredients</h2>
          <p className="mt-0.5 text-xs text-gray-400">For {recipe.servings} servings</p>
          <ul className="mt-4 space-y-2.5">
            {recipe.ingredients.map((ing) => {
              const checked = checkedIngredients.has(ing.id);
              return (
                <li key={ing.id}>
                  <button onClick={() => toggleIngredient(ing.id)} className="flex w-full items-start gap-2.5 text-left">
                    <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${checked ? "border-orange-500 bg-orange-500" : "border-gray-300 dark:border-gray-600"}`}>
                      {checked && <Check size={11} className="text-white" />}
                    </span>
                    <span className={`text-sm ${checked ? "text-gray-400 line-through" : "text-gray-700 dark:text-gray-300"}`}>
                      <span className="font-medium">{ing.quantity}</span> {ing.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Steps + nutrition */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">Instructions</h2>
            <ol className="mt-4 space-y-5">
              {recipe.steps.map((step, i) => (
                <li key={step.id} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600 dark:bg-orange-900/40 dark:text-orange-400">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{step.instruction}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">Nutrition (per serving)</h2>
            <div className="mt-4 grid grid-cols-4 gap-3 text-center">
              {[
                { label: "Calories", value: recipe.nutrition.calories },
                { label: "Protein", value: `${recipe.nutrition.protein}g` },
                { label: "Carbs", value: `${recipe.nutrition.carbs}g` },
                { label: "Fat", value: `${recipe.nutrition.fat}g` },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl bg-gray-50 py-3 dark:bg-gray-800">
                  <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{item.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Rate this recipe */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">Rate this recipe</h2>
            <div className="mt-3 flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => handleRate(star)}
                >
                  <Star
                    size={26}
                    className={(hoverRating || userRating) >= star ? "fill-orange-400 text-orange-400" : "text-gray-200 dark:text-gray-700"}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Comments */}
      <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-4 flex items-center gap-2">
          <MessageCircle size={17} className="text-orange-500" />
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">Comments ({comments.length})</h2>
        </div>

        <div className="flex gap-2">
          <input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={session ? "Share your thoughts or a tip..." : "Log in to leave a comment"}
            disabled={!session}
            className={`${inputClass} disabled:opacity-60`}
          />
          <button
            onClick={handleAddComment}
            disabled={!session}
            className="shrink-0 rounded-2xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
          >
            Post
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <AnimatePresence initial={false}>
            {comments.map((c) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
                <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
                  <Image src={c.avatar} alt={c.author} fill sizes="36px" className="object-cover" />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{c.author}</span>{" "}
                    <span className="text-xs text-gray-400">{c.time}</span>
                  </p>
                  <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-300">{c.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Related recipes */}
      {related.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">You might also like</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}