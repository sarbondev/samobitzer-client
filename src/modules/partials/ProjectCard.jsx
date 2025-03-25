import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { Axios } from "../../middlewares/Axios";
import { useSelector } from "react-redux";

export const ProjectCard = ({ item, mutate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { isAuth } = useSelector((state) => state.user);

  const deleteProject = async (id) => {
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
        await Axios.delete(`/projects/delete/${id}`);
        mutate((state) => state.data.filter((prod) => prod._id !== id));
        Swal.fire({
          title: t("questions.success"),
          icon: "success",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: t("errors.deleteProject"),
        icon: "error",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative">
        <Link to={`/projects/${item._id}`} className="block">
          <img
            src={item.images[0] || "/placeholder.svg"}
            className="w-full h-48 object-cover transition-all duration-300 hover:scale-105"
            alt={item.title}
          />
        </Link>
        {isAuth && (
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
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-lg z-10">
                <Link
                  to={`/edit-project/${item._id}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("actions.edit")}
                </Link>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    deleteProject(item._id);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  {t("actions.add")}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="p-4">
        <Link
          to={`/projects/${item._id}`}
          className="text-xl font-semibold text-gray-800 hover:text-gray-600 transition-colors duration-300"
        >
          {item.title.length > 35
            ? `${item.title.slice(0, 45)}...`
            : item.title}
        </Link>
        <p className="mt-2 text-gray-600 text-sm">
          {item.description && item.description.length > 100
            ? `${item.description.slice(0, 100)}...`
            : item.description}
        </p>
      </div>
      <div className="px-4 py-3 bg-gray-50 flex justify-between items-center">
        <span className="text-sm text-gray-600">
          {new Date(item.createdAt).toLocaleDateString()}
        </span>
        <Link
          to={`/projects/${item._id}`}
          className="text-sm font-medium text-red-600 hover:text-red-500 transition-colors duration-300"
        >
          &rarr;
        </Link>
      </div>
    </div>
  );
};
