import React, { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { Home } from "./pages/Home";
import { Error } from "./pages/Error";
import { Login } from "./pages/Login";
import { About } from "./pages/About";
import { Projects } from "./pages/Projects";
import { Service } from "./pages/Service";
import { ProjectsDetails } from "./pages/ProjectsDetail";
import { useDispatch } from "react-redux";
import { setError, setPending, setUser } from "./toolkit/UserSlicer";
import { Axios } from "./middlewares/Axios";
import ServiceDetail from "./pages/ServiceDetail";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getMyData() {
      try {
        dispatch(setPending());
        const response = await Axios.get("admin/profile");
        if (!response.data.message) {
          dispatch(setUser(response.data));
        } else {
          dispatch(setError(response.data.message));
        }
      } catch (error) {
        dispatch(setError(error.response?.data || "Unknown Token"));
      }
    }
    getMyData();
  }, [dispatch]);

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
          path: "services",
          element: <Service />,
        },
        {
          path: "services/:id",
          element: <ServiceDetail />,
        },
        {
          path: "projects/:id",
          element: <ProjectsDetails />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
