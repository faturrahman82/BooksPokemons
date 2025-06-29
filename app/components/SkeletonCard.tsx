export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white rounded-xl shadow-md p-3 sm:p-4 md:p-5 h-56 sm:h-64 md:h-72 flex flex-col justify-center items-center">
      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gray-300 rounded-full mb-3 sm:mb-4 md:mb-5" />
      <div className="w-24 h-3 sm:w-32 sm:h-4 md:w-36 md:h-5 bg-gray-300 rounded mb-2 sm:mb-3" />
      <div className="w-20 h-2 sm:w-24 sm:h-3 md:w-28 md:h-4 bg-gray-200 rounded" />
    </div>
  );
}