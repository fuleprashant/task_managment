import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="bg-slate-500">
        <Navbar />
      </div>
      <div className="flex-grow overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
