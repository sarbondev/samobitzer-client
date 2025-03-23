import { Envelope } from "@phosphor-icons/react";
import React from "react";
import { Link } from "react-router-dom";

export const Contacts = () => {
  return (
    <Link
      to={"/contact"}
      className="bg-red-700 fixed z-[2132] right-5 bottom-[83px] p-3 flex items-center justify-center rounded-full animate-pulse"
    >
      <Envelope size={30} className="text-white" />
    </Link>
  );
};
