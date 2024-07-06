import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 border-4 border-greenColor border-solid border-t-transparent rounded-full animate-spin"></div>
        <span className="text-lg font-medium text-gray-700">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
