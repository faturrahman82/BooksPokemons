export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white rounded-xl shadow-md p-4 h-64 flex flex-col justify-center items-center">
      <div className="w-24 h-24 bg-gray-300 rounded-full mb-4" />
      <div className="w-32 h-4 bg-gray-300 rounded mb-2" />
      <div className="w-24 h-3 bg-gray-200 rounded" />
    </div>
  );
}
