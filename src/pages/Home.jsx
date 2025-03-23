import React from "react";
import { Hero } from "../modules/Hero";
import { AboutModule } from "../modules/AboutModule";
import { ServiceModule } from "../modules/ServiceModule";
import { ProjectsModule } from "../modules/ProjectsModule";
import { Team } from "../modules/Team";
import { PartnersModule } from "../modules/PartnersModule";
import { Contact } from "./Contact";

export const Home = () => {
  return (
    <>
      <input type="checkbox" autoFocus={true} className="opacity-0 fixed" />
      <Hero />
      <AboutModule />
      <ServiceModule />
      <ProjectsModule />
      <Team />
      <PartnersModule />
      <Contact />
    </>
  );
};
