"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { FEATURED_CREATORS } from "@/data/homeData";

export default function FeaturedCreatorsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Featured Creators</h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Home cooks and chefs building a following, one recipe at a time
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {FEATURED_CREATORS.map((creator, i) => (
          <motion.div
            key={creator.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="relative h-20 w-20 overflow-hidden rounded-2xl">
              <Image src={creator.avatar} alt={creator.name} fill sizes="80px" className="object-cover" />
            </div>
            <h3 className="mt-4 font-semibold text-gray-900 dark:text-gray-100">{creator.name}</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{creator.bio}</p>

            <div className="mt-4 flex gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>
                <strong className="text-gray-900 dark:text-gray-100">{creator.recipeCount}</strong> recipes
              </span>
              <span>
                <strong className="text-gray-900 dark:text-gray-100">{(creator.followerCount / 1000).toFixed(1)}k</strong> followers
              </span>
            </div>

            <Link
              href={`/profile/${creator.id}`}
              className="mt-5 flex items-center gap-1.5 rounded-2xl bg-green-800 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700"
            >
              <UserPlus size={15} /> Follow
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}