import React from "react";

const Loader = ({ isLoading }) => {
  return (
    <div className="max-h-full h-100 absolute flex bg-slate-200/30 inset-0 items-center backdrop-blur-sm justify-center">
      <div
        className={`h-10 w-10 rounded-full border-gray-400 border-2 border-dashed animate-spin ${
          isLoading ? "" : "hidden"
        } `}
      ></div>
    </div>
  );
};
export default Loader;
