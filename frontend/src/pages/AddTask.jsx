import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  title: yup.string().required("plz enter the TITLE of the task"),
  description: yup
    .string()
    .min(10, "Password must be at least 6 characters long")
    .required("plz enter the discription of the task"),
});

const AddTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onsubmit = (data) => {
    console.log("data", data);
  };
  return (
    <div className="flex justify-center items-center my-96 bg-gray-600">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit(onsubmit)}
      >
        <h2 className="text-xl md:text-2xl  text-center p-5 font-bold mb-4 text-gray-800">
          Add Task
        </h2>
        {/* Title Input */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-xl md:text-2xl  font-medium text-gray-700 "
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title")}
            name="title"
            placeholder="Enter task title"
            className="mt-1  md:p-5 block w-full rounded-md border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500text-xl md:text-2xl"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>
        {/* Description Input */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-2xl font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            {...register("description")}
            placeholder="Enter task description"
            rows="4"
            className="mt-1 p-5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-2xl"
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
