// import React from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

// // Define validation schema using Yup
// const schema = yup.object().shape({
//   currentPassword: yup.string().required("Current password is required"),
//   newPassword: yup
//     .string()
//     .min(6, "Password must be at least 6 characters long")
//     .required("New password is required"),
//   confirmPassword: yup
//     .string()
//     .oneOf([yup.ref("newPassword"), null], "Passwords must match")
//     .required("Confirm password is required"),
// });

// const ResetPassword = () => {
//   // Initialize react-hook-form
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = (data) => {
//     // Mock submission - replace with actual API call
//     console.log("Form submitted:", data);
//     setSuccess(true);
//     setError("");
//   };

//   const [success, setSuccess] = React.useState(false);

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-slate-700">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Reset Your Password
//         </h2>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="mb-4">
//             <label htmlFor="newPassword" className="block text-gray-700">
//               New Password
//             </label>
//             <input
//               type="password"
//               id="newPassword"
//               {...register("newPassword")}
//               className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.newPassword && (
//               <div className="text-red-500 text-sm mt-2">
//                 {errors.newPassword.message}
//               </div>
//             )}
//           </div>

//           <div className="mb-4">
//             <label htmlFor="confirmPassword" className="block text-gray-700">
//               Confirm New Password
//             </label>
//             <input
//               type="password"
//               id="confirmPassword"
//               {...register("confirmPassword")}
//               className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.confirmPassword && (
//               <div className="text-red-500 text-sm mt-2">
//                 {errors.confirmPassword.message}
//               </div>
//             )}
//           </div>

//           {success && (
//             <div className="text-green-500 text-sm mb-4">
//               Password reset successfully!
//             </div>
//           )}

//           <button
//             type="submit"
//             className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
//           >
//             Reset Password
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;
import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      otp: Array(6).fill(""), // Initialize OTP as an array of 6 empty strings
      newPassword: "",
      confirmPassword: "",
    },
  });

  const inputRefs = useRef([]);
  const navigate = useNavigate();

  // Function to handle form submission
  const onSubmit = async (data) => {
    // Extract the values from data
    const { otp, newPassword, confirmPassword } = data;

    console.log("Form Data:", data); // Debugging

    // Construct the payload with the OTP as a joined string
    const payload = {
      OTPforpassword: otp.join(""), // Join the OTP array into a string
      newPassword: newPassword, // Directly use the new password
      confirmPassword: confirmPassword, // Directly use the confirm password
    };

    const response = await axios.post(
      "http://localhost:7985/user/resetpassword",
      payload
    );
    try {
      toast.success(response.data.message);
      navigate("/auth/login");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    }
  };

  // Function to handle input changes
  const handleInput = (e, index) => {
    const value = e.target.value;

    if (/\d/.test(value)) {
      setValue(`otp[${index}]`, value); // Set the value in react-hook-form

      // Focus on the next input box if value is valid and it's not the last input
      if (value.length > 0 && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Function to handle backspace key for focusing on the previous input
  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !e.target.value) {
      setValue(`otp[${index}]`, ""); // Clear the value in react-hook-form
      inputRefs.current[index - 1].focus(); // Focus on the previous input
    }
  };

  // Function to handle paste events for OTP
  const handlePaste = (e) => {
    const pastedValue = e.clipboardData.getData("Text").slice(0, 6); // Get up to 6 digits
    const digits = pastedValue.split(""); // Split into individual digits

    digits.forEach((digit, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = digit; // Assign each digit to the respective input
        setValue(`otp[${index}]`, digit); // Set the value in react-hook-form
      }
    });

    // Focus on the last filled input
    if (digits.length > 0) {
      inputRefs.current[digits.length - 1].focus();
    }

    e.preventDefault(); // Prevent default paste behavior
  };

  // Password match validation function
  const validateConfirmPassword = (value) =>
    value === watch("newPassword") || "Passwords do not match";

  return (
    <div className="flex items-center justify-center h-screen bg-slate-700">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Reset Password
        </h2>
        <p className="text-center text-gray-500 mb-4">
          Enter the 6-digit OTP sent to your email
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* OTP Input Fields */}
          <div className="flex justify-between mb-6">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <Controller
                  key={index}
                  name={`otp[${index}]`}
                  control={control}
                  rules={{ required: "All OTP fields are required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      maxLength="1"
                      className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onInput={(e) => handleInput(e, index)}
                      onKeyDown={(e) => handleBackspace(e, index)}
                      onPaste={handlePaste}
                      ref={(el) => (inputRefs.current[index] = el)}
                    />
                  )}
                />
              ))}
          </div>
          {errors.otp && (
            <span className="text-red-500 text-sm mb-4 block">
              {errors.otp.message}
            </span>
          )}

          {/* New Password Field */}
          <div className="mb-4">
            <Controller
              name="newPassword"
              control={control}
              rules={{ required: "New password is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="New Password"
                />
              )}
            />
            {errors.newPassword && (
              <span className="text-red-500 text-sm mt-1">
                {errors.newPassword.message}
              </span>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <Controller
              name="confirmPassword"
              control={control}
              rules={{ validate: validateConfirmPassword }}
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm Password"
                />
              )}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
