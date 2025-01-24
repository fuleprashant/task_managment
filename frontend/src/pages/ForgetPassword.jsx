import React from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";

// Validation schema for the form
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Plz enter your registerd Email it's required"),
});

const ForgetPassword = () => {
  const {
    register,
    handleSubmit, // added handleSubmit
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  // Form submission handler
  const onSubmit = async (data) => {
    // console.log("Email submitted:", data.email);
    const response = await axios.post(
      "http://localhost:7985/user/forgetpassword",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    toast.success(response.data.message);
    navigate("/auth/resetpassword");
    try {
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-700">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="email"
            >
              Enter your email address
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="Email Address"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <button
            type="submit" // changed onClick to type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
