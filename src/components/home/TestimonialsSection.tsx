"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/homeData";

export default function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">What Home Cooks Say</h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Real feedback from our community of cooks
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
          >
            <Quote size={28} className="text-orange-100 dark:text-orange-900/60" />
            <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">&ldquo;{t.quote}&rdquo;</p>

            <div className="mt-5 flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image src={t.avatar} alt={t.name} fill sizes="40px" className="object-cover" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{t.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}</p>
              </div>
            </div>

            <div className="mt-3 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  size={14}
                  className={idx < t.rating ? "fill-orange-400 text-orange-400" : "text-gray-200 dark:text-gray-700"}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}