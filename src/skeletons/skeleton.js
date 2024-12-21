export const DashboardSkeleton = () => (
  <div className="animate-pulse min-h-[90vh] pb-4 h-auto flex flex-col bg-gray-100 px-6">
    {/* Header Area */}
    <div className="flex items-center justify-between my-4" style={{ minHeight: '100px' }}>
      <div className="w-[54%] h-16 bg-gray-200 rounded"></div>
      <div className="flex flex-col gap-2 min-w-[30%]">
        <div className="flex items-center">
          <div className="w-[140px] h-4 bg-gray-200 rounded"></div>
          <div className="w-full h-8 bg-gray-200 rounded ml-2"></div>
        </div>
        <div className="flex items-center">
          <div className="w-[140px] h-4 bg-gray-200 rounded"></div>
          <div className="w-full h-8 bg-gray-200 rounded ml-2"></div>
        </div>
      </div>
    </div>

    {/* Navbar Skeleton */}
    <div className="h-12 bg-gray-200 rounded-lg flex gap-2 px-4 mb-4 items-center justify-center">
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="h-8 w-24 bg-gray-300 rounded"></div>
      ))}
    </div>

    {/* Content Area Skeleton */}
    <div className="p-6 mt-2 bg-white rounded-lg">

      <div className="w-full mb-8 gap-4 ">
        <div className="h-8 w-[200px] mb-2 bg-gray-200 rounded"></div>
        <div className="h-8 w-[300px] bg-gray-200 rounded"></div>

      </div>
    </div>
  </div>
);

export const ProductTableSkeleton = () => {
  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        {/* Title Skeleton */}
        <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse" />

        {/* Search Bar Skeleton */}
        <div className="my-4">
          <div className="w-full max-w-[40%] h-10 bg-gray-200 rounded-lg animate-pulse" />
        </div>

        {/* Table Header Skeleton */}
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-[#4B449D] p-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          {/* Table Rows Skeleton */}
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="border-b p-4"
            >
              <div className="grid grid-cols-3 gap-4">
                <div className="h-6 bg- rounded animate-pulse" />
                <div className="h-6 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
