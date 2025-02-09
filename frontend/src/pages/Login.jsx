import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../features/user/userSlice";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

// submit handler function

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    dispatch(loginStart());
    try {
      // Make the API request
      const response = await axios.post(
        "http://localhost:7985/user/login",
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response);
      // If successful, handle success
      dispatch(loginSuccess(response.data.data));
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      // Handle errors properly
      const errorMessage = error.response?.data?.message || "An error occurred";
      dispatch(loginFailure(errorMessage));
      toast.error(errorMessage);
    }
  };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-slate-700">
    //   <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
    //     <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
    //       Welcome Back
    //     </h2>
    //     <p className="text-center text-gray-600 mb-6">
    //       Please login to your account
    //     </p>
    //     <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
    //       <div>
    //         <label
    //           htmlFor="email"
    //           className="block text-sm font-medium text-gray-700"
    //         >
    //           Email
    //         </label>
    //         <input
    //           type="email"
    //           id="email"
    //           {...register("email")}
    //           placeholder="Enter your email"
    //           className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
    //         />
    //         {errors.email && (
    //           <p className="text-red-500 text-xs mt-1">
    //             {errors.email.message}
    //           </p>
    //         )}
    //       </div>
    //       <div>
    //         <label
    //           htmlFor="password"
    //           className="block text-sm font-medium text-gray-700"
    //         >
    //           Password
    //         </label>
    //         <input
    //           type="password"
    //           id="password"
    //           {...register("password")}
    //           placeholder="Enter your password"
    //           className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
    //         />
    //         {errors.password && (
    //           <p className="text-red-500 text-xs mt-1">
    //             {errors.password.message}
    //           </p>
    //         )}
    //       </div>
    //       <div className="flex justify-between items-center">
    //         <label className="flex items-center text-sm text-gray-600">
    //           <input
    //             type="checkbox"
    //             className="h-4 w-4 text-purple-500 border-gray-300 rounded"
    //           />
    //           <span className="ml-2">Remember me</span>
    //         </label>
    //         <NavLink
    //           to="/auth/forgetpassword"
    //           className="text-sm text-purple-600 hover:underline"
    //         >
    //           Forgot Password?
    //         </NavLink>
    //       </div>
    //       <button
    //         type="submit"
    //         className="w-full bg-purple-300 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
    //       >
    //         Login
    //       </button>
    //     </form>
    //     <p className="text-center text-sm text-gray-600 mt-6">
    //       Don't have an account?{" "}
    //       <NavLink
    //         to="/auth/register"
    //         className="text-purple-600 hover:underline"
    //       >
    //         Register here
    //       </NavLink>
    //     </p>
    //   </div>
    // </div>
    <div className="min-h-screen flex items-center justify-center bg-slate-700">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Please login to your account
        </p>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex justify-between items-center">
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                className="h-4 w-4 text-purple-500 border-gray-300 rounded"
              />
              <span className="ml-2">Remember me</span>
            </label>
            <NavLink
              to="/auth/forgetpassword"
              className="text-sm text-purple-600 hover:underline"
            >
              Forgot Password?
            </NavLink>
          </div>

          {/* New Section for Account Verification Message */}
          <div className="mt-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 rounded">
            <p className="text-sm">
              If you're unable to log in, your account may not be verified.
              Please{" "}
              <NavLink
                to="/auth/verifyotp"
                className="text-yellow-700 font-semibold underline hover:text-yellow-800"
              >
                verify your account
              </NavLink>{" "}
              or check your email for verification instructions.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-300 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <NavLink
            to="/auth/register"
            className="text-purple-600 hover:underline"
          >
            Register here
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
