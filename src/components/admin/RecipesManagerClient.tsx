"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Star, Trash2, AlertTriangle, Eye } from "lucide-react";
import Link from "next/link";
import { ADMIN_RECIPES, type AdminRecipe } from "@/data/adminData";

export default function RecipesManagerClient() {
  const [recipes, setRecipes] = useState<AdminRecipe[]>(ADMIN_RECIPES);
  const [deleteTarget, setDeleteTarget] = useState<AdminRecipe | null>(null);

  const toggleFeature = (id: string) => {
    setRecipes((prev) => prev.map((r) => (r.id === id ? { ...r, isFeatured: !r.isFeatured } : r)));
    // TODO(wire-up): PATCH /api/admin/recipes/:id/feature
    toast.success("Feature status updated");
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setRecipes((prev) => prev.filter((r) => r.id !== deleteTarget.id));
    // TODO(wire-up): DELETE /api/admin/recipes/:id
    toast.success(`"${deleteTarget.title}" removed`);
    setDeleteTarget(null);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Manage Recipes</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{recipes.length} total recipes across the platform</p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <th className="px-5 py-3 font-medium">Recipe</th>
              <th className="px-5 py-3 font-medium">Author</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Reports</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((r) => (
              <tr key={r.id} className="border-b border-gray-50 last:border-0 dark:border-gray-800">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-2xl">
                      <Image src={r.coverImage} alt={r.title} fill sizes="40px" className="object-cover" />
                    </div>
                    <span className="line-clamp-1 max-w-xs font-medium text-gray-900 dark:text-gray-100">{r.title}</span>
                    {r.isFeatured && <Star size={13} className="shrink-0 fill-orange-400 text-orange-400" />}
                  </div>
                </td>
                <td className="px-5 py-3 text-gray-600 dark:text-gray-400">{r.author}</td>
                <td className="px-5 py-3 text-gray-600 dark:text-gray-400">{r.category}</td>
                <td className="px-5 py-3">
                  <span className={`rounded-2xl px-2.5 py-1 text-xs font-semibold ${
                    r.status === "published"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  }`}>
                    {r.status === "published" ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-5 py-3">
                  {r.reports > 0 ? (
                    <span className="flex items-center gap-1 text-xs font-semibold text-red-500">
                      <AlertTriangle size={13} /> {r.reports}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">—</span>
                  )}
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-1.5">
                    <Link href={`/recipes/${r.id}`} className="rounded-xl p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
                      <Eye size={15} />
                    </Link>
                    <button
                      onClick={() => toggleFeature(r.id)}
                      className={`rounded-xl p-1.5 ${r.isFeatured ? "text-orange-500" : "text-gray-400"} hover:bg-gray-100 dark:hover:bg-gray-800`}
                      title={r.isFeatured ? "Unfeature" : "Feature"}
                    >
                      <Star size={15} className={r.isFeatured ? "fill-orange-400" : ""} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(r)}
                      className="rounded-xl p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 dark:bg-gray-900">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Remove this recipe?</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              &ldquo;{deleteTarget.title}&rdquo; will be permanently removed from the platform.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setDeleteTarget(null)} className="rounded-2xl px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
                Cancel
              </button>
              <button onClick={confirmDelete} className="rounded-2xl bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600">
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}