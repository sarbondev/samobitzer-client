import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { Home } from "./pages/Home";
import { Error } from "./pages/Error";
import { Login } from "./pages/Login";
import { About } from "./pages/About";
import { Projects } from "./pages/Projects";
import { Service } from "./pages/Service";
import { ServiceDetails } from "./pages/details/ServiceDetails";
import { ProjectsDetails } from "./pages/details/ProjectsProjects";
import { User } from "./pages/User";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "*",
          element: <Error />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "projects",
          element: <Projects />,
        },
        {
          path: "service",
          element: <Service />,
        },
        {
          path: "service/:id",
          element: <ServiceDetails />,
        },
        {
          path: "projects/:id",
          element: <ProjectsDetails />,
        },
        {
          path: "admin/:id",
          element: <User />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
