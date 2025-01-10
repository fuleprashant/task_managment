import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FirstLayout from "./layouts/FirstLayout";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <FirstLayout />,
      
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
