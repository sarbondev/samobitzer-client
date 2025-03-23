import React from "react";
import { FadeLoader } from "react-spinners";

export const Pending = () => {
  return (
    <div className="mt-10 rounded-l-xl h-[30vh] flex items-center justify-center bg-slate-100">
      <FadeLoader color="#800000" />
    </div>
  );
};
