import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute w-16 h-16 border-l-4 border-b-4 border-x-primary  border-y-secondary  border-solid rounded-full animate-spin shadow-xl"></div>
    </div>
  );
};

export default Loading;
