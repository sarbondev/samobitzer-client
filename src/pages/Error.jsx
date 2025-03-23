import { ArrowRight } from "@phosphor-icons/react";
import React from "react";
import { Link } from "react-router-dom";

export const Error = () => {
  return (
    <section className="h-screen">
      <input type="checkbox" autoFocus={true} className="opacity-0" />
      <div className="container h-full flex flex-col gap-2 items-center justify-center ">
        <h1 className="text-8xl md:text-[180px]">
          4<span className="text-red-700">0</span>4
        </h1>
        <h3 className="text-2xl text-red-700">Nosozlik ro'y berdi</h3>
        <Link className="flex items-center text-2xl bg-red-700 text-white px-6 py-1">
          Ortga qaytish <ArrowRight />
        </Link>
      </div>
    </section>
  );
};
