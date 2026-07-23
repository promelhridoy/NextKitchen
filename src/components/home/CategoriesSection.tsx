"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/data/homeData";

export default function CategoriesSection() {
  return (
    <section className="bg-gray-50 py-16 dark:bg-gray-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Browse by Category</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Find recipes organized by the cuisines you love most
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                href={`/explore?category=${cat.slug}`}
                className="group relative flex h-32 flex-col justify-end overflow-hidden rounded-2xl p-4 shadow-sm"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 16vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
                <span className="relative text-sm font-semibold text-white">{cat.name}</span>
                <span className="relative text-xs text-gray-200">{cat.recipeCount} recipes</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}