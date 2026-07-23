import type { Metadata } from "next";
import Image from "next/image";
import { ChefHat, Users, Heart, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about NestKitchen's mission to help home cooks discover, create, and share homemade recipes.",
};

const VALUES = [
  {
    icon: ChefHat,
    title: "Real recipes, real cooks",
    description: "Every recipe is submitted, tested, and photographed by an actual home cook — no stock content, no filler.",
  },
  {
    icon: Users,
    title: "Community first",
    description: "Follow creators, leave reviews, and build a network of people who share your taste in food.",
  },
  {
    icon: Heart,
    title: "Made for home kitchens",
    description: "Every recipe accounts for realistic prep time, common ingredients, and everyday equipment.",
  },
  {
    icon: Globe,
    title: "Global cuisine, one platform",
    description: "From Bengali bhuna to Korean gochujang salmon, we celebrate food from every corner of the world.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center">
        <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white">
          <ChefHat size={26} />
        </span>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
          Cooking is better shared
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-gray-500 dark:text-gray-400">
          NestKitchen started with a simple idea — the best recipes usually come from someone&apos;s
          grandmother, not a magazine. We built a place for home cooks to publish the dishes they
          actually make, complete with the shortcuts, substitutions, and stories that make them worth cooking.
        </p>
      </div>

      {/* Story image */}
      <div className="relative mt-10 h-72 w-full overflow-hidden rounded-2xl sm:h-96">
        <Image
          src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80"
          alt="Home cooking in a kitchen"
          fill
          sizes="(max-width: 768px) 100vw, 900px"
          className="object-cover"
        />
      </div>

      {/* Values */}
      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {VALUES.map((value) => (
          <div
            key={value.title}
            className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400">
              <value.icon size={20} />
            </span>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{value.title}</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{value.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Stats strip */}
      <div className="mt-16 grid grid-cols-3 gap-6 rounded-2xl bg-green-800 px-6 py-10 text-center">
        <div>
          <p className="text-2xl font-bold text-white sm:text-3xl">18.5k+</p>
          <p className="mt-1 text-sm text-green-100">Recipes shared</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-white sm:text-3xl">42k+</p>
          <p className="mt-1 text-sm text-green-100">Active cooks</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-white sm:text-3xl">84</p>
          <p className="mt-1 text-sm text-green-100">Countries reached</p>
        </div>
      </div>
    </div>
  );
}