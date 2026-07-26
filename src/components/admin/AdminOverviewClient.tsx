"use client";

import { motion } from "framer-motion";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import { Users, BookOpen, Globe, ShieldOff } from "lucide-react";
import { PLATFORM_STATS, USER_GROWTH, CATEGORY_DISTRIBUTION, PIE_COLORS } from "@/data/adminData";

const STAT_CARDS = [
  { icon: Users, label: "Total Users", value: PLATFORM_STATS.totalUsers.toLocaleString(), color: "bg-orange-100 text-orange-500 dark:bg-orange-900/40" },
  { icon: BookOpen, label: "Total Recipes", value: PLATFORM_STATS.totalRecipes.toLocaleString(), color: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400" },
  { icon: Globe, label: "Published", value: PLATFORM_STATS.publishedRecipes.toLocaleString(), color: "bg-orange-100 text-orange-500 dark:bg-orange-900/40" },
  { icon: ShieldOff, label: "Banned Users", value: PLATFORM_STATS.bannedUsers, color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" },
];

export default function AdminOverviewClient() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Site Analytics</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Platform-wide overview across all users and recipes</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STAT_CARDS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
          >
            <span className={`flex h-10 w-10 items-center justify-center rounded-2xl ${stat.color}`}>
              <stat.icon size={18} />
            </span>
            <p className="mt-3 text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Bar chart: user + recipe growth */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 lg:col-span-2">
          <h2 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">Platform Growth</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={USER_GROWTH}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb" }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="users" name="Users" fill="#F97316" radius={[6, 6, 0, 0]} />
              <Bar dataKey="recipes" name="Recipes" fill="#166534" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart: category distribution */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">Recipes by Category</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={CATEGORY_DISTRIBUTION}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
              >
                {CATEGORY_DISTRIBUTION.map((_, index) => (
                  <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb" }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}