import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ContextData } from "../../context/Context";

export const ServiceDetails = () => {
  const { BackendUrlToConnect } = useContext(ContextData);
  const { id } = useParams();
  const [url, setUrl] = useState(BackendUrlToConnect + "api/services/");
  const [service, setService] = useState({});
  async function getData() {
    try {
      const data = (await axios.get(`${url}/${id}`)).data.data;
      setService(data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getData();
  }, [id]);
  return (
    <>
      <section className="h-[30vh] relative top-[70px]">
        <div className="container h-full flex items-center justify-center">
          <h1 className="text-red-700 text-5xl uppercase font-semibold">
            {service.title}
          </h1>
        </div>
      </section>
      <section className="py-20 px-4">
        <div className="container">
          <p className="mb-20 text-sm md:text-xl font-bold">
            {service.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.images?.map((image, index) => (
              <div key={index} className="h-[400px] w-full">
                <img
                  className="w-full h-full object-cover"
                  src={image}
                  alt={service.title}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
