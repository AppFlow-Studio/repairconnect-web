"use client";

import Link from "next/link";

export default function ShopPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Shop</h1>
      <p className="text-gray-600 mb-8">Manage your shop profile and settings.</p>

      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          No shop configured yet
        </h2>
        <p className="text-gray-500 mb-6">
          Set up your shop to start accepting bookings and managing your team.
        </p>
        <Link
          href="/shop/setup"
          className="inline-flex items-center px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Set Up Shop
        </Link>
      </div>
    </div>
  );
}
