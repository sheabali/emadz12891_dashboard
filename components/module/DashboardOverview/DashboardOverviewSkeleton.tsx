export default function DashboardOverviewSkeleton() {
  return (
    <div className="space-y-6 animate-pulse p-6 bg-gray-50 min-h-screen">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-8 w-32 bg-gray-300 rounded" />
            <div className="h-3 w-16 bg-gray-200 rounded" />
          </div>
        ))}
      </div>

      <div className="w-full bg-white rounded-2xl shadow-md p-6">
        <div className="h-5 w-40 bg-gray-200 rounded mb-4" />
        <div className="h-[300px] md:h-[400px] lg:h-[450px] bg-gray-100 rounded-xl" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-md p-6 space-y-4">
          <div className="h-5 w-32 bg-gray-200 rounded" />
          <div className="h-[260px] bg-gray-100 rounded-xl" />
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 space-y-4">
          <div className="h-5 w-40 bg-gray-200 rounded mb-4" />
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 bg-gray-100 rounded-xl w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
