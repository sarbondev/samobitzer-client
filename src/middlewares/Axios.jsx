import axios from "axios";

export const Axios = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://samobitzer-server.onrender.com/api",
  headers: {
    Authorization: JSON.parse(localStorage.getItem("samotoken")),
  },
});
