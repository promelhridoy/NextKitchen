import { BookOpen, FolderTree, Users, TrendingUp } from "lucide-react";

const STATS = [
  { label: "Total Recipes", value: 128, icon: BookOpen, color: "text-orange-500 bg-orange-50" },
  { label: "Total Categories", value: 14, icon: FolderTree, color: "text-green-700 bg-green-50" },
  { label: "Total Users", value: 342, icon: Users, color: "text-blue-600 bg-blue-50" },
  { label: "New This Week", value: 9, icon: TrendingUp, color: "text-purple-600 bg-purple-50" },
];

export default function AdminOverviewPage() {
  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-900 dark:text-gray-100">Admin Overview</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
          >
            <span className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl ${stat.color}`}>
              <stat.icon size={18} />
            </span>
            <p className="mt-3 text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}