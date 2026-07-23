"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO(wire-up): call your newsletter subscription API endpoint here
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-orange-500 px-6 py-12 text-center sm:px-12"
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10" />

        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-white">
          <Mail size={22} />
        </span>
        <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">Never miss a new recipe</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-orange-50">
          Join 42,000+ home cooks getting a weekly digest of trending and seasonal recipes.
        </p>

        <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md items-center gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-2xl border-0 px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="flex shrink-0 items-center gap-1.5 rounded-2xl bg-green-800 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
          >
            <Send size={15} /> Subscribe
          </button>
        </form>

        {submitted && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-sm font-medium text-white">
            You&apos;re subscribed — welcome to the NestKitchen family!
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}