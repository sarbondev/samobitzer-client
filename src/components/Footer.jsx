import {
  InstagramLogo,
  FacebookLogo,
  TelegramLogo,
  PhoneCall,
} from "@phosphor-icons/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const Footer = () => {
  const quickLinks = [
    {
      to: "/",
      title: "home",
    },
    {
      to: "/about",
      title: "about",
    },
    {
      to: "/projects",
      title: "projects",
    },
    {
      to: "/service",
      title: "services",
    },
  ];
  const { t } = useTranslation();
  return (
    <footer className="px-4 samo-gradient">
      <div className="container py-10 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-5">
          <img src="./logoWhite.png" className="w-[150px]" alt="" />
          <h3 className="text-white">COLD & VENTILATION COMPANY</h3>
        </div>
        <ul className="flex flex-col gap-3 text-white">
          {quickLinks.map((item, index) => (
            <li key={index}>
              <Link to={item.to}>
                {t(`nav_links.${item.title.toLowerCase()}`)}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col gap-5 text-white">
          <li>Наманган, Наманганская область, Узбекистан</li>
          <li>
            <a href="tel: +998905555055" className="flex items-center gap-2">
              <PhoneCall size={32} /> +998 (90) 555-50-55
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://www.instagram.com/samobitzerr/"
              className="flex items-center gap-2"
            >
              <InstagramLogo size={32} />
              @samobitzerr
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-2"
              href="https://www.facebook.com/profile.php?id=100076872815646&mibextid=LQQJ4d"
            >
              <FacebookLogo size={32} />
              @samobitzerr
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-2"
              href="https://t.me/samo_bitzeer"
            >
              <TelegramLogo size={32} />
              @samobitzer
            </a>
          </li>
        </ul>
      </div>
      <div className="container py-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <h1 className="text-white text-[13px]">{t("rights.title")}</h1>
        <h1 className="text-white text-[13px] md:text-end">
          {t("rights.made")}
        </h1>
      </div>
    </footer>
  );
};
