// app/(dashboard)/dashboard/notifications/page.tsx
import type { Metadata } from "next";
import NotificationsClient from "@/components/dashboard/NotificationsClient";

export const metadata: Metadata = { title: "Notifications" };

export default function NotificationsPage() {
  return <NotificationsClient />;
}