"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { NAV_LINKS } from "@/data/navLink";

interface MobileNavLinksProps {
  onLinkClick?: () => void;
}

export default function MobileNavLinks({ onLinkClick }: MobileNavLinksProps) {
  return (
    <motion.ul
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.05 } } }}
      className="flex flex-col gap-1 px-4 py-4"
    >
      {NAV_LINKS.map((link) => (
        <motion.li
          key={link.href}
          variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}
        >
          <Link
            href={link.href}
            onClick={onLinkClick}
            className="block rounded-2xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {link.label}
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  );
}