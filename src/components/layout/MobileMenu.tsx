"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Home,
  Compass,
  TrendingUp,
  Info,
  Mail,
  PlusCircle,
  Sun,
  Moon,
  LogOut,
  LayoutDashboard,
  User,
  ShieldCheck,
} from "lucide-react";
import { useTheme } from "next-themes";
import { NAV_LINKS } from "@/data/navLink";

interface CurrentUser {
  name: string;
  email: string;
  avatar: string;
  role: string; 
}

interface MobileMenuProps {
  currentUser: CurrentUser | null;
  onLinkClick: () => void;
  onLogout: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Home: Home,
  Explore: Compass,
  Trending: TrendingUp,
  About: Info,
  Contact: Mail,
};

export default function MobileMenu({ currentUser, onLinkClick, onLogout }: MobileMenuProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="overflow-hidden border-t border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900 md:hidden"
    >
      {currentUser && (
        <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-4 dark:border-gray-800">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-2xl ring-2 ring-orange-500/30">
            <Image src={currentUser.avatar} alt={currentUser.name} fill sizes="44px" className="object-cover" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">{currentUser.name}</p>
            <p className="truncate text-xs text-gray-500 dark:text-gray-400">{currentUser.email}</p>
          </div>
        </div>
      )}

      <motion.ul
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.04 } } }}
        className="flex flex-col gap-1 px-4 py-3"
      >
        {NAV_LINKS.map((link) => {
          const Icon = ICON_MAP[link.label] ?? Home;
          return (
            <motion.li key={link.href} variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}>
              <Link
                href={link.href}
                onClick={onLinkClick}
                className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <Icon size={17} className="text-gray-400 dark:text-gray-500" />
                {link.label}
              </Link>
            </motion.li>
          );
        })}
      </motion.ul>

      {currentUser && (
        <>
          <div className="mx-4 border-t border-gray-100 dark:border-gray-800" />
          <ul className="flex flex-col gap-1 px-4 py-3">
            <li>
              <Link
                href="/recipes/add"
                onClick={onLinkClick}
                className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <PlusCircle size={17} className="text-gray-400 dark:text-gray-500" />
                Add Recipe
              </Link>
            </li>
            <li>
              <Link 
                href="/dashboard"
                onClick={onLinkClick}
                className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <LayoutDashboard size={17} className="text-gray-400 dark:text-gray-500" />
                Dashboard
              </Link>
            </li>

            {currentUser.role === "admin" && (
              <li>
                <Link 
                  href="/admin" 
                  onClick={onLinkClick}
                  className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-900/20"
                >
                  <ShieldCheck size={17} /> 
                  Admin Panel
                </Link>
              </li>
            )}

            <li>
              <Link 
                href="/profile/me"
                onClick={onLinkClick}
                className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <User size={17} className="text-gray-400 dark:text-gray-500" /> 
                My Profile
              </Link>
            </li>
          </ul>
        </>
      )}

      <div className="mx-4 border-t border-gray-100 dark:border-gray-800" />

      <div className="flex flex-col gap-1 px-4 py-3">
        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          {isDark ? <Sun size={17} className="text-gray-400" /> : <Moon size={17} className="text-gray-400" />}
          {isDark ? "Light mode" : "Dark mode"}
        </button>

        {currentUser ? (
          <button
            onClick={onLogout}
            className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-medium text-red-500 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <LogOut size={17} />
            Logout
          </button>
        ) : (
          <div className="flex flex-col gap-2 pt-2">
            <Link
              href="/login"
              onClick={onLinkClick}
              className="rounded-2xl border border-gray-200 px-4 py-2.5 text-center text-sm font-semibold text-gray-700 dark:border-gray-700 dark:text-gray-300"
            >
              Log in
            </Link>
            <Link
              href="/register"
              onClick={onLinkClick}
              className="rounded-2xl bg-orange-500 px-4 py-2.5 text-center text-sm font-semibold text-white"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}