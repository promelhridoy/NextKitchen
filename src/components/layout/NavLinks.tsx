import { NAV_LINKS } from "@/data/navLink";
import Link from "next/link";

export default function NavLinks() {
  return (
    <ul className="hidden items-center gap-8 md:flex">
      {NAV_LINKS.map((link) => (
        <li key={link.href} className="group relative">
          <Link
            href={link.href}
            className="text-sm font-medium text-gray-600 transition-colors group-hover:text-orange-500 dark:text-gray-300"
          >
            {link.label}
          </Link>
          <span className="absolute -bottom-1 left-0 h-[2px] w-0 rounded-full bg-orange-500 transition-all duration-300 group-hover:w-full" />
        </li>
      ))}
    </ul>
  );
}