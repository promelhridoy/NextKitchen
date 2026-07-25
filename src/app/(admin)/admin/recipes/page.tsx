import Image from "next/image";
import { Eye, Trash2, CheckCircle2 } from "lucide-react";

const RECIPES = [
  { id: "1", title: "Chicken Biryani", author: "Rakib", status: "Published", image: "/placeholder-food.jpg" },
  { id: "2", title: "Beef Tehari", author: "Nadia", status: "Pending", image: "/placeholder-food.jpg" },
];

export default function AdminRecipesPage() {
  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-900 dark:text-gray-100">Recipes</h1>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-800">
            <tr>
              <th className="px-5 py-3 font-semibold text-gray-600 dark:text-gray-300">Recipe</th>
              <th className="px-5 py-3 font-semibold text-gray-600 dark:text-gray-300">Author</th>
              <th className="px-5 py-3 font-semibold text-gray-600 dark:text-gray-300">Status</th>
              <th className="px-5 py-3 text-right font-semibold text-gray-600 dark:text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {RECIPES.map((r) => (
              <tr key={r.id} className="border-b border-gray-50 last:border-0 dark:border-gray-800">
                <td className="flex items-center gap-3 px-5 py-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-gray-100">
                    <Image src={r.image} alt={r.title} fill sizes="40px" className="object-cover" />
                  </div>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{r.title}</span>
                </td>
                <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{r.author}</td>
                <td className="px-5 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      r.status === "Published"
                        ? "bg-green-50 text-green-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-2">
                    <button className="rounded-xl p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
                      <Eye size={15} />
                    </button>
                    {r.status === "Pending" && (
                      <button className="rounded-xl p-2 text-green-600 hover:bg-green-50">
                        <CheckCircle2 size={15} />
                      </button>
                    )}
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