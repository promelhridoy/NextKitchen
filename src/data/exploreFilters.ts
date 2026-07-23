export const CUISINES = ["Bengali", "Italian", "Indian", "Korean", "Thai", "French", "Desserts"];
export const DIFFICULTIES = ["Easy", "Medium", "Hard"] as const;
export const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Most Liked", value: "mostLiked" },
  { label: "Top Rated", value: "topRated" },
];
export const COOK_TIME_OPTIONS = [
  { label: "Any time", value: 0 },
  { label: "Under 30 min", value: 30 },
  { label: "Under 60 min", value: 60 },
  { label: "Under 90 min", value: 90 },
];
export const RATING_OPTIONS = [
  { label: "Any rating", value: 0 },
  { label: "4+ stars", value: 4 },
  { label: "4.5+ stars", value: 4.5 },
];