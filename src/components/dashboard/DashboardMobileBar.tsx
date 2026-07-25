"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChefHat, Menu, X, LayoutDashboard, BookOpen, Heart, Bell, Settings } from "lucide-react";
import { useSession } from "@/lib/auth-client";

const MENU_ITEMS = [
  { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { name: "My Recipes", path: "/dashboard/my-recipes", icon: BookOpen },
  { name: "Favorites", path: "/dashboard/favorites", icon: Heart },
  { name: "Notifications", path: "/dashboard/notifications", icon: Bell },
  { name: "Settings", path: "/settings", icon: Settings },
];

export default function DashboardMobileBar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-orange-500 text-white">
            <ChefHat size={16} strokeWidth={2.2} />
          </span>
          <span className="text-sm font-bold text-green-800 dark:text-green-400">
            Nest<span className="text-orange-500">Kitchen</span>
          </span>
        </Link>
        <button
          onClick={() => setOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-2xl text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          aria-label="Open dashboard menu"
        >
          <Menu size={20} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/40"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-white p-5 shadow-xl dark:bg-gray-900"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-2xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>

              <div className="mt-2 space-y-1">
                {MENU_ITEMS.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium ${
                        isActive
                          ? "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <item.icon size={16} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}