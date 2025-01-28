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
import AddTask from "./pages/AddTask";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyOtp from "./pages/VerifyOtp";
import { ToastContainer } from "react-toastify"; // Import components
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./protectedroutes/ProtectedRoute.jsx";
import Dashboard from "./components/Dashboard.jsx";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <FirstLayout />
        </ProtectedRoute>
      ),
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
          path: "addtask",
          element: <AddTask />,
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
        {
          path: "addtask/:id",
          element: <AddTask />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
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
        {
          path: "forgetpassword",
          element: <ForgetPassword />,
        },
        {
          path: "resetpassword",
          element: <ResetPassword />,
        },
        {
          path: "verifyotp",
          element: <VerifyOtp />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
      {/* ToastContainer holds the toast notifications */}
      <ToastContainer
        position="top-right" // You can also use 'top-left', 'bottom-left', or 'bottom-right'
        autoClose={5000} // Auto close after 5 seconds
      />
    </div>
  );
};

export default App;
