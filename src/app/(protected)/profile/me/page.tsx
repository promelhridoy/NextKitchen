"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function MyProfileRedirectPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (isPending) return;
    if (!session) {
      router.replace("/login");
      return;
    }
    router.replace(`/profile/${session.user.id}`);
  }, [session, isPending, router]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
    </div>
  );
}