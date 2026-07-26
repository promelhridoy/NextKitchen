// app/(admin)/admin/users/page.tsx
import type { Metadata } from "next";
import UsersManagerClient from "@/components/admin/UsersManagerClient";

export const metadata: Metadata = { title: "Manage Users" };

export default function AdminUsersPage() {
  return <UsersManagerClient />;
}