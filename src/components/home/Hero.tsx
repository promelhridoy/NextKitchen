"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";

const SLIDES = [
  { image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=1600&q=80", label: "French Onion Soup" },
  { image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1600&q=80", label: "Wood-Fired Pizza" },
  { image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=1600&q=80", label: "Chicken Tikka Masala" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    window.location.href = `/explore?search=${encodeURIComponent(query.trim())}`;
  };

  return (
    <section className="relative flex h-[65vh] min-h-[480px] w-full items-center justify-center overflow-hidden">
      {/* Background slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image src={SLIDES[current].image} alt={SLIDES[current].label} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
        >
          Discover, Create & Share
          <br />
          <span className="text-orange-400">Homemade Recipes</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 max-w-xl text-base text-gray-200"
        >
          A community of home cooks sharing tried-and-tested recipes,
          step-by-step — from weeknight dinners to weekend feasts.
        </motion.p>

        {/* Floating search */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSearch}
          className="mt-8 flex w-full max-w-lg items-center gap-2 rounded-2xl bg-white/95 p-2 shadow-xl backdrop-blur-sm dark:bg-gray-900/95"
        >
          <Search size={18} className="ml-2 shrink-0 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search recipes, ingredients, cuisines..."
            className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100"
          />
          <button
            type="submit"
            className="flex shrink-0 items-center gap-1.5 rounded-2xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
          >
            Search
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-6 flex items-center gap-2"
        >
          <Link
            href="/explore"
            className="flex items-center gap-1.5 rounded-2xl border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Explore Recipes <ArrowRight size={15} />
          </Link>
        </motion.div>

        {/* Slide indicators */}
        <div className="mt-8 flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === current ? "w-6 bg-orange-400" : "w-1.5 bg-white/50"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}