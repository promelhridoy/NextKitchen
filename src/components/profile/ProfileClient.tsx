"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Link as LinkIcon, UserPlus, BookOpen, Heart, Settings } from "lucide-react";
import { FaInstagram, FaYoutube } from "react-icons/fa6";
import { useSession } from "@/lib/auth-client";
import RecipeCard from "@/components/recipe/RecipeCard";
import { SAMPLE_RECIPES } from "@/data/homeData";

interface ProfileClientProps {
  profileId: string;
}

// TODO(wire-up): replace with GET /api/users/:id
const MOCK_PROFILE = {
  name: "Rina Chowdhury",
  avatar: "https://i.pravatar.cc/200?img=5",
  bio: "Home cook sharing traditional Bengali family recipes passed down three generations. Rice, fish, and a lot of mustard oil.",
  location: "Dhaka, Bangladesh",
  website: "rinaskitchen.example.com",
  socialLinks: { instagram: "rina.cooks", youtube: "RinaKitchen" },
  recipeCount: 48,
  followerCount: 12400,
  followingCount: 210,
};

const TABS = [
  { key: "recipes", label: "Recipes", icon: BookOpen },
  { key: "favorites", label: "Favorites", icon: Heart },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function ProfileClient({ profileId }: ProfileClientProps) {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<TabKey>("recipes");
  const [isFollowing, setIsFollowing] = useState(false);

  const isOwnProfile = session?.user?.id === profileId;

  // TODO(wire-up): when isOwnProfile, prefer session.user (name/avatar) over MOCK_PROFILE
  const profile = isOwnProfile
    ? {
        ...MOCK_PROFILE,
        name: session!.user.name,
        avatar: session!.user.image || MOCK_PROFILE.avatar,
      }
    : MOCK_PROFILE;

  const recipes = activeTab === "recipes" ? SAMPLE_RECIPES.slice(0, 6) : SAMPLE_RECIPES.slice(3, 7);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:flex-row sm:items-start">
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl ring-4 ring-orange-500/20">
          <Image src={profile.avatar} alt={profile.name} fill sizes="112px" className="object-cover" />
        </div>

        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row sm:items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{profile.name}</h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{profile.bio}</p>
            </div>

            {isOwnProfile ? (
              <Link
                href="/settings"
                className="flex shrink-0 items-center gap-1.5 rounded-2xl border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <Settings size={15} />
                Edit Profile
              </Link>
            ) : (
              <button
                onClick={() => setIsFollowing((v) => !v)}
                className={`flex shrink-0 items-center gap-1.5 rounded-2xl px-5 py-2 text-sm font-semibold transition-colors ${
                  isFollowing
                    ? "border border-gray-200 text-gray-700 dark:border-gray-700 dark:text-gray-300"
                    : "bg-green-800 text-white hover:bg-green-700"
                }`}
              >
                <UserPlus size={15} />
                {isFollowing ? "Following" : "Follow"}
              </button>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400 sm:justify-start">
            <span className="flex items-center gap-1">
              <MapPin size={13} /> {profile.location}
            </span>
            <a href={`https://${profile.website}`} className="flex items-center gap-1 hover:text-orange-500">
              <LinkIcon size={13} /> {profile.website}
            </a>
            <a href={`https://instagram.com/${profile.socialLinks.instagram}`} className="flex items-center gap-1 hover:text-orange-500">
              <FaInstagram size={13} /> @{profile.socialLinks.instagram}
            </a>
            <a href={`https://youtube.com/${profile.socialLinks.youtube}`} className="flex items-center gap-1 hover:text-orange-500">
              <FaYoutube size={13} /> {profile.socialLinks.youtube}
            </a>
          </div>

          <div className="mt-4 flex justify-center gap-6 sm:justify-start">
            <div className="text-center">
              <p className="font-bold text-gray-900 dark:text-gray-100">{profile.recipeCount}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Recipes</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-900 dark:text-gray-100">{(profile.followerCount / 1000).toFixed(1)}k</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-900 dark:text-gray-100">{profile.followingCount}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Following</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-1 rounded-2xl border border-gray-200 bg-white p-1 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:w-fit sm:justify-start">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex items-center gap-1.5 rounded-2xl px-5 py-2 text-sm font-semibold transition-colors ${isActive ? "text-white" : "text-gray-600 dark:text-gray-300"}`}
            >
              {isActive && (
                <motion.span layoutId="profile-tab-bg" className="absolute inset-0 rounded-2xl bg-orange-500" transition={{ type: "spring", stiffness: 350, damping: 30 }} />
              )}
              <tab.icon size={15} className="relative z-10" />
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}