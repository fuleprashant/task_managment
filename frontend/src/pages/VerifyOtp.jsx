import React from "react";
import { useRef } from "react";

const VerifyOtp = () => {
  const inputrefs = useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputrefs.current.length - 1) {
      inputrefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pastedValue = e.clipboardData.getData("Text"); // Get pasted text
    const digits = pastedValue.split(""); // Split into individual digits

    // Populate the inputs with the pasted digits
    digits.forEach((digit, index) => {
      if (inputrefs.current[index]) {
        inputrefs.current[index].value = digit; // Assign each digit to the respective input
      }
    });

    // Ensure the last input gets focus after pasting
    if (digits.length > 0) {
      inputrefs.current[digits.length - 1].focus();
    }

    e.preventDefault(); // Prevent default paste behavior to control it manually
  };
  return (
    <div className="flex items-center justify-center h-screen  bg-slate-700">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Verify OTP
        </h2>
        <p className="text-center text-gray-500 mb-4">
          Enter the 6-digit code sent to your email
        </p>
        <div className="flex justify-between space-x-4">
          {Array(6)
            .fill(0)
            .map((_, idx) => (
              <input
                type="text"
                maxLength="1"
                key={idx}
                required
                className="w-12 h-12 text-2xl text-center rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                // ref={(e) => (inputrefs.current[index] = e)}
                // onInput={(e) => handleInput(e, index)}
                ref={(el) => (inputrefs.current[idx] = el)}
                onInput={(e) => handleInput(e, idx)}
                onPaste={handlePaste} // Listen to paste event
              />
            ))}
        </div>
        <button className="w-full mt-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
          Verify OTP
        </button>
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
