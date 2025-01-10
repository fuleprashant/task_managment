import React from "react";
import { CiHome } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import {
  MdIncompleteCircle,
  MdOutlineLabelImportant,
  MdTask,
} from "react-icons/md";
import { FaStarHalfAlt } from "react-icons/fa";

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
    </div>
  );
};

export default Sidebar;
