const LoadingScreen = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-app-bg text-white">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-app-primary border-t-transparent rounded-full animate-spin"></div>

      {/* Text */}
      <p className="mt-6 text-lg font-medium tracking-wide text-gray-300">
        ... Loading ...
      </p>
    </div>
  );
};

export default LoadingScreen;
