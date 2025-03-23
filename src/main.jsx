import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Context } from "./context/Context.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import "./index.css";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "./i18next.js";
AOS.init();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Context>
    <App />
  </Context>
);
