import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-redColor border-solid border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-redColor rounded-full animate-pulse"></div>
          </div>
        </div>
        <span className="text-xl font-semibold text-redColor">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
