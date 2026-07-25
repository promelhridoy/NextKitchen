export const ANALYTICS_OVERVIEW = {
  recipesPublished: 24,
  totalViews: 48200,
  totalLikes: 6340,
  totalComments: 892,
  followerGrowth: 12.4, // percent
};

export const VIEWS_TREND = [
  { month: "Feb", views: 2100, likes: 340 },
  { month: "Mar", views: 3400, likes: 520 },
  { month: "Apr", views: 4200, likes: 610 },
  { month: "May", views: 5800, likes: 780 },
  { month: "Jun", views: 7100, likes: 990 },
  { month: "Jul", views: 8600, likes: 1150 },
];

export const FOLLOWER_GROWTH = [
  { month: "Feb", followers: 320 },
  { month: "Mar", followers: 410 },
  { month: "Apr", followers: 560 },
  { month: "May", followers: 780 },
  { month: "Jun", followers: 1020 },
  { month: "Jul", followers: 1340 },
];

export const FAVORITE_COLLECTIONS = [
  { id: "c1", name: "Weeknight Dinners", recipeCount: 12, coverImage: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&q=80" },
  { id: "c2", name: "Desserts to Try", recipeCount: 8, coverImage: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&q=80" },
  { id: "c3", name: "Party Menu", recipeCount: 5, coverImage: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&q=80" },
];

export const NOTIFICATIONS_FEED = [
  { id: "n1", type: "like", message: "Marco Bellini liked your recipe \"Beef Bhuna\"", time: "2h ago", read: false },
  { id: "n2", type: "comment", message: "Priya Nair commented on \"Chicken Tikka Masala\"", time: "5h ago", read: false },
  { id: "n3", type: "follow", message: "Ji-eun Park started following you", time: "1d ago", read: true },
  { id: "n4", type: "rating", message: "Your recipe \"Shrimp Scampi\" got a new 5-star rating", time: "2d ago", read: true },
];

export const ACTIVITY_FEED = [
  { id: "a1", action: "Published", target: "Fudgy Dark Chocolate Brownies", time: "Yesterday" },
  { id: "a2", action: "Updated", target: "Beef Bhuna with Caramelized Onions", time: "3 days ago" },
  { id: "a3", action: "Saved as draft", target: "Homestyle Fish Curry", time: "5 days ago" },
  { id: "a4", action: "Published", target: "Garlic Butter Shrimp Scampi", time: "1 week ago" },
];

export interface MyRecipeRow {
  id: string;
  title: string;
  coverImage: string;
  status: "draft" | "published";
  views: number;
  likes: number;
  createdAt: string;
}

export const MY_RECIPES: MyRecipeRow[] = [
  { id: "1", title: "Slow-Braised Beef Bhuna with Caramelized Onions", coverImage: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200&q=80", status: "published", views: 4820, likes: 342, createdAt: "2026-05-12" },
  { id: "8", title: "Fudgy Dark Chocolate Brownies", coverImage: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=200&q=80", status: "published", views: 6210, likes: 623, createdAt: "2026-06-20" },
  { id: "9", title: "Homestyle Fish Curry with Mustard Oil", coverImage: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&q=80", status: "draft", views: 0, likes: 0, createdAt: "2026-07-18" },
  { id: "10", title: "Weeknight Chickpea Curry", coverImage: "https://images.unsplash.com/photo-1631515242808-497c3fbd3972?w=200&q=80", status: "published", views: 1890, likes: 156, createdAt: "2026-04-02" },
];

import { SAMPLE_RECIPES } from "@/data/homeData";

export const COLLECTION_RECIPES: Record<string, typeof SAMPLE_RECIPES> = {
  c1: SAMPLE_RECIPES.slice(0, 4),
  c2: SAMPLE_RECIPES.slice(2, 5),
  c3: SAMPLE_RECIPES.slice(4, 7),
};