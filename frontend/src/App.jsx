import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FirstLayout from "./layouts/FirstLayout";
import Home from "./pages/Home";
import AllTask from "./pages/AllTask";
import Important from "./pages/Important";
import CompleteTask from "./pages/CompleteTask";
import InCompleted from "./pages/InCompleted";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthLayout from "./layouts/AuthLayout";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <FirstLayout />,
      children: [
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "alltask",
          element: <AllTask />,
        },
        {
          path: "impotanttask",
          element: <Important />,
        },
        {
          path: "completedtask",
          element: <CompleteTask />,
        },
        {
          path: "incompletedtask",
          element: <InCompleted />,
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
