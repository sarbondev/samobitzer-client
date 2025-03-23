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
  const [pageIsPending, setPageIsPending] = useState(false);
  const [services, setServices] = useState([]);
  const [team, setTeam] = useState([]);
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
        services,
        setServices,
        serPending,
        setSerPending,
        teamPending,
        setTeamPending,
        isLogin,
        setIsLogin,
        team,
        setTeam,
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
