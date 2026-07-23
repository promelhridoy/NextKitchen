"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChefHat, Search, Menu, X, Bell, User, PlusCircle, LogOut, LayoutDashboard } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import NavLinks from "@/components/layout/NavLinks";
import MobileMenu from "@/components/layout/MobileMenu";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { useSession, signOut } from "@/lib/auth-client";

// TODO(feature-flag): flip to true once the notification system ships
const NOTIFICATIONS_ENABLED = false;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();
  const currentUser = session?.user;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    window.location.href = `/explore?search=${encodeURIComponent(query.trim())}`;
  };

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully");
          setProfileOpen(false);
          setMobileOpen(false);
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-gray-100 bg-white/80 shadow-sm backdrop-blur-lg dark:border-gray-800 dark:bg-gray-900/80"
          : "border-b border-transparent bg-white/60 backdrop-blur-md dark:bg-gray-900/60"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex shrink-0 items-center gap-2">
          <motion.span
            whileHover={{ rotate: -12, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            className="flex h-9 w-9 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-sm"
          >
            <ChefHat size={20} strokeWidth={2.2} />
          </motion.span>
          <span className="text-lg font-bold tracking-tight text-green-800 dark:text-green-400">
            Nest<span className="text-orange-500">Kitchen</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <NavLinks />

        {/* Right side actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search — desktop only */}
          <div className="hidden md:block">
            <AnimatePresence initial={false} mode="wait">
              {searchOpen ? (
                <motion.form
                  key="search-input"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 240, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  onSubmit={handleSearchSubmit}
                  className="flex items-center overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 shadow-inner dark:border-gray-700 dark:bg-gray-800"
                >
                  <Search size={16} className="shrink-0 text-gray-400 dark:text-gray-500" />
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onBlur={() => !query && setSearchOpen(false)}
                    placeholder="Search recipes or ingredients..."
                    className="ml-2 w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100 dark:placeholder:text-gray-500"
                  />
                </motion.form>
              ) : (
                <motion.button
                  key="search-icon"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSearchOpen(true)}
                  className="flex h-10 w-10 items-center justify-center rounded-2xl text-gray-500 transition-colors hover:bg-gray-100 hover:text-orange-500 dark:text-gray-400 dark:hover:bg-gray-800"
                  aria-label="Open search"
                >
                  <Search size={20} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Theme toggle — desktop only; moved into MobileMenu for mobile */}
          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          {currentUser ? (
            <>
              {/* Notification bell — desktop only, and only once the feature is live */}
              {NOTIFICATIONS_ENABLED && (
                <Link
                  href="/dashboard"
                  className="relative hidden h-10 w-10 items-center justify-center rounded-2xl text-gray-500 transition-colors hover:bg-gray-100 hover:text-orange-500 dark:text-gray-400 dark:hover:bg-gray-800 md:flex"
                  aria-label="Notifications"
                >
                  <Bell size={20} />
                  <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-500"
                  />
                </Link>
              )}

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="hidden lg:block">
                <Link
                  href="/recipes/add"
                  className="flex items-center gap-1.5 rounded-2xl bg-green-800 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700"
                >
                  <PlusCircle size={16} />
                  Add Recipe
                </Link>
              </motion.div>

              <div className="relative">
                {/* Desktop avatar — opens dropdown */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setProfileOpen((v) => !v)}
                  className="relative hidden h-10 w-10 items-center justify-center overflow-hidden rounded-2xl ring-2 ring-orange-500/30 md:flex"
                  aria-label="Open profile menu"
                >
                  <Image
                    src={currentUser.image || "/default-avatar.png"}
                    alt={currentUser.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500 dark:border-gray-900" />
                </motion.button>

                {/* Compact avatar for mobile bar — no dropdown, hamburger handles navigation */}
                <div className="relative h-9 w-9 overflow-hidden rounded-2xl ring-2 ring-orange-500/30 md:hidden">
                  <Image
                    src={currentUser.image || "/default-avatar.png"}
                    alt={currentUser.name}
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                  <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full border-2 border-white bg-green-500 dark:border-gray-900" />
                </div>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 hidden w-52 overflow-hidden rounded-2xl border border-gray-100 bg-white py-2 shadow-xl dark:border-gray-800 dark:bg-gray-900 md:block"
                    >
                      <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800">
                        <LayoutDashboard size={16} /> Dashboard
                      </Link>
                      <Link href="/profile/me" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800">
                        <User size={16} /> My Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link
                href="/login"
                className="rounded-2xl px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Log in
              </Link>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/register"
                  className="rounded-2xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-600"
                >
                  Sign up
                </Link>
              </motion.div>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-2xl text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 md:hidden"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile menu — search + links + theme + auth actions, all merged in one place */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <div className="border-t border-gray-100 px-4 pt-4 dark:border-gray-800 md:hidden">
              <form onSubmit={handleSearchSubmit} className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-800">
                <Search size={16} className="text-gray-400 dark:text-gray-500" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search recipes..."
                  className="ml-2 w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100 dark:placeholder:text-gray-500"
                />
              </form>
            </div>
            <MobileMenu
              currentUser={
                currentUser
                  ? { name: currentUser.name, email: currentUser.email, avatar: currentUser.image || "/default-avatar.png" }
                  : null
              }
              onLinkClick={() => setMobileOpen(false)}
              onLogout={handleLogout}
            />
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}