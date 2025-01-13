import React from "react";
import img from "../../public/contact_img.png";

const Home = () => {
  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 max-w-6xl rounded-lg shadow-lg">
        {/* Welcome Message */}
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Welcome to Our Platform
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            this is the best practice project for the mern stack project practie
            this is my full otp and reset and forget password functionality
            project....
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>

        {/* Image Section */}
        <div className="flex items-center justify-center">
          <img
            src={img}
            alt="Welcome"
            className="w-full h-auto max-w-md rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
