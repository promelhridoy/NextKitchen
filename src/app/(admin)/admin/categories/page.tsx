import { Pencil, Trash2, Plus } from "lucide-react";

const CATEGORIES = [
  { id: 1, name: "Breakfast", recipeCount: 24 },
  { id: 2, name: "Lunch", recipeCount: 40 },
  { id: 3, name: "Dinner", recipeCount: 35 },
  { id: 4, name: "Dessert", recipeCount: 18 },
];

export default function AdminCategoriesPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Categories</h1>
        <button className="flex items-center gap-1.5 rounded-2xl bg-green-800 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">
          <Plus size={16} />
          Add Category
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-800">
            <tr>
              <th className="px-5 py-3 font-semibold text-gray-600 dark:text-gray-300">Name</th>
              <th className="px-5 py-3 font-semibold text-gray-600 dark:text-gray-300">Recipes</th>
              <th className="px-5 py-3 text-right font-semibold text-gray-600 dark:text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {CATEGORIES.map((cat) => (
              <tr key={cat.id} className="border-b border-gray-50 last:border-0 dark:border-gray-800">
                <td className="px-5 py-3 font-medium text-gray-900 dark:text-gray-100">{cat.name}</td>
                <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{cat.recipeCount}</td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-2">
                    <button className="rounded-xl p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
                      <Pencil size={15} />
                    </button>
                    <button className="rounded-xl p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}