import Image from "next/image";
import { Ban, ShieldCheck } from "lucide-react";

const USERS = [
  { id: "1", name: "Rakib Hasan", email: "rakib@example.com", role: "user", image: "/default-avatar.png" },
  { id: "2", name: "Nadia Islam", email: "nadia@example.com", role: "admin", image: "/default-avatar.png" },
];

export default function AdminUsersPage() {
  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-900 dark:text-gray-100">Users</h1>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-800">
            <tr>
              <th className="px-5 py-3 font-semibold text-gray-600 dark:text-gray-300">User</th>
              <th className="px-5 py-3 font-semibold text-gray-600 dark:text-gray-300">Role</th>
              <th className="px-5 py-3 text-right font-semibold text-gray-600 dark:text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {USERS.map((u) => (
              <tr key={u.id} className="border-b border-gray-50 last:border-0 dark:border-gray-800">
                <td className="flex items-center gap-3 px-5 py-3">
                  <div className="relative h-9 w-9 overflow-hidden rounded-2xl">
                    <Image src={u.image} alt={u.name} fill sizes="36px" className="object-cover" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{u.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{u.email}</p>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      u.role === "admin" ? "bg-orange-50 text-orange-600" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-2">
                    <button className="rounded-xl p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
                      <ShieldCheck size={15} />
                    </button>
                    <button className="rounded-xl p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                      <Ban size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}