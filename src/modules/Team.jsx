import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash } from "@phosphor-icons/react";
import Swal from "sweetalert2";
import { Pending } from "../components/Pending";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import { fetcher } from "../middlewares/Fetcher";
import AddTeamateModal from "../components/Add-teamate-modal";
import { Axios } from "../middlewares/Axios";
import { useSelector } from "react-redux";

export const Team = () => {
  const { data, error, isLoading, mutate } = useSWR("/team", fetcher);
  const [isModalActive, setIsModalActive] = useState(false);
  const { isAuth } = useSelector((state) => state.user);

  const { t } = useTranslation();

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
        await Axios.delete(`/team/delete/${id}`);
        Swal.fire({
          title: t("questions.success"),
          icon: "success",
        });
        mutate((state) => state.data.filter((team) => team._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  document.body.style.overflowY = isModalActive ? "hidden" : "auto";

  return (
    <>
      <section className="px-4 py-20">
        <div data-aos="fade-up" className="container">
          <h1 className="text-3xl md:text-5xl text-center text-red-800 font-bold mb-10">
            {t("headings.ourteam.mainTitle")}
          </h1>
          {isAuth ? (
            <button
              onClick={() => setIsModalActive(true)}
              className="bg-red-700 text-white font-semibold text-[12px] md:text-sm py-2 px-4 rounded-md"
            >
              {t("headings.ourteam.add")}
            </button>
          ) : (
            ""
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
            <div className="pt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
              {data.data.map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-100 shadow-lg rounded-lg overflow-hidden"
                >
                  <figure className="w-full">
                    <img
                      className="w-full h-[300px] bg-slate-100 object-cover"
                      src={item.image}
                      alt={item.experience}
                    />
                  </figure>
                  <div className="p-4 space-y-2">
                    <h1 className="font-bold">{item.name}</h1>
                    <h1 className="font-normal text-gray-700">
                      {item.experience}
                    </h1>
                    {isAuth ? (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => deleteService(item._id)}
                          className="text-sm flex items-center bg-black text-white py-1 px-2 rounded-lg gap-1"
                        >
                          {t("actions.add")} <Trash />
                        </button>
                        <Link
                          to={`/edit-team-member/${item._id}`}
                          className="text-sm flex items-center bg-green-600 text-white py-1 px-2 rounded-lg gap-1"
                        >
                          {t("actions.edit")} <Pencil />
                        </Link>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-[40vh] items-center justify-center">
              <h1>Пока что нет проектов</h1>
            </div>
          )}
        </div>
      </section>
      {isModalActive && (
        <AddTeamateModal setIsModalActive={setIsModalActive} mutate={mutate} />
      )}
    </>
  );
};
