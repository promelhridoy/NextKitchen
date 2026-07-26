"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, BookOpen, Heart, Bell, Settings, PlusCircle, ChefHat, Home, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useSession, signOut } from "@/lib/auth-client";

const MENU_ITEMS = [
  { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { name: "My Recipes", path: "/dashboard/my-recipes", icon: BookOpen },
  { name: "Favorites", path: "/dashboard/favorites", icon: Heart },
  { name: "Notifications", path: "/dashboard/notifications", icon: Bell },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully");
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  if (!mounted || isPending) {
    return (
      <aside className="fixed left-0 top-0 z-20 hidden h-screen w-64 shrink-0 border-r border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 lg:block">
        <div className="mb-8 h-8 w-3/4 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-11 w-full animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800" />
          ))}
        </div>
      </aside>
    );
  }

  const user = session?.user;

  return (
    <aside className="fixed left-0 top-0 z-20 hidden h-screen w-64 shrink-0 border-r border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 lg:block">
      <div className="flex h-full flex-col justify-between pb-4">
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-orange-500 text-white">
              <ChefHat size={18} strokeWidth={2.2} />
            </span>
            <span className="text-base font-bold tracking-tight text-green-800 dark:text-green-400">
              Nest<span className="text-orange-500">Kitchen</span>
            </span>
          </Link>

          {user && (
            <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3 dark:bg-gray-800">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-2xl ring-2 ring-orange-500/30">
                <Image src={user.image || "/default-avatar.png"} alt={user.name} fill sizes="40px" className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">{user.name}</p>
                <p className="truncate text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
              </div>
            </div>
          )}

          <Link
            href="/recipes/add"
            className="flex items-center justify-center gap-1.5 rounded-2xl bg-green-800 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700"
          >
            <PlusCircle size={16} />
            Add Recipe
          </Link>

          <nav className="flex flex-col gap-1">
            {MENU_ITEMS.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className="group relative flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium transition-colors"
                >
                  {isActive && (
                    <motion.span
                      layoutId="dashboard-sidebar-active-bg"
                      className="absolute inset-0 rounded-2xl bg-orange-50 dark:bg-orange-900/20"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? "text-orange-500" : "text-gray-400 dark:text-gray-500"}`}>
                    <item.icon size={17} />
                  </span>
                  <span className={`relative z-10 ${isActive ? "text-orange-600 dark:text-orange-400" : "text-gray-700 dark:text-gray-300"}`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto space-y-2 border-t border-gray-100 pt-4 dark:border-gray-800">
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-2xl px-4 py-2.5 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
          >
            <Settings size={15} /> Settings
          </Link>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-2.5 text-left text-xs font-medium text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <LogOut size={15} /> Logout
          </button>

          <Link
            href="/"
            className="flex items-center gap-3 rounded-2xl px-4 py-2.5 text-xs font-medium text-gray-400 transition-colors hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-200"
          >
            <Home size={15} /> Back to Home
          </Link>
        </div>
      </div>
    </aside>
  );
}