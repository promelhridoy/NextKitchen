"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { FooterLink } from "@/data/footerLinks";

interface FooterLinkColumnProps {
  title: string;
  links: FooterLink[];
  children?: React.ReactNode;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function FooterLinkColumn({ title, links, children }: FooterLinkColumnProps) {
  return (
    <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-gray-500 transition-colors hover:text-orange-500 dark:text-gray-400">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      {children}
    </motion.div>
  );
}