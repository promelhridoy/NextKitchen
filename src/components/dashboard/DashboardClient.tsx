"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { BookOpen, Eye, Heart, MessageCircle, TrendingUp, Bell, Bookmark, Activity } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";
import {
  ANALYTICS_OVERVIEW,
  VIEWS_TREND,
  FOLLOWER_GROWTH,
  FAVORITE_COLLECTIONS,
  NOTIFICATIONS_FEED,
  ACTIVITY_FEED,
} from "@/data/dashboardData";

const STAT_CARDS = [
  { icon: BookOpen, label: "Recipes Published", value: ANALYTICS_OVERVIEW.recipesPublished, color: "bg-orange-100 text-orange-500 dark:bg-orange-900/40" },
  { icon: Eye, label: "Total Views", value: ANALYTICS_OVERVIEW.totalViews.toLocaleString(), color: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400" },
  { icon: Heart, label: "Total Likes", value: ANALYTICS_OVERVIEW.totalLikes.toLocaleString(), color: "bg-orange-100 text-orange-500 dark:bg-orange-900/40" },
  { icon: MessageCircle, label: "Total Comments", value: ANALYTICS_OVERVIEW.totalComments.toLocaleString(), color: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400" },
];

export default function DashboardClient() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) router.replace("/login");
  }, [isPending, session, router]);

  if (isPending) {
    return (
      <div>
        <div className="h-8 w-48 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800" />
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800" />
          ))}
        </div>
      </div>
    );
  }

  if (!session) return null;
  const user = session.user;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Welcome back, {user.name?.split(" ")[0]}</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Here&apos;s how your recipes are performing</p>
      </div>

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

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 lg:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp size={17} className="text-orange-500" />
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">Views & Likes Trend</h2>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={VIEWS_TREND}>
              <defs>
                <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb" }} />
              <Area type="monotone" dataKey="views" stroke="#F97316" fill="url(#viewsGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-4 flex items-center gap-2">
            <Activity size={17} className="text-green-800 dark:text-green-400" />
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">Follower Growth</h2>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={FOLLOWER_GROWTH}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb" }} />
              <Line type="monotone" dataKey="followers" stroke="#166534" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-4 flex items-center gap-2">
            <Bookmark size={17} className="text-orange-500" />
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">Favorites by Collection</h2>
          </div>
          <div className="space-y-3">
            {FAVORITE_COLLECTIONS.map((c) => (
              <Link key={c.id} href="/dashboard/favorites" className="flex items-center gap-3 rounded-2xl p-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl">
                  <Image src={c.coverImage} alt={c.name} fill sizes="48px" className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{c.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{c.recipeCount} recipes</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-4 flex items-center gap-2">
            <Bell size={17} className="text-orange-500" />
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">Notifications</h2>
          </div>
          <div className="space-y-3">
            {NOTIFICATIONS_FEED.map((n) => (
              <div key={n.id} className="flex items-start gap-2">
                <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${n.read ? "bg-gray-300 dark:bg-gray-700" : "bg-orange-500"}`} />
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{n.message}</p>
                  <p className="text-xs text-gray-400">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-4 flex items-center gap-2">
            <Activity size={17} className="text-green-800 dark:text-green-400" />
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">Recent Activity</h2>
          </div>
          <div className="space-y-4">
            {ACTIVITY_FEED.map((a) => (
              <div key={a.id} className="border-l-2 border-orange-500 pl-3">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">{a.action}</span> &ldquo;{a.target}&rdquo;
                </p>
                <p className="text-xs text-gray-400">{a.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}