"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChefHat, Send, MapPin, Mail } from "lucide-react";
import FooterLinkColumn from "@/components/layout/FooterLinkColumn";
import SocialLinks from "@/components/layout/SocialLinks";
import { EXPLORE_LINKS, COMPANY_LINKS, LEGAL_LINKS } from "@/data/footerLinks";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO(wire-up): call your newsletter API endpoint here
    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden border-t border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-500/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-green-800/5 blur-3xl" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="md:col-span-4">
            <Link href="/" className="group flex items-center gap-2">
              <motion.span
                whileHover={{ rotate: -12, scale: 1.08 }}
                className="flex h-9 w-9 items-center justify-center rounded-2xl bg-orange-500 text-white"
              >
                <ChefHat size={20} strokeWidth={2.2} />
              </motion.span>
              <span className="text-lg font-bold tracking-tight text-green-800 dark:text-green-400">
                Nest<span className="text-orange-500">Kitchen</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              Discover, create & share homemade recipes with a community of
              home cooks who love good food made from scratch.
            </p>

            <form onSubmit={handleSubscribe} className="mt-6">
              <label htmlFor="newsletter-email" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Get new recipes in your inbox
              </label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition-shadow focus:border-orange-500 focus:shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-800 text-white transition-colors hover:bg-green-700"
                >
                  <Send size={16} />
                </motion.button>
              </div>
              {submitted && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-xs font-medium text-green-700 dark:text-green-400"
                >
                  You&apos;re subscribed — welcome aboard!
                </motion.p>
              )}
            </form>
          </motion.div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8">
            <FooterLinkColumn title="Explore" links={EXPLORE_LINKS} />
            <FooterLinkColumn title="Company" links={COMPANY_LINKS} />
            <FooterLinkColumn title="Legal" links={LEGAL_LINKS}>
              <div className="mt-6 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="shrink-0" />
                  <span>Dhaka, Bangladesh</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} className="shrink-0" />
                  <span>hello@nestkitchen.app</span>
                </div>
              </div>
            </FooterLinkColumn>
          </div>
        </div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 dark:border-gray-800 sm:flex-row"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} NestKitchen. All rights reserved.
          </p>
          <SocialLinks />
        </motion.div>
      </motion.div>
    </footer>
  );
}