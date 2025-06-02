import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-purple-700 rounded-full animate-spin"></div>
        <div className="mt-4 text-center text-gray-600 font-medium">Loading...</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;