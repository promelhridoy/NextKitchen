"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { Eye, Pencil, Trash2, Grid3x3, List, Globe, FileEdit } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { MY_RECIPES, type MyRecipeRow } from "@/data/dashboardData";

export default function MyRecipesClient() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [recipes, setRecipes] = useState<MyRecipeRow[]>(MY_RECIPES);
  const [view, setView] = useState<"grid" | "table">("table");
  const [deleteTarget, setDeleteTarget] = useState<MyRecipeRow | null>(null);

  useEffect(() => {
    if (!isPending && !session) router.replace("/login");
  }, [isPending, session, router]);

  if (isPending) return <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><div className="h-64 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800" /></div>;
  if (!session) return null;

  const togglePublish = (id: string) => {
    setRecipes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: r.status === "published" ? "draft" : "published" } : r))
    );
    // TODO(wire-up): PATCH /api/recipes/:id { status }
    toast.success("Recipe status updated");
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setRecipes((prev) => prev.filter((r) => r.id !== deleteTarget.id));
    // TODO(wire-up): DELETE /api/recipes/:id
    toast.success(`"${deleteTarget.title}" deleted`);
    setDeleteTarget(null);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">My Recipes</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{recipes.length} total recipes</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-2xl border border-gray-200 p-1 dark:border-gray-700">
            <button
              onClick={() => setView("table")}
              className={`rounded-xl p-2 ${view === "table" ? "bg-orange-500 text-white" : "text-gray-500"}`}
              aria-label="Table view"
            >
              <List size={16} />
            </button>
            <button
              onClick={() => setView("grid")}
              className={`rounded-xl p-2 ${view === "grid" ? "bg-orange-500 text-white" : "text-gray-500"}`}
              aria-label="Grid view"
            >
              <Grid3x3 size={16} />
            </button>
          </div>
          <Link
            href="/recipes/add"
            className="rounded-2xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
          >
            + Add Recipe
          </Link>
        </div>
      </div>

      {view === "table" ? (
        <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                <th className="px-5 py-3 font-medium">Recipe</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Views</th>
                <th className="px-5 py-3 font-medium">Likes</th>
                <th className="px-5 py-3 font-medium">Created</th>
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
                      <span className="line-clamp-1 font-medium text-gray-900 dark:text-gray-100">{r.title}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-2xl px-2.5 py-1 text-xs font-semibold ${
                        r.status === "published"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {r.status === "published" ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-600 dark:text-gray-400">{r.views.toLocaleString()}</td>
                  <td className="px-5 py-3 text-gray-600 dark:text-gray-400">{r.likes.toLocaleString()}</td>
                  <td className="px-5 py-3 text-gray-600 dark:text-gray-400">{r.createdAt}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5">
                      <Link href={`/recipes/${r.id}`} className="rounded-xl p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="View">
                        <Eye size={15} />
                      </Link>
                      <Link href={`/recipes/${r.id}/edit`} className="rounded-xl p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Edit">
                        <Pencil size={15} />
                      </Link>
                      <button
                        onClick={() => togglePublish(r.id)}
                        className="rounded-xl p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                        aria-label="Toggle publish"
                        title={r.status === "published" ? "Unpublish" : "Publish"}
                      >
                        {r.status === "published" ? <FileEdit size={15} /> : <Globe size={15} />}
                      </button>
                      <button
                        onClick={() => setDeleteTarget(r)}
                        className="rounded-xl p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                        aria-label="Delete"
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
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((r) => (
            <div key={r.id} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="relative h-36 w-full">
                <Image src={r.coverImage} alt={r.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                <span
                  className={`absolute left-3 top-3 rounded-2xl px-2.5 py-1 text-xs font-semibold ${
                    r.status === "published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {r.status === "published" ? "Published" : "Draft"}
                </span>
              </div>
              <div className="p-4">
                <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 dark:text-gray-100">{r.title}</h3>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {r.views.toLocaleString()} views · {r.likes.toLocaleString()} likes
                </p>
                <div className="mt-3 flex items-center gap-1.5 border-t border-gray-100 pt-3 dark:border-gray-800">
                  <Link href={`/recipes/${r.id}`} className="rounded-xl p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Eye size={15} />
                  </Link>
                  <Link href={`/recipes/${r.id}/edit`} className="rounded-xl p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Pencil size={15} />
                  </Link>
                  <button onClick={() => togglePublish(r.id)} className="rounded-xl p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
                    {r.status === "published" ? <FileEdit size={15} /> : <Globe size={15} />}
                  </button>
                  <button onClick={() => setDeleteTarget(r)} className="rounded-xl p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 dark:bg-gray-900">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Delete this recipe?</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              &ldquo;{deleteTarget.title}&rdquo; will be permanently removed. This can&apos;t be undone.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="rounded-2xl px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="rounded-2xl bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}