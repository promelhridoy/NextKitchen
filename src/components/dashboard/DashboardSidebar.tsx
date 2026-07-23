"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Heart,
  Bell,
  Settings,
  PlusCircle,
  Menu,
  X,
  ChefHat,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";

const SIDEBAR_LINKS = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Recipes", href: "/dashboard/my-recipes", icon: BookOpen },
  { label: "Favorites", href: "/dashboard/favorites", icon: Heart },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = session?.user;

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

  const SidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 px-5 py-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-orange-500 text-white">
          <ChefHat size={18} strokeWidth={2.2} />
        </span>
        <span className="text-base font-bold tracking-tight text-green-800 dark:text-green-400">
          Nest<span className="text-orange-500">Kitchen</span>
        </span>
      </Link>

      {/* User summary */}
      {user && (
        <div className="mx-4 mb-4 flex items-center gap-3 rounded-2xl bg-gray-50 p-3 dark:bg-gray-800">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-2xl ring-2 ring-orange-500/30">
            <Image src={user.image || "/default-avatar.png"} alt={user.name} fill sizes="40px" className="object-cover" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">{user.name}</p>
            <p className="truncate text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
        </div>
      )}

      {/* Add recipe CTA */}
      <div className="px-4">
        <Link
          href="/recipes/add"
          onClick={() => setMobileOpen(false)}
          className="flex items-center justify-center gap-1.5 rounded-2xl bg-green-800 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700"
        >
          <PlusCircle size={16} />
          Add Recipe
        </Link>
      </div>

      {/* Nav links */}
      <nav className="mt-6 flex-1 space-y-1 px-3">
        {SIDEBAR_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors"
            >
              {isActive && (
                <motion.span
                  layoutId="sidebar-active-bg"
                  className="absolute inset-0 rounded-2xl bg-orange-50 dark:bg-orange-900/20"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <link.icon
                size={17}
                className={`relative z-10 ${isActive ? "text-orange-500" : "text-gray-400 dark:text-gray-500"}`}
              />
              <span className={`relative z-10 ${isActive ? "text-orange-600 dark:text-orange-400" : "text-gray-700 dark:text-gray-300"}`}>
                {link.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-100 p-3 dark:border-gray-800">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar — always visible */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900 lg:block">
        {SidebarContent}
      </aside>

      {/* Mobile top bar with hamburger */}
      <div className="flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900 lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-orange-500 text-white">
            <ChefHat size={16} strokeWidth={2.2} />
          </span>
          <span className="text-sm font-bold text-green-800 dark:text-green-400">
            Nest<span className="text-orange-500">Kitchen</span>
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-2xl text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          aria-label="Open dashboard menu"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile slide-over sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl dark:bg-gray-900 lg:hidden"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-2xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
              {SidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}