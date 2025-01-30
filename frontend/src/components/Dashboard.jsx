import axios from "axios";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all users
        const usersResponse = await axios.get(
          "http://localhost:7985/user/allUsers"
        );
        setUsers(usersResponse.data);

        // Fetch all tasks
        const tasksResponse = await axios.get(
          "http://localhost:7985/user/allTasks"
        );
        setTasks(tasksResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once on mount

  const usersTask = users.map((user) => {
    // Ensure tasks are available before filtering
    if (tasks.length === 0) return { fullname: user.fullname, tasks: [] };
    // Find tasks for each user
    const userTask = tasks.filter((task) => task.userId === user._id);
    return {
      fullname: user.fullname,
      tasks: userTask,
    };
  });

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Dashboard
        </h1>

        {users.length === 0 || tasks.length === 0 ? (
          <p className="text-center text-gray-500">
            Loading users and tasks...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {usersTask.map((userWithTasks, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  {userWithTasks.fullname}
                </h2>
                {/* Conditionally render tasks only if they exist */}
                {userWithTasks.tasks.length > 0 ? (
                  <div className="mt-4">
                    <ul className="space-y-4">
                      {userWithTasks.tasks.map((task) => (
                        <li
                          key={task._id}
                          className={`p-4 rounded-md shadow-sm transition-colors duration-300 ${
                            task.important
                              ? "bg-yellow-100 border-l-4 border-yellow-500"
                              : task.completed
                              ? "bg-green-100 border-l-4 border-green-500"
                              : "bg-gray-50"
                          }`}
                        >
                          <h3 className="font-semibold text-gray-800">
                            {task.task}
                          </h3>
                          <p className="text-gray-600">{task.description}</p>
                          <p className="text-sm text-gray-500">
                            <strong>Status: </strong>
                            {task.completed ? "Completed" : "Pending"}
                          </p>
                          {task.important && (
                            <p className="text-sm text-yellow-700 mt-2">
                              <strong>Important</strong>
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  // Display a message if no tasks are assigned
                  <p className="text-gray-500 mt-4">No tasks assigned</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
