import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";

const VerifyOtp = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const inputrefs = useRef([]);

  // Function to handle the form submission
  const onSubmit = (data) => {
    console.log("OTP Submitted:", data);
    // Proceed with your OTP verification logic here
  };

  const handleInput = (e, index) => {
    // If value length is more than 1 character, it should focus on the next input.
    if (e.target.value.length > 0 && index < inputrefs.current.length - 1) {
      inputrefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !inputrefs.current[index].value) {
      inputrefs.current[index - 1].focus(); // Focus on the previous input if the current input is empty
    }
  };

  const handlePaste = (e) => {
    const pastedValue = e.clipboardData.getData("Text"); // Get pasted text
    const digits = pastedValue.split(""); // Split into individual digits

    // Populate the inputs with the pasted digits
    digits.forEach((digit, index) => {
      if (inputrefs.current[index]) {
        inputrefs.current[index].value = digit; // Assign each digit to the respective input
        setValue(`otp[${index}]`, digit); // Set the value in react-hook-form
      }
    });

    // Ensure the last input gets focus after pasting
    if (digits.length > 0) {
      inputrefs.current[digits.length - 1].focus();
    }

    e.preventDefault(); // Prevent default paste behavior to control it manually
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
                      type="text"
                      maxLength="1"
                      {...field}
                      required
                      className="w-12 h-12 text-2xl text-center rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      ref={(el) => (inputrefs.current[idx] = el)}
                      onInput={(e) => handleInput(e, idx)}
                      onPaste={handlePaste} // Listen to paste event
                      onKeyDown={(e) => handleBackspace(e, idx)} // Handle backspace key
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
