import React, { useEffect, useState } from "react";
import axios from "axios";
import { CiHeart } from "react-icons/ci";
import { FaEdit, FaTrashAlt, FaCheck, FaRegCheckCircle } from "react-icons/fa";
import { IoHeartSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Card = ({ addData }) => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:7985/user/alltask", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data.tasks || []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7985/user/deletetask/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/addtask/${id}`);
  };

  const handleImportantToggle = async (id, currentStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:7985/user/important/${id}`,
        { important: !currentStatus }, // Toggle the important state
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, important: !currentStatus } : task
        )
      );
    } catch (error) {
      console.error("Error toggling task importance:", error);
    }
  };

  const handleCompletedToggle = async (id, currentStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:7985/user/completed/${id}`,
        { completed: !currentStatus }, // Toggle the completed state
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, completed: !currentStatus } : task
        )
      );
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold text-center mb-5 text-gray-800 dark:text-white">
        Task List
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tasks.map((task, idx) => (
          <div
            key={idx}
            className="p-5 bg-white border border-gray-300 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow"
          >
            <h5 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Task - {task.task}
            </h5>
            <p className="text-gray-700 dark:text-gray-300">
              Description - {task.description}
            </p>
            <div className="flex justify-between items-center mt-4">
              <button onClick={() => handleEdit(task._id)}>
                <FaEdit className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400" />
              </button>
              <button onClick={() => handleDelete(task._id)}>
                <FaTrashAlt className="text-red-500 hover:text-red-700" />
              </button>
              <button
                onClick={() => handleImportantToggle(task._id, task.important)}
              >
                {task.important ? (
                  <IoHeartSharp className="text-red-500 hover:text-red-700" />
                ) : (
                  <CiHeart className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-400" />
                )}
              </button>
              <button
                onClick={() => handleCompletedToggle(task._id, task.completed)}
              >
                {task.completed ? (
                  <FaCheck className="text-green-500 hover:text-green-700" />
                ) : (
                  <FaRegCheckCircle className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-400" />
                )}
              </button>
            </div>
          </div>
        ))}
        {addData && (
          <div
            className="flex items-center justify-center p-5 bg-gray-100 border border-dashed border-gray-400 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-md cursor-pointer"
            onClick={() => navigate("/addtask")}
          >
            <span className="text-center text-gray-600 dark:text-gray-300">
              + Add New Task
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
