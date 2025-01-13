// import React from "react";
// import { CiHeart } from "react-icons/ci";
// import { FaEdit, FaTrashAlt } from "react-icons/fa";
// import { IoHeartSharp } from "react-icons/io5";
// import { NavLink } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// const Card = ({ addData }) => {
//   const navigate = useNavigate();
//   const data = [
//     {
//       title: "Frontend",
//       desc: "Add dynamic state in the code",
//     },
//     {
//       title: "Backend",
//       desc: "Add the API to fetch the data.",
//     },
//     {
//       title: "Database",
//       desc: "Create a schema for the database.",
//     },
//     {
//       title: "Server",
//       desc: "Create a server for the application.",
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 p-5">
//       {data.map((dat, idx) => (
//         <div
//           key={idx}
//           className="p-5 block bg-gray-500 border border-gray-500 rounded-lg shadow hover:bg-gray-700 "
//         >
//           <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//             Task: {dat.title}
//           </h5>
//           <p className="font-normal text-gray-700 dark:text-gray-400">
//             Description: {dat.desc}
//           </p>
//           <div className="mt-4 space-x-6">
//             <button className="mr-2">
//               <FaEdit className="text-gray-600 dark:text-gray-300" />
//             </button>
//             <button className="mr-2">
//               <FaTrashAlt className="text-red-600" />
//             </button>
//             <button className="mr-2">
//               <IoHeartSharp className="text-red-400" />
//             </button>
//             <button>
//               <CiHeart className="text-gray-600 dark:text-gray-300" />
//             </button>
//           </div>
//         </div>
//       ))}
//       {addData && (
//         <button
//           className="bg-gray-500 border rounded-lg shadow hover:bg-gray-700 h-40 w-64 flex justify-center items-center"
//           onClick={() => navigate("addtask")}
//         >
//           <div className="text-center">ADD task</div>
//         </button>
//       )}
//     </div>
//   );
// };

// export default Card;
import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { IoHeartSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Card = ({ addData }) => {
  const navigate = useNavigate();
  const data = [
    { title: "Frontend", desc: "Add dynamic state in the code" },
    { title: "Backend", desc: "Add the API to fetch the data." },
    { title: "Database", desc: "Create a schema for the database." },
    { title: "Server", desc: "Create a server for the application." },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 p-5">
      {data.map((dat, idx) => (
        <div
          key={idx}
          className="p-5 block bg-gray-500 border border-gray-500 rounded-lg shadow hover:bg-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Task: {dat.title}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Description: {dat.desc}
          </p>
          <div className="mt-4 space-x-6">
            <button className="mr-2">
              <FaEdit className="text-gray-600 dark:text-gray-300" />
            </button>
            <button className="mr-2">
              <FaTrashAlt className="text-red-600" />
            </button>
            <button className="mr-2">
              <IoHeartSharp className="text-red-400" />
            </button>
            <button>
              <CiHeart className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
      ))}
      {addData && (
        <div
          className="bg-gray-500 border rounded-lg shadow hover:bg-gray-700 h-40 w-64 flex justify-center items-center"
          onClick={() => navigate("/addtask")}
        >
          <div className="text-center">ADD task</div>
        </div>
      )}
    </div>
  );
};

export default Card;
