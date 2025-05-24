import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AOS from "aos";
import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./toolkit/UserSlicer.jsx";
import { Provider } from "react-redux";
import "aos/dist/aos.css";
import "./index.css";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "./i18next.js";
AOS.init();

const store = configureStore({
  reducer: {
    user: UserSlice,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
