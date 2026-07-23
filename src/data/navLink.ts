export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "Trending", href: "/trending" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];