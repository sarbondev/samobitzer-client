import React, { useContext, useState } from "react";
import { ContextData } from "../context/Context.jsx";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { Pending } from "../components/Pending.jsx";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import { fetcher } from "../middlewares/Fetcher.jsx";
import AddServiceModal from "../components/Add-service-modal.jsx";

export const ServiceModule = () => {
  const { data, error, isLoading, mutate } = useSWR("/services", fetcher);
  const [isModalActive, setIsModalActive] = useState(false);

  const { t } = useTranslation();
  const { isLogin } = useContext(ContextData);

  const deleteService = async (id) => {
    try {
      const result = await Swal.fire({
        title: t("questions.delete"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#07bc0c",
        cancelButtonColor: "#d33",
        confirmButtonText: t("questions.answer"),
      });

      if (result.isConfirmed) {
        await axios.delete(
          BackendUrlToConnect + "/services/delete/" + id,
          config
        );
        setServices(services.filter((service) => service._id !== id));
        Swal.fire({
          title: t("questions.success"),
          icon: "success",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: t("errors.deleteService"),
        icon: "error",
      });
    }
  };

  return (
    <>
      <section className="px-4 py-20 bg-gray-50">
        <div className="container mx-auto">
          <h1
            className={`text-3xl md:text-5xl font-bold mb-10 text-red-800 text-center ${
              location.pathname === "/" ? "" : "hidden"
            }`}
          >
            {t("headings.services.mainTitle")}
          </h1>
          {isLogin && (
            <button
              onClick={() => setIsModalActive(true)}
              className="bg-red-700 text-white font-semibold text-[12px] md:text-sm py-2 px-4 rounded-md"
            >
              {t("headings.services.add")}
            </button>
          )}
          {isLoading ? (
            <Pending />
          ) : error ? (
            <div className="mt-3 rounded-l-xl h-[30vh] flex items-center justify-center bg-slate-100">
              <h1 className="text-red-800 font-bold text-3xl">
                Error loading data
              </h1>
            </div>
          ) : data && data.data && data.data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-5">
              {data.data.map((item, index) => (
                <ServiceCard
                  key={index}
                  item={item}
                  deleteService={deleteService}
                  isLogin={isLogin}
                  t={t}
                />
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-xl h-[30vh] flex items-center justify-center bg-white shadow-md">
              <h1 className="text-red-800 font-bold text-3xl">NO DATA</h1>
            </div>
          )}
        </div>
      </section>
      {isModalActive && (
        <AddServiceModal setIsModalActive={setIsModalActive} mutate={mutate} />
      )}
    </>
  );
};

const ServiceCard = ({ item, deleteService, isLogin, t }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative">
        <img
          className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
          src={item.image || "/placeholder.svg"}
          alt={item.title}
        />
        <div className="absolute top-1 right-1 bg-green-600 text-white py-1 px-2 text-[10px] font-semibold rounded-lg">
          {t("headings.services.waranty")}
        </div>
      </div>
      <div className="p-4 relative">
        {isLogin && (
          <div className="absolute top-2 right-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1 rounded-full bg-white shadow-md hover:bg-gray-100 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10">
                <Link
                  to={`/edit-service/${item._id}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("actions.edit")}
                </Link>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    deleteService(item._id);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  {t("actions.add")}
                </button>
              </div>
            )}
          </div>
        )}
        <Link
          to={`/service/${item._id}`}
          className="block text-xl font-semibold text-gray-800 hover:text-red-700 transition-colors duration-300 mb-2"
        >
          {item.title}
        </Link>
        <p className="text-gray-600 mb-4">
          {item.description && item.description.length > 100
            ? `${item.description.slice(0, 80)}...`
            : item.description}
        </p>
        <div className="flex justify-between items-center">
          <Link
            to={`/service/${item._id}`}
            className="text-red-700 hover:text-red-900 font-medium flex items-center gap-1 transition-colors duration-300"
          >
            {t("headings.aboutus.b")}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};
