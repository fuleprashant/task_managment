import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  title: yup.string().required("Please enter the TITLE of the task"),
  description: yup
    .string()
    .min(10, "Description must be at least 10 characters long")
    .required("Please enter the description of the task"),
});

const AddTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onsubmit = async (data) => {
    console.log("data", data);
    reset();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("User is not authenticated");
      // return;
    }

    const response = await axios.post(
      "http://localhost:7985/user/create-task",
      {
        task: data.title,
        description: data.description,
      },

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    try {
      console.log("the resposne ", response);
      toast.success();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-600 px-4 sm:px-6">
      <form
        className="bg-white p-4 sm:p-6 rounded-lg shadow-md w-full max-w-sm sm:max-w-md"
        onSubmit={handleSubmit(onsubmit)}
      >
        <h2 className="text-xl sm:text-2xl text-center font-bold mb-4 text-gray-800">
          Add Task
        </h2>
        {/* Title Input */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-lg sm:text-xl font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title")}
            placeholder="Enter task title"
            className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>
        {/* Description Input */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-lg sm:text-xl font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description")}
            placeholder="Enter task description"
            rows="4"
            className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
