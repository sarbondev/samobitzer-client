import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ContextData } from "../../context/Context";

export const ProjectsDetails = () => {
  const { BackendUrlToConnect } = useContext(ContextData);
  const { id } = useParams();
  const [url, setUrl] = useState(BackendUrlToConnect + "/projects");
  const [project, setProject] = useState({});
  async function getData() {
    try {
      const data = (await axios.get(`${url}/${id}`)).data.data;
      setProject(data);
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
            {project.title}
          </h1>
        </div>
      </section>
      <section className="py-20 px-4">
        <div className="container">
          <p className="mb-20 text-xl font-bold">{project.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.images?.map((image, index) => (
              <div key={index} className="h-[400px] w-full">
                <img
                  className="w-full h-full object-cover"
                  src={image}
                  alt={project.title}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
