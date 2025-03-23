import React, { useContext } from "react";
import { ContextData } from "../context/Context";
import { Link } from "react-router-dom";
import { UseTeamFetch } from "../hooks/useTeamFetch";
import { Pencil, Trash } from "@phosphor-icons/react";
import axios from "axios";
import Swal from "sweetalert2";
import { Pending } from "../components/Pending";
import { useTranslation } from "react-i18next";

export const Team = () => {
  const { t } = useTranslation();
  const { isLogin, team, setTeam, teamPending, config, BackendUrlToConnect } =
    useContext(ContextData);
  UseTeamFetch(BackendUrlToConnect + "/team");
  const deleteService = async (id) => {
    try {
      await Swal.fire({
        title: "Olib tashlaymi?",
        text: "so'ng qaytara olmaysiz!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#07bc0c",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ha, O'chirib Tashlash!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "O'chirib tashlandi!",
            text: "Ishchi o'chirib tashlandi.",
            icon: "success",
          });
          axios.delete(BackendUrlToConnect + "api/team/delete/" + id, config);
          setTeam(team.filter((member) => member._id !== id));
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="px-4 py-20">
      <div data-aos="fade-up" className="container">
        <h1 className="text-3xl md:text-5xl text-center text-red-800 font-bold mb-10">
          {t("headings.ourteam.mainTitle")}
        </h1>
        {isLogin ? (
          <Link
            to={"/add-team-member"}
            className="bg-red-700 text-white py-2 px-5 rounded-md"
          >
            {t("headings.ourteam.add")}
          </Link>
        ) : (
          ""
        )}
        {teamPending ? (
          <Pending />
        ) : team.length > 0 ? (
          <div className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            {team.map((item, index) => (
              <div key={index}>
                <figure className="w-full">
                  <img
                    className="w-full rounded-full bg-slate-100"
                    src={item.image}
                    alt={item.job}
                  />
                </figure>
                <div className="p-4 flex flex-col gap-4 items-center">
                  <h1 className="font-bold">{item.name}</h1>
                  {isLogin ? (
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
          <div className="mt-10 rounded-l-xl h-[30vh] flex items-center justify-center bg-slate-100">
            <h1 className="text-red-800 font-bold text-3xl">NO DATA</h1>
          </div>
        )}
      </div>
    </section>
  );
};
