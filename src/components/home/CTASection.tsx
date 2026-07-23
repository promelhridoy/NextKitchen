"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChefHat, ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 pt-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center rounded-2xl bg-green-800 px-6 py-14 text-center sm:px-12"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-orange-300">
          <ChefHat size={26} />
        </span>
        <h2 className="mt-5 text-2xl font-bold text-white sm:text-3xl">Got a recipe worth sharing?</h2>
        <p className="mt-2 max-w-md text-sm text-green-100">
          Join thousands of home cooks publishing their favorite dishes and building a following.
        </p>
        <Link
          href="/recipes/add"
          className="mt-6 flex items-center gap-1.5 rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
        >
          Share Your Recipe <ArrowRight size={15} />
        </Link>
      </motion.div>
    </section>
  );
}