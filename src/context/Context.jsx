import React, { createContext, useState } from "react";
export const ContextData = createContext();
export const Context = ({ children }) => {
  const config = {
    headers: {
      Authorization: JSON.parse(localStorage.getItem("samotoken")),
    },
  };
  // const BackendUrlToConnect = "https://backend.samobitzer.uz/";
  const BackendUrlToConnect = "http://localhost:5000/api";
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [pageIsPending, setPageIsPending] = useState(false);
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [team, setTeam] = useState([]);
  const [proPending, setProPending] = useState(false);
  const [serPending, setSerPending] = useState(false);
  const [teamPending, setTeamPending] = useState(false);
  const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem("admin")));
  const [isLogin, setIsLogin] = useState(
    JSON.parse(localStorage.getItem("samotoken")) ? true : false
  );
  return (
    <ContextData.Provider
      value={{
        pageIsPending,
        setPageIsPending,
        projects,
        setProjects,
        services,
        setServices,
        proPending,
        setProPending,
        serPending,
        setSerPending,
        teamPending,
        setTeamPending,
        isLogin,
        setIsLogin,
        team,
        setTeam,
        prevScrollPos,
        setPrevScrollPos,
        visible,
        setVisible,
        admin,
        setAdmin,
        config,
        BackendUrlToConnect,
      }}
    >
      {children}
    </ContextData.Provider>
  );
};
