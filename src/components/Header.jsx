import { List, X } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export const Header = () => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();

  const navLinks = [
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
      to: "/services",
      title: "services",
    },
  ];

  const languages = [
    {
      code: "ru",
      name: "🇷🇺",
      flag: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Flag_of_Russia.svg/800px-Flag_of_Russia.svg.png",
    },
    {
      code: "uz",
      name: "🇺🇿",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Flag_of_Uzbekistan.svg/1200px-Flag_of_Uzbekistan.svg.png",
    },
    {
      code: "en",
      name: "🇺🇸",
      flag: "https://cdn.britannica.com/79/4479-050-6EF87027/flag-Stars-and-Stripes-May-1-1795.jpg",
    },
  ];

  const { isAuth } = useSelector((state) => state.user);

  const [navActive, setNavActive] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setScrollY(window.pageYOffset);

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
      setScrollY(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const headerStyle = {
    top: visible ? "0" : "-100px",
  };

  document.body.style.overflowY = navActive ? "hidden" : "auto";

  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || i18n.language
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("selectedLanguage", selectedLanguage);
  }, [selectedLanguage, i18n]);

  return (
    <>
      <header
        style={headerStyle}
        className={`${
          pathname !== "/" || scrollY >= 300 ? "bg-red-800" : "bg-transparent"
        } px-4 h-[70px] z-40 fixed left-0 w-full
        `}
      >
        <div className="container h-full flex justify-between items-center">
          <Link to={"/"}>
            <img src="./logoWhite.png" className="w-[50px]" alt="" />
          </Link>
          <nav
            className={`flex items-center gap-12 ${navActive ? "" : "active"}`}
          >
            <ul className="flex items-center gap-5">
              {navLinks.map((item, index) => (
                <li
                  onClick={() => setNavActive(false)}
                  className={`md:text-white font-semibold`}
                  key={index}
                >
                  <Link to={item.to}>
                    {t(`nav_links.${item.title.toLowerCase()}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex gap-5 items-center">
            <div className="relative w-[70px]">
              <button
                className="flex items-center justify-between gap-2 w-full bg-white/20 px-3 py-2 rounded-md"
                onClick={() => setIsOpen(!isOpen)}
              >
                {languages.map((lang) =>
                  lang.code === selectedLanguage.slice(0, 2) ? (
                    <div
                      key={lang.code}
                      className="flex items-center justify-between w-full"
                    >
                      <img
                        src={lang.flag}
                        alt={lang.name}
                        className="w-[20px]"
                      />
                      <span className="text-white">▼</span>
                    </div>
                  ) : null
                )}
              </button>

              {isOpen && (
                <ul className="absolute top-full left-0 w-full bg-gray-800 text-white rounded-md shadow-md mt-1">
                  {languages.map((lang) => (
                    <li
                      key={lang.code}
                      className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-700"
                      onClick={() => {
                        setSelectedLanguage(lang.code);
                        setIsOpen(false);
                      }}
                    >
                      <span>{lang.name}</span>
                      <img
                        src={lang.flag}
                        alt={lang.name}
                        className="w-[20px]"
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {!isAuth && (
              <Link
                to={`/login`}
                className={`rounded-lg text-red-700 bg-white font-bold py-2 px-4`}
              >
                LOGIN
              </Link>
            )}
            <div className="md:hidden flex items-center gap-3">
              {navActive ? (
                <X
                  className="text-white"
                  size={27}
                  onClick={() => setNavActive(false)}
                />
              ) : (
                <List
                  className="text-white"
                  size={27}
                  onClick={() => setNavActive(true)}
                />
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
