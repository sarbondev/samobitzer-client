import React from "react";
import { Header } from "../components/Header";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { ToastContainer } from "react-toastify";
import { Contacts } from "../components/Contacts";
import "react-toastify/dist/ReactToastify.min.css";

export const RootLayout = () => {
  return (
    <>
      <Header />
      <Contacts />
      <Outlet />
      <ToastContainer className={"z-[2132313123]"} />
      <Footer />
    </>
  );
};
