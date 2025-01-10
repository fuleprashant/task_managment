import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const FirstLayout = () => {
  return (
    <div className="bg-slate-600 h-screen flex flex-col">
      <div className=" bg-slate-500">
        <Navbar />
      </div>
      <div className="flex  flex-grow">
        <div className=" hidden md:block w-64 bg-slate-700 h-full ">
          <Sidebar />
        </div>
        <div className>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default FirstLayout;
