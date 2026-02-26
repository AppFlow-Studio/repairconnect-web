"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function SettingsPage() {
  const { signOut } = useClerk();
  const { user } = useUser();
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
      <p className="text-gray-600 mb-8">
        Manage your account and shop settings.
      </p>

      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        {/* Account info */}
        <div className="px-6 py-5">
          <p className="text-sm font-medium text-gray-500 mb-1">Signed in as</p>
          <p className="text-sm font-semibold text-gray-900">
            {user?.fullName ?? user?.primaryEmailAddress?.emailAddress ?? "—"}
          </p>
          {user?.primaryEmailAddress && user.fullName && (
            <p className="text-xs text-gray-500 mt-0.5">
              {user.primaryEmailAddress.emailAddress}
            </p>
          )}
        </div>

        {/* Sign out */}
        <div className="px-6 py-5">
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
          <p className="text-xs text-gray-400 mt-2">
            You will be redirected to the home page.
          </p>
        </div>
      </div>
    </div>
  );
}
