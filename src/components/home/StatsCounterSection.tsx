"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import { BookOpen, Users, ChefHat, Globe } from "lucide-react";

const STATS = [
  { icon: BookOpen, label: "Recipes Shared", value: 18500 },
  { icon: Users, label: "Active Cooks", value: 42300 },
  { icon: ChefHat, label: "Featured Creators", value: 620 },
  { icon: Globe, label: "Countries Reached", value: 84 },
];

function Counter({ value }: { value: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-3xl font-bold text-white sm:text-4xl">
      {count.toLocaleString()}+
    </span>
  );
}

export default function StatsCounterSection() {
  return (
    <section className="bg-green-800 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex flex-col items-center text-center"
          >
            <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-orange-300">
              <stat.icon size={22} />
            </span>
            <Counter value={stat.value} />
            <span className="mt-1 text-sm text-green-100">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}