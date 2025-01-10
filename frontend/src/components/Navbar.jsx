import React from "react";
import { CiMenuBurger } from "react-icons/ci";

const Navbar = ({ isSidebarVisible }) => {
  return (
    <div className="h-16 flex items-center justify-between mx-5  ">
      <div className="flex gap-4">
        <div className="mt-3" onClick={isSidebarVisible}>
          <CiMenuBurger size={24} />
        </div>
        <div>
          <div>
            Task-Managment <br />
            project
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="mt-3">
          <div>name : prashant</div>
        </div>
        <div>
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJub25lIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHN0cm9rZT0iI0FBRkVGNiIgc3Ryb2tlLXdpZHRoPSIyIj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjUiLz4KICA8cGF0aCBkPSJNNC4xIDIwYzAuOS0zLjkgNC4zLTcgNy45LTdTMjAuOSA2LjEgMjEuOCAyMCIvPgo8L3N2Zz4="
            alt="the image"
            className="w-12 h-12 rounded-full border-2 border-gray-300"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
