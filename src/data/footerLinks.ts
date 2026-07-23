export interface FooterLink {
  label: string;
  href: string;
}

export const EXPLORE_LINKS: FooterLink[] = [
  { label: "Trending Recipes", href: "/trending" },
  { label: "All Categories", href: "/explore" },
  { label: "Editor's Picks", href: "/explore?sort=editorsPicks" },
  { label: "Top Rated", href: "/explore?sort=topRated" },
];

export const COMPANY_LINKS: FooterLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Add a Recipe", href: "/recipes/add" },
  { label: "Creator Dashboard", href: "/dashboard" },
];

export const LEGAL_LINKS: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];