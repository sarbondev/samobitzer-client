import React, { useState } from "react";
import { Axios } from "../middlewares/Axios";

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const loginToAccount = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = (await Axios.post("/admin/login", formData)).data;
      if (response.token) {
        localStorage.setItem("samotoken", JSON.stringify(response.token));
        setFormData({ ...formData, email: "", password: "" });
        window.location.href = "/";
      }
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <input type="checkbox" autoFocus={true} className="opacity-0 fixed" />
      <section className="h-screen">
        <div className="container h-full flex items-center justify-center px-3">
          <form
            onSubmit={loginToAccount}
            className="flex w-full md:w-[500px] flex-col gap-3 p-2"
          >
            <h1 className="text-2xl text-center text-red-700 font-bold">
              LOGIN
            </h1>
            {error && <p className="text-red-600">{error}</p>}
            <input
              className="bg-slate-100 rounded-lg p-2"
              type="email"
              name="email"
              placeholder="abc@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              className="bg-slate-100 rounded-lg p-2"
              type="password"
              name="password"
              placeholder="parol: xB63RiM"
              value={formData.password}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className={`hover:bg-red-700 rounded-lg text-white text-md py-1 border-2 border-red-800 ${
                isLoading ? "bg-red-800/70 cursor-wait" : "bg-red-800"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Loading" : "Login"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};
