const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#276dab] mx-auto"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
