import axios from "axios";

export const Axios = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    Authorization: JSON.parse(localStorage.getItem("samotoken")),
  },
});
