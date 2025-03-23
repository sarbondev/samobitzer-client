import React from "react";
import {
  ArrowRight,
  ChartLineUp,
  CheckCircle,
  ClockUser,
  ListNumbers,
  ThumbsUp,
  UsersThree,
} from "@phosphor-icons/react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const AboutModule = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const advantages = [
    {
      icon: <CheckCircle />,
      title: "reliability",
      body: "Our company has more than 20 years of experience in the market, which indicates a high level of reliability and professionalism.",
    },
    {
      icon: <ChartLineUp />,
      title: "innovation",
      body: "We constantly introduce the latest technologies into production, which allows us to offer the most modern equipment.",
    },
    {
      icon: <UsersThree />,
      title: "qualification",
      body: "Our team consists of qualified specialists who can provide professional advice and assistance.",
    },
    {
      icon: <ListNumbers />,
      title: "range",
      body: "We offer a wide range of HVAC equipment to suit different customer needs.",
    },
    {
      icon: <ThumbsUp />,
      title: "quality",
      body: "We adhere to international quality standards, which guarantees the high quality of our equipment.",
    },
    {
      icon: <ClockUser />,
      title: "deadline",
      body: "Some items from the assortment are always in stock, and production times for other items are kept to a minimum.",
    },
  ];
  return (
    <>
      <section
        className={`px-4 ${
          location.pathname == "/" ? "py-20 bg-slate-100" : ""
        }`}
      >
        <div className="container pb-10 md:pb-20">
          <h1
            data-aos="fade-up"
            className={`text-3xl md:text-5xl font-bold  text-red-700 text-center ${
              location.pathname == "/" ? "" : "hidden"
            }`}
          >
            {t("headings.aboutus.mainTitle")}
          </h1>
        </div>
        <div className="container grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          <div
            data-aos="fade-right"
            className="flex flex-col items-start gap-7"
          >
            <h1 className=" text-xl md:text-5xl font-bold">
              {t("headings.aboutus.h1")}
            </h1>
            <p className=" text-sm md:text-md text-slate-600">
              {t("headings.aboutus.p")}
            </p>
            <Link
              to={"/about"}
              className="flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white text-lg px-6 py-2 rounded-lg"
            >
              {t("headings.aboutus.b")} <ArrowRight />
            </Link>
          </div>
          <div data-aos="fade-left" className="relative flex justify-center">
            <div className="absolute left-0 bottom-0 text-white bg-red-700 w-[70px] h-[70px] md:w-[90px] md:h-[90px] flex flex-col items-center justify-center">
              <h1 className="text-lg md:text-2xl ">2002</h1>
              <span className="text-sm">SINCE</span>
            </div>
            <img className="w-full" src="./aboutHero.png" alt="" />
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container">
          <h1 className="text-center text-3xl md:text-5xl text-red-800  font-bold">
            {t("features.mainTitle")}
          </h1>
          <div className="mt-20 grid gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {advantages.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-5 p-3">
                <span className="text-5xl text-red-800">{item.icon}</span>
                <h1 className="text-xl text-red-800 font-bold">
                  {t(`features.${item.title}`)}
                </h1>
                <p className="text-center text-sm">
                  {" "}
                  {t(`features.${item.title}Body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
