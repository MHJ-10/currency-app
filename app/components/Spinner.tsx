import React from "react";

const Spinner = () => {
  return (
    <div className="flex h-screen items-center justify-center space-x-3 -mt-20">
      <span className="sr-only">Loading...</span>
      <div className="h-8 w-8 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.20s]"></div>
      <div className="h-8 w-8 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.15s]"></div>
      <div className="h-8 w-8 animate-bounce rounded-full bg-blue-700 [animation-delay:-0.10]"></div>
      <div className="h-8 w-8 animate-bounce rounded-full bg-blue-800 [animation-delay:-0.5]"></div>
      <div className="h-8 w-8 animate-bounce rounded-full bg-blue-900"></div>
    </div>
  );
};

export default Spinner;
