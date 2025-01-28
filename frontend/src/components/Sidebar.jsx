import React from "react";
import { CiHome } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import {
  MdIncompleteCircle,
  MdOutlineLabelImportant,
  MdTask,
} from "react-icons/md";
import { FaStarHalfAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";

const Sidebar = () => {
  const data = [
    {
      title: "Home",
      path: "/home",
      icon: <CiHome />,
    },
    {
      title: "All Tasks",
      path: "/alltask",
      icon: <MdTask />,
    },
    {
      title: "Important Task",
      path: "/impotanttask",
      icon: <MdOutlineLabelImportant />,
    },
    {
      title: "Completed Task",
      path: "/completedtask",
      icon: <MdIncompleteCircle />,
    },
    {
      title: "Incompleted Task",
      path: "/incompletedtask",
      icon: <FaStarHalfAlt />,
    },
  ];

  const token = localStorage.getItem("token");

  const handleLogout = async () => {
    try {
      // Remove token and user data from localStorage

      // Make a GET request to the logout endpoint
      await axios.get("http://localhost:7985/user/logout", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("profile");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      <div className="space-y-5 font-thin w-full mt-40">
        {data.map((ele, idx) => (
          <NavLink
            key={idx}
            to={ele.path}
            className={({ isActive }) =>
              `text-white flex gap-2  p-2 text-3xl rounded-md ${
                isActive ? "bg-slate-900" : "hover:bg-slate-900"
              }`
            }
          >
            <div>{ele.icon}</div>
            <h1 className="text-[20px]">{ele.title}</h1>
          </NavLink>
        ))}
      </div>
      <div className="hover:bg-slate-600  mt-56">
        <div className=" ml-5  font-thin  w-full">
          <div className=" ">
            <NavLink
              to="auth/login"
              className=" text-white flex items-center gap-2  p-2 text-3xl rounded-md"
              onClick={handleLogout}
            >
              <FiLogOut size={24} />
              <div className="text-2xl">Logout</div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
