import Link from "next/link";
import Image from "next/image";

export default function ShopOnlyPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <Image src="/logo.png" alt="Otopair" width={64} height={64} className="mb-6" />
      <h1 className="text-2xl font-bold text-gray-900 mb-3 text-center">
        This portal is for shops
      </h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        The Otopair portal is designed for shop owners and mechanics. If you&apos;re a
        car owner looking for service, our consumer app is coming soon!
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
