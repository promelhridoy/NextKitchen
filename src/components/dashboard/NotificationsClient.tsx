"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, UserPlus, Star, CheckCheck, Bell } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { NOTIFICATIONS_FEED } from "@/data/dashboardData";

const ICON_MAP: Record<string, { icon: React.ElementType; color: string }> = {
  like: { icon: Heart, color: "bg-orange-100 text-orange-500 dark:bg-orange-900/40" },
  comment: { icon: MessageCircle, color: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400" },
  follow: { icon: UserPlus, color: "bg-orange-100 text-orange-500 dark:bg-orange-900/40" },
  rating: { icon: Star, color: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400" },
};

export default function NotificationsClient() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [notifications, setNotifications] = useState(NOTIFICATIONS_FEED);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  useEffect(() => {
    if (!isPending && !session) router.replace("/login");
  }, [isPending, session, router]);

  if (isPending) return <div className="h-64 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800" />;
  if (!session) return null;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    // TODO(wire-up): PATCH /api/notifications/read-all
    toast.success("All notifications marked as read");
  };

  const markOneRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    // TODO(wire-up): PATCH /api/notifications/:id/read
  };

  const visible = filter === "unread" ? notifications.filter((n) => !n.read) : notifications;
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Notifications</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}` : "You're all caught up"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 rounded-2xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <CheckCheck size={16} /> Mark all as read
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="mb-6 inline-flex gap-1 rounded-2xl border border-gray-200 bg-white p-1 dark:border-gray-800 dark:bg-gray-900">
        {(["all", "unread"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`relative rounded-2xl px-4 py-2 text-sm font-semibold transition-colors ${
              filter === f ? "text-white" : "text-gray-600 dark:text-gray-300"
            }`}
          >
            {filter === f && (
              <motion.span
                layoutId="notif-filter-bg"
                className="absolute inset-0 rounded-2xl bg-orange-500"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10 capitalize">{f}</span>
          </button>
        ))}
      </div>

      {/* List */}
      {visible.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900">
          <AnimatePresence initial={false}>
            {visible.map((n) => {
              const config = ICON_MAP[n.type] ?? ICON_MAP.like;
              return (
                <motion.button
                  key={n.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => markOneRead(n.id)}
                  className="flex w-full items-start gap-3 border-b border-gray-50 p-4 text-left last:border-0 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl ${config.color}`}>
                    <config.icon size={16} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm ${n.read ? "text-gray-600 dark:text-gray-400" : "font-medium text-gray-900 dark:text-gray-100"}`}>
                      {n.message}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-400">{n.time}</p>
                  </div>
                  {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-500" />}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-gray-200 py-16 text-center dark:border-gray-800">
          <Bell size={32} className="text-gray-300" />
          <p className="mt-3 text-sm font-medium text-gray-500 dark:text-gray-400">No notifications here</p>
        </div>
      )}
    </div>
  );
}