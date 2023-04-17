import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";

const Navbar = ({ userId }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClear = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_URI}/chat/${userId}`);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link className="text-white text-2xl font-bold">Chatbot</Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button
                onClick={() => {
                  handleClear();
                  // window.location.reload();
                }}
                className="bg-gray-700 text-white rounded-lg py-2 px-4 mr-4"
              >
                Clear{" "}
                <span>
                  <DeleteOutlineIcon />
                </span>
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-700 text-white rounded-lg py-2 px-4"
              >
                Logout{" "}
                <span>
                  <LogoutIcon />
                </span>
              </button>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={handleMenuToggle}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
            >
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div
          className={`${
            isMenuOpen ? "visible translate-x-0" : "invisible translate-x-full"
          } md:hidden  bg-gray-700 transform right-0 xs:w-[80%] xs:mr-[10%] w-full h-full fixed top-16 opacity-75 z-50 transition-all duration-500 ease-in-out`}
        >
          <div className="flex flex-col gap-5 items-end px-2 py-2">
            <button
              onClick={handleClear}
              className="text-gray-300 hover:text-white font-bold"
            >
              Clear{" "}
              <span>
                <DeleteOutlineIcon />
              </span>
            </button>
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-white font-bold"
            >
              Logout{" "}
              <span>
                <LogoutIcon />
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
