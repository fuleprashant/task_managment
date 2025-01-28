import React from "react";
import { CiMenuBurger } from "react-icons/ci";

const Navbar = ({ isSidebarVisible }) => {
  const user = localStorage.getItem("user");
  const userInfo = user ? JSON.parse(user) : { fullname: "Guest" }; // Fallback to "Guest" if no user info

  const profile = localStorage.getItem("profile");
  const profileUrl = profile
    ? `http://localhost:7985/${profile}` // Construct full profile URL
    : "https://via.placeholder.com/150"; // Fallback placeholder image

  return (
    <div className="h-16 flex items-center justify-between mx-5">
      <div className="flex gap-4">
        <div className="mt-3 cursor-pointer" onClick={isSidebarVisible}>
          <CiMenuBurger size={24} />
        </div>
        <div>
          <div>
            Task-Management <br />
            Project
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <div>
          <div>Name: {userInfo.fullname || "Username"}</div>
        </div>
        <div>
          <img
            src={profileUrl}
            alt="User profile"
            className="w-12 h-12 rounded-full border-2 border-gray-300"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
