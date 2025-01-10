import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { IoHeartSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Card = ({ addData }) => {
  const data = [
    {
      title: "Frontend",
      desc: "Add dynamic state in the code",
    },
    {
      title: "Backend",
      desc: "Add the API to fetch the data.",
    },
    {
      title: "Database",
      desc: "Create a schema for the database.",
    },
    {
      title: "Server",
      desc: "Create a server for the application.",
    },
  ];

  return (
    <div className="m-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
      {data.map((ele, idx) => (
        <div key={idx} className="border-gray-300">
          <div className="p-6 border  rounded-lg">
            <h3 className="text-xl font-semibold text-white">{ele.title}</h3>
            <p className="mt-2 text-white">{ele.desc}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-white">Due Date: 2025-01-15</span>
            </div>
            <div className="flex justify-between items-center">
              <FaEdit
                className="text-gray-600 hover:text-blue-500 cursor-pointer"
                size={24}
              />
              <CiHeart
                className="text-red-500 hover:text-red-600 cursor-pointer"
                size={24}
              />{" "}
              <IoHeartSharp
                className="text-red-500 hover:text-red-600 cursor-pointer"
                size={24}
              />
              <FaTrashAlt
                className="text-red-500 hover:text-red-600 cursor-pointer"
                size={24}
              />
            </div>
          </div>
        </div>
      ))}

      {addData && (
        <NavLink className="bg-gray-500 shadow-lg rounded-lg p-6 flex justify-center items-center gap-5 cursor-pointer hover:bg-gray-700 transition-all">
          add task
        </NavLink>
      )}
    </div>
  );
};

export default Card;
