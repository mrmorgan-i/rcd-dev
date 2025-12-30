"use client";

import { signOut, useSession } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function AuthButtons() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const handleSignOut = async () => {
    await signOut();
    router.refresh();
  };

  if (isPending) {
    return (
      <div className="bg-gray-300 text-gray-300 px-4 py-2 rounded animate-pulse">
        Loading
      </div>
    );
  }

  if (session) {
    return (
      <button 
        onClick={handleSignOut} 
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
      >
        Sign Out
      </button>
    );
  }

  return (
    <Link 
      href="/login" 
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
    >
      Sign In
    </Link>
  );
}