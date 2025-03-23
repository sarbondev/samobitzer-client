import React, { useContext } from "react";
import { ContextData } from "../context/Context";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { Pencil, Plus, SignOut, Trash } from "@phosphor-icons/react";
import axios from "axios";
import { useTranslation } from "react-i18next";

export const User = () => {
  const { t } = useTranslation();
  const { admin, setIsLogin, config, BackendUrlToConnect } =
    useContext(ContextData);
  const UrlToDelete = BackendUrlToConnect + "api/admin/delete/";
  const navigate = useNavigate();
  const logoutFromAccount = () => {
    Swal.fire({
      title: t("admin.questions2.delete"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#07bc0c",
      cancelButtonColor: "#d33",
      confirmButtonText: t("admin.questions2.answer"),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: t("admin.questions2.success"),
          icon: "success",
        });
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        setIsLogin(false);
        navigate("/");
      }
    });
  };
  const DeleteAccount = async () => {
    Swal.fire({
      title: t("admin.questions.delete"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#07bc0c",
      cancelButtonColor: "#d33",
      confirmButtonText: t("admin.questions.answer"),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: t("admin.questions.succes"),
          icon: "success",
        });
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        const response = axios.delete(`${UrlToDelete + admin._id}`, config);
        setIsLogin(false);
        navigate(`/admin/${admin._id}`);
      }
    });
  };
  return (
    <>
      <input type="checkbox" autoFocus={true} className="opacity-0" />
      <section className="h-screen">
        <div className="container h-full flex flex-col items-center justify-center gap-5">
          <img
            width={100}
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt=""
          />
          <div className="flex px-4 flex-col gap-3">
            <h1 className="text-2xl">Admin: {admin.name}</h1>
            <h1>Email: {admin.email}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                to={`/admin/update/${admin._id}`}
                className="text-white bg-green-600 flex items-center gap-2 p-2 rounded-lg justify-center"
              >
                {t("admin.edit")} <Pencil />
              </Link>
              <button
                onClick={DeleteAccount}
                className="bg-red-700 text-white flex items-center gap-2 p-2 rounded-lg justify-center"
              >
                {t("admin.delete")} <Trash />
              </button>
              <button
                className="text-white bg-black flex items-center gap-2 p-2 rounded-lg justify-center"
                onClick={logoutFromAccount}
              >
                {t("admin.logout")} <SignOut />
              </button>
              <Link
                to={"/admin/create"}
                className="border-2 flex items-center px-2 rounded-lg bg-blue-600 text-white justify-center"
              >
                {t("admin.add")} <Plus />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
