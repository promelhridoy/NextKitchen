"use client";

import { motion } from "framer-motion";
import { FaInstagram, FaYoutube, FaFacebookF, FaXTwitter } from "react-icons/fa6";
import type { IconType } from "react-icons";

interface SocialLink {
  icon: IconType;
  href: string;
  label: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
  { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
  { icon: FaXTwitter, href: "https://twitter.com", label: "Twitter" },
];

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-3">
      {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
        <motion.a
          key={label}
          whileHover={{ scale: 1.15, y: -2 }}
          whileTap={{ scale: 0.9 }}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex h-9 w-9 items-center justify-center rounded-2xl border border-gray-200 text-gray-500 transition-colors hover:border-orange-500 hover:text-orange-500"
        >
          <Icon size={14} />
        </motion.a>
      ))}
    </div>
  );
}