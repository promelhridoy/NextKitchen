export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "user" | "admin";
  isBanned: boolean;
  recipeCount: number;
  joinedAt: string;
}

export const ADMIN_USERS: AdminUser[] = [
  { id: "u1", name: "Rina Chowdhury", email: "rina@example.com", avatar: "https://i.pravatar.cc/100?img=5", role: "user", isBanned: false, recipeCount: 48, joinedAt: "2025-11-02" },
  { id: "u2", name: "Marco Bellini", email: "marco@example.com", avatar: "https://i.pravatar.cc/100?img=12", role: "user", isBanned: false, recipeCount: 76, joinedAt: "2025-09-14" },
  { id: "u3", name: "Ji-eun Park", email: "jieun@example.com", avatar: "https://i.pravatar.cc/100?img=32", role: "user", isBanned: false, recipeCount: 34, joinedAt: "2026-01-20" },
  { id: "u4", name: "Fahim Rahman", email: "fahim@example.com", avatar: "https://i.pravatar.cc/100?img=8", role: "user", isBanned: true, recipeCount: 3, joinedAt: "2026-03-11" },
  { id: "u5", name: "Promel Hridoy", email: "promelhossainhridoy@gmail.com", avatar: "https://i.pravatar.cc/100?img=60", role: "admin", isBanned: false, recipeCount: 24, joinedAt: "2025-08-01" },
];

export interface AdminRecipe {
  id: string;
  title: string;
  coverImage: string;
  author: string;
  category: string;
  status: "draft" | "published";
  isFeatured: boolean;
  views: number;
  reports: number;
  createdAt: string;
}

export const ADMIN_RECIPES: AdminRecipe[] = [
  { id: "1", title: "Slow-Braised Beef Bhuna with Caramelized Onions", coverImage: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200&q=80", author: "Rina Chowdhury", category: "Bengali", status: "published", isFeatured: true, views: 4820, reports: 0, createdAt: "2026-05-12" },
  { id: "4", title: "Wood-Fired Margherita Pizza from Scratch", coverImage: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&q=80", author: "Marco Bellini", category: "Italian", status: "published", isFeatured: false, views: 3120, reports: 2, createdAt: "2026-04-02" },
  { id: "9", title: "Homestyle Fish Curry with Mustard Oil", coverImage: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&q=80", author: "Fahim Rahman", category: "Bengali", status: "draft", isFeatured: false, views: 0, reports: 0, createdAt: "2026-07-18" },
  { id: "5", title: "Chicken Tikka Masala with Basmati Rice", coverImage: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200&q=80", author: "Priya Nair", category: "Indian", status: "published", isFeatured: true, views: 6900, reports: 1, createdAt: "2026-06-01" },
];

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  recipeCount: number;
  image: string;
}

export const ADMIN_CATEGORIES: AdminCategory[] = [
  { id: "c1", name: "Bengali", slug: "bengali", recipeCount: 128, image: "https://images.unsplash.com/photo-1631515242808-497c3fbd3972?w=200&q=80" },
  { id: "c2", name: "Italian", slug: "italian", recipeCount: 204, image: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=200&q=80" },
  { id: "c3", name: "Indian", slug: "indian", recipeCount: 312, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&q=80" },
  { id: "c4", name: "Korean", slug: "korean", recipeCount: 96, image: "https://images.unsplash.com/photo-1583224964978-2257b960c3d6?w=200&q=80" },
  { id: "c5", name: "Desserts", slug: "desserts", recipeCount: 267, image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200&q=80" },
];

export const PLATFORM_STATS = {
  totalUsers: 4230,
  totalRecipes: 1840,
  publishedRecipes: 1520,
  bannedUsers: 12,
};

export const USER_GROWTH = [
  { month: "Feb", users: 2800, recipes: 1100 },
  { month: "Mar", users: 3100, recipes: 1260 },
  { month: "Apr", users: 3450, recipes: 1420 },
  { month: "May", users: 3780, recipes: 1590 },
  { month: "Jun", users: 4020, recipes: 1720 },
  { month: "Jul", users: 4230, recipes: 1840 },
];

export const CATEGORY_DISTRIBUTION = ADMIN_CATEGORIES.map((c) => ({ name: c.name, value: c.recipeCount }));

export const PIE_COLORS = ["#F97316", "#166534", "#FB923C", "#22C55E", "#FDBA74"];