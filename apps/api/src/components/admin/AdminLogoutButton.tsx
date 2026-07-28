"use client";

import { useRouter } from "next/navigation";

export function AdminLogoutButton({ adminPath }: { adminPath: string }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push(`/${adminPath}/login`);
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-cream/70 hover:text-cream transition-colors"
    >
      Sign out
    </button>
  );
}
