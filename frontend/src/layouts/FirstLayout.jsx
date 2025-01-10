import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const FirstLayout = () => {
  const [isSidebarVisible, setIsSideBarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSideBarVisible(!isSidebarVisible);
  };
  return (
    <div className="bg-slate-600 h-screen flex flex-col">
      <div className=" bg-slate-500">
        <Navbar isSidebarVisible={toggleSidebar} />
      </div>
      <div className="flex  flex-grow">
        {isSidebarVisible && (
          <div className="w-48 sm:w-64  bg-slate-700 h-full ">
            <Sidebar />
          </div>
        )}
        <div className>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default FirstLayout;
