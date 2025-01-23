// import axios from "axios";
// import React, { useRef } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import {
//   otpStart,
//   otpVerifyFailure,
//   otpVerifySuccess,
// } from "../features/user/userSlice";
// import { useNavigate } from "react-router-dom";

// const VerifyOtp = () => {
//   const {
//     handleSubmit,
//     control,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       otp: Array(6).fill(""), // Initialize OTP as an array of 6 empty strings
//     },
//   });
//   const inputrefs = useRef([]);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Function to handle the form submission
//   const onSubmit = async (data) => {
//     dispatch(otpStart());
//     try {
//       const otpString = data.otp.join(""); // Join all OTP digits into a single string
//       const payload = { OTPemail: otpString };

//       const response = await axios.post(
//         "http://localhost:7985/user/verifyotp",
//         payload
//       );
//       dispatch(otpVerifySuccess());
//       toast.success(response.data.message);
//       navigate("/auth/login");
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message || "An error occurred.";
//       dispatch(otpVerifyFailure(errorMessage));
//     }
//   };

//   const handleInput = (e, index) => {
//     // If value length is more than 1 character, it should focus on the next input.
//     if (e.target.value.length > 0 && index < inputrefs.current.length - 1) {
//       inputrefs.current[index + 1].focus();
//     }
//   };

//   const handleBackspace = (e, index) => {
//     if (e.key === "Backspace" && index > 0 && !inputrefs.current[index].value) {
//       inputrefs.current[index - 1].focus(); // Focus on the previous input if the current input is empty
//     }
//   };

//   const handlePaste = (e) => {
//     const pastedValue = e.clipboardData.getData("Text"); // Get pasted text
//     const digits = pastedValue.split(""); // Split into individual digits

//     // Populate the inputs with the pasted digits
//     digits.forEach((digit, index) => {
//       if (inputrefs.current[index]) {
//         inputrefs.current[index].value = digit; // Assign each digit to the respective input
//         setValue(`otp[${index}]`, digit); // Set the value in react-hook-form
//       }
//     });

//     // Ensure the last input gets focus after pasting
//     if (digits.length > 0) {
//       inputrefs.current[digits.length - 1].focus();
//     }

//     e.preventDefault(); // Prevent default paste behavior to control it manually
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-slate-700">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Verify OTP
//         </h2>
//         <p className="text-center text-gray-500 mb-4">
//           Enter the 6-digit code sent to your email
//         </p>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="flex justify-between space-x-4">
//             {Array(6)
//               .fill(0)
//               .map((_, idx) => (
//                 <Controller
//                   key={idx}
//                   name={`otp[${idx}]`}
//                   control={control}
//                   rules={{ required: "This field is required" }}
//                   render={({ field }) => (
//                     <input
//                       type="text"
//                       maxLength="1"
//                       {...field}
//                       required
//                       className="w-12 h-12 text-2xl text-center rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       ref={(el) => (inputrefs.current[idx] = el)}
//                       onInput={(e) => handleInput(e, idx)}
//                       onPaste={handlePaste} // Listen to paste event
//                       onKeyDown={(e) => handleBackspace(e, idx)} // Handle backspace key
//                     />
//                   )}
//                 />
//               ))}
//           </div>

//           {/* Display error message if OTP is not filled */}
//           {errors.otp && (
//             <div className="text-red-500 text-sm mt-4">
//               {errors.otp && "Please enter the complete OTP."}
//             </div>
//           )}

//           <button
//             type="submit"
//             className="w-full mt-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
//           >
//             Verify OTP
//           </button>
//         </form>

//         <p className="mt-4 text-center text-sm text-gray-500">
//           Didn't receive the code?{" "}
//           <span className="text-blue-600 cursor-pointer hover:underline">
//             Resend OTP
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default VerifyOtp;
import axios from "axios";
import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  otpStart,
  otpVerifyFailure,
  otpVerifySuccess,
} from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: Array(6).fill(""), // Initialize OTP as an array of 6 empty strings
    },
  });
  const inputrefs = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle the form submission
  const onSubmit = async (data) => {
    dispatch(otpStart());
    try {
      const otpString = data.otp.join(""); // Join all OTP digits into a single string
      const payload = { OTPemail: otpString };

      const response = await axios.post(
        "http://localhost:7985/user/verifyotp",
        payload
      );
      dispatch(otpVerifySuccess());
      toast.success(response.data.message);
      navigate("/auth/login");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      dispatch(otpVerifyFailure(errorMessage));
      toast.error(errorMessage);
    }
  };

  // Handle input navigation
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputrefs.current.length - 1) {
      inputrefs.current[index + 1].focus(); // Focus on the next input
    }
    setValue(`otp[${index}]`, e.target.value); // Update react-hook-form state
  };

  // Handle backspace navigation
  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !e.target.value) {
      inputrefs.current[index - 1].focus(); // Focus on the previous input
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    const pastedValue = e.clipboardData.getData("Text");
    const digits = pastedValue.slice(0, 6).split(""); // Limit to 6 digits

    digits.forEach((digit, index) => {
      if (inputrefs.current[index]) {
        inputrefs.current[index].value = digit; // Update input field
        setValue(`otp[${index}]`, digit); // Update react-hook-form state
      }
    });

    // Focus the last filled input, if available
    const lastFilledIndex = Math.min(
      digits.length - 1,
      inputrefs.current.length - 1
    );
    if (inputrefs.current[lastFilledIndex]) {
      inputrefs.current[lastFilledIndex].focus();
    }

    e.preventDefault(); // Prevent default paste behavior
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-700">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Verify OTP
        </h2>
        <p className="text-center text-gray-500 mb-4">
          Enter the 6-digit code sent to your email
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between space-x-4">
            {Array(6)
              .fill(0)
              .map((_, idx) => (
                <Controller
                  key={idx}
                  name={`otp[${idx}]`}
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      maxLength="1"
                      value={field.value || ""} // Ensure controlled input
                      onChange={(e) => {
                        field.onChange(e.target.value); // Update react-hook-form state
                        handleInput(e, idx);
                      }}
                      className="w-12 h-12 text-2xl text-center rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      ref={(el) => (inputrefs.current[idx] = el)}
                      onPaste={handlePaste}
                      onKeyDown={(e) => handleBackspace(e, idx)}
                    />
                  )}
                />
              ))}
          </div>

          {/* Display error message if OTP is not filled */}
          {errors.otp && (
            <div className="text-red-500 text-sm mt-4">
              {errors.otp && "Please enter the complete OTP."}
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Verify OTP
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Didn't receive the code?{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            Resend OTP
          </span>
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;
