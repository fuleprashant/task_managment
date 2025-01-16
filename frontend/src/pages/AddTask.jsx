import React, { useState } from "react";

const AddTask = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-600">
      <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
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
            name="title"
            placeholder="Enter task title"
            className="mt-1  md:p-5 block w-full rounded-md border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500text-xl md:text-2xl"
          />
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
            placeholder="Enter task description"
            rows="4"
            className="mt-1 p-5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-2xl"
          ></textarea>
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
