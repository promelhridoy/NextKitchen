"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Search, ShieldOff, ShieldCheck } from "lucide-react";
import { ADMIN_USERS, type AdminUser } from "@/data/adminData";

export default function UsersManagerClient() {
  const [users, setUsers] = useState<AdminUser[]>(ADMIN_USERS);
  const [search, setSearch] = useState("");

  const toggleBan = (id: string) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, isBanned: !u.isBanned } : u)));
    // TODO(wire-up): PATCH /api/admin/users/:id/ban
    const user = users.find((u) => u.id === id);
    toast.success(user?.isBanned ? `${user.name} unbanned` : `${user?.name} banned`);
  };

  const filtered = users.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Manage Users</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{users.length} total users</p>
      </div>

      <div className="mb-4 flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 dark:border-gray-800 dark:bg-gray-900">
        <Search size={16} className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100 dark:placeholder:text-gray-500"
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <th className="px-5 py-3 font-medium">User</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">Recipes</th>
              <th className="px-5 py-3 font-medium">Joined</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-b border-gray-50 last:border-0 dark:border-gray-800">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-2xl">
                      <Image src={u.avatar} alt={u.name} fill sizes="36px" className="object-cover" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{u.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <span className={`rounded-2xl px-2.5 py-1 text-xs font-semibold capitalize ${
                    u.role === "admin"
                      ? "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-5 py-3 text-gray-600 dark:text-gray-400">{u.recipeCount}</td>
                <td className="px-5 py-3 text-gray-600 dark:text-gray-400">{u.joinedAt}</td>
                <td className="px-5 py-3">
                  <span className={`rounded-2xl px-2.5 py-1 text-xs font-semibold ${
                    u.isBanned
                      ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                      : "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400"
                  }`}>
                    {u.isBanned ? "Banned" : "Active"}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <button
                    onClick={() => toggleBan(u.id)}
                    disabled={u.role === "admin"}
                    className={`flex items-center gap-1.5 rounded-2xl px-3 py-1.5 text-xs font-semibold disabled:opacity-30 ${
                      u.isBanned
                        ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/40 dark:text-green-400"
                        : "bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {u.isBanned ? <ShieldCheck size={13} /> : <ShieldOff size={13} />}
                    {u.isBanned ? "Unban" : "Ban"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}