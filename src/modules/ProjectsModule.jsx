import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ContextData } from "../context/Context";
import { UseProjectsFetch } from "../hooks/useProjectsFetch";
import { ProjectCard } from "./partials/ProjectCard";
import { Pending } from "../components/Pending";
import { useTranslation } from "react-i18next";

export const ProjectsModule = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { projects, isLogin, proPending, BackendUrlToConnect } =
    useContext(ContextData);
  const homePageProjects = projects.slice(0, 6);
  const [url, setUrl] = useState(BackendUrlToConnect + "/projects");
  const newUrl = BackendUrlToConnect + "/projects";
  UseProjectsFetch(url);
  return (
    <section className="px-4 py-20">
      <div data-aos="fade-up" className="container">
        <h1
          className={`text-4xl md:text-5xl font-bold mb-20 text-red-800 text-center ${
            location.pathname == "/" ? "" : "hidden"
          }`}
        >
          {t("headings.projects.mainTitle")}
        </h1>
        <div className="flex items-center gap-3 flex-wrap">
          {isLogin ? (
            <Link
              to={"/add-project"}
              className="bg-red-700 text-white py-2 px-5 rounded-md"
            >
              {t("headings.projects.add")}
            </Link>
          ) : (
            ""
          )}
          <button
            className="bg-slate-200 py-2 px-4 rounded-md"
            onClick={() => setUrl(newUrl)}
          >
            {t("filters.all")}
          </button>
          <button
            className="bg-slate-200 py-2 px-4 rounded-md"
            onClick={() => setUrl(newUrl + "?category=vrfsystem")}
          >
            {" "}
            {t("filters.vrfsystem")}
          </button>
          <button
            className="bg-slate-200 py-2 px-4 rounded-md"
            onClick={() => setUrl(newUrl + "?category=camerafreezer")}
          >
            {" "}
            {t("filters.camera")}
          </button>
          <button
            className="bg-slate-200 py-2 px-4 rounded-md"
            onClick={() => setUrl(newUrl + "?category=shelf")}
          >
            {" "}
            {t("filters.stellaj")}
          </button>
          <button
            className="bg-slate-200 py-2 px-4 rounded-md"
            onClick={() => setUrl(newUrl + "?category=sandwichpanel")}
          >
            {" "}
            {t("filters.sandwich")}
          </button>
          <button
            className="bg-slate-200 py-2 px-4 rounded-md"
            onClick={() => setUrl(newUrl + "?category=others")}
          >
            {" "}
            {t("filters.other")}
          </button>
        </div>
        {proPending ? (
          <Pending />
        ) : projects.length > 0 ? (
          <div className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {location.pathname == "/"
              ? homePageProjects.map((item, index) => (
                  <ProjectCard data-aos="zoom-in" key={index} item={item} />
                ))
              : projects.map((item, index) => (
                  <ProjectCard data-aos="zoom-in" key={index} item={item} />
                ))}
          </div>
        ) : (
          <div className="mt-10 rounded-l-xl h-[30vh] flex items-center justify-center bg-slate-100">
            <h1 className="text-red-800 font-bold text-3xl">NO DATA</h1>
          </div>
        )}
      </div>
    </section>
  );
};
