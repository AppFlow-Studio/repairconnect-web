"use client";

export default function JobsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Jobs</h1>
      <p className="text-gray-600 mb-8">
        View and manage service requests and bookings.
      </p>

      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <p className="text-gray-500">No jobs yet. They will appear here once customers start booking.</p>
      </div>
    </div>
  );
}
