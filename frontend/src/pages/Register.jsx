import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  registrationFailure,
  registrationStart,
  registrationSuccess,
} from "../features/user/userSlice";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  fullname: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  profilePicture: yup
    .mixed()
    .test("fileSize", "The file is too large", (value) => {
      return !value || (value[0] && value[0].size <= 2 * 1024 * 1024); // 2MB limit
    })
    .test("fileType", "Unsupported file type", (value) => {
      return (
        !value ||
        (value[0] &&
          ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type))
      );
    }),
});

// const onsubmit = (data) => {
//   console.log("form submitted", data);
// };

const Register = () => {
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // const onsubmit = async (data) => {
  //   console.log("old", data);

  //   dispatch(registrationStart());

  //   // Ensure that profilePicture is an array or FileList object
  //   if (data.profilePicture && data.profilePicture.length > 0) {
  //     const formData = new FormData();
  //     formData.append("fullname", data.fullname);
  //     formData.append("email", data.email);
  //     formData.append("password", data.password);
  //     formData.append("profilePicture", data.profilePicture[0]); // Append file

  //     const response = await axios.post(
  //       "http://localhost:7985/user/signup",
  //       formData,
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     try {

  //       dispatch(registrationSuccess({ user: response.data.data }));
  //     } catch (error) {
  //       dispatch(registrationFailure({ error: error.response.data.message }));
  //     }
  //   } else {
  //     console.log("No file selected.");
  //   }

  //   // The reason you're using FormData.append() in your code is to prepare the form data in a way that can be easily submitted via an HTTP request, especially when you're working with files (like profile pictures). Here's a breakdown of why FormData is necessary and why you need to append data in this way:
  // };

  const onsubmit = async (data) => {
    console.log("old", data);

    dispatch(registrationStart());

    // Ensure that profilePicture is an array or FileList object
    if (data.profilePicture && data.profilePicture.length > 0) {
      const formData = new FormData();
      formData.append("fullname", data.fullname);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("profilePicture", data.profilePicture[0]); // Append file

      try {
        const response = await axios.post(
          "http://localhost:7985/user/signup",
          formData,
          {
            withCredentials: true,
          }
        );

        // Dispatch success if registration is successful
        dispatch(registrationSuccess({ user: response.data.data }));
        toast.success(response.data.message);
        navigate("/auth/verifyotp");
      } catch (error) {
        // Handle error by dispatching failure action
        if (error.response) {
          // Access the error message sent from the backend
          dispatch(registrationFailure(error.response.data.message));
          toast.error(error.response.data.message);
        } else {
          // Handle error if no response (network issues, server issues, etc.)
          dispatch(
            registrationFailure({ error: "An unexpected error occurred." })
          );
        }
      }
    } else {
      console.log("No file selected.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // Create a preview URL for the image
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-700">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Create an Account
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Join us today! It's quick and easy.
        </p>
        <form className="space-y-4" onSubmit={handleSubmit(onsubmit)}>
          <div>
            <label
              htmlFor="profilePicture"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePicture"
              {...register("profilePicture")}
              accept="image/jpeg, image/png, image/jpg"
              className="mt-1 block w-full text-gray-800"
              onChange={handleFileChange}
            />
            {errors.profilePicture && (
              <p className="text-red-500 text-xs mt-1">
                {errors.profilePicture.message}
              </p>
            )}
            {preview && (
              <img
                src={preview}
                alt="Profile picture"
                className="mt-2 w-24 h-24 rounded-full object-cover"
              />
            )}
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              {...register("fullname")}
              placeholder="Enter your name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            {errors.fullname && (
              <p className="text-red-500 text-xs mt-1">
                {errors.fullname.message}
              </p>
            )}
          </div>
          {/* Email  */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          {/* Password */}
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
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* Confirm password*/}
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              {...register("confirm_password")}
              placeholder="Confirm your password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            {errors.confirm_password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirm_password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-purple-200 text-white font-medium py-2 px-4 rounded-md hover:bg-purple-500 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{" "}
          <NavLink
            to="/auth/login"
            className="text-purple-600 font-medium hover:underline"
          >
            Log In
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
