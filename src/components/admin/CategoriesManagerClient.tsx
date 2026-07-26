"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { ADMIN_CATEGORIES, type AdminCategory } from "@/data/adminData";

export default function CategoriesManagerClient() {
  const [categories, setCategories] = useState<AdminCategory[]>(ADMIN_CATEGORIES);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminCategory | null>(null);
  const [name, setName] = useState("");

  const openCreate = () => {
    setEditing(null);
    setName("");
    setModalOpen(true);
  };

  const openEdit = (cat: AdminCategory) => {
    setEditing(cat);
    setName(cat.name);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!name.trim()) return;
    if (editing) {
      setCategories((prev) => prev.map((c) => (c.id === editing.id ? { ...c, name } : c)));
      // TODO(wire-up): PATCH /api/categories/:id { name }
      toast.success("Category updated");
    } else {
      const newCat: AdminCategory = {
        id: `c${Date.now()}`,
        name,
        slug: name.toLowerCase().replace(/\s+/g, "-"),
        recipeCount: 0,
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200&q=80",
      };
      setCategories((prev) => [...prev, newCat]);
      // TODO(wire-up): POST /api/categories { name }
      toast.success("Category created");
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    // TODO(wire-up): DELETE /api/categories/:id
    toast.success("Category deleted");
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Categories</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{categories.length} categories</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-1.5 rounded-2xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
        >
          <Plus size={16} /> New Category
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <div key={cat.id} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="relative h-28 w-full">
              <Image src={cat.image} alt={cat.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">{cat.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{cat.recipeCount} recipes</p>
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={() => openEdit(cat)} className="rounded-xl p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Pencil size={15} />
                </button>
                <button onClick={() => handleDelete(cat.id)} className="rounded-xl p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 dark:bg-gray-900">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {editing ? "Edit Category" : "New Category"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category name"
              autoFocus
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-orange-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
            <button
              onClick={handleSave}
              className="mt-4 w-full rounded-2xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
            >
              {editing ? "Save Changes" : "Create Category"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}