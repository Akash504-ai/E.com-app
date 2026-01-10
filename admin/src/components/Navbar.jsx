import React from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import logo from "../assets/logo.png";

const Navbar = ({ setToken, setSidebarOpen }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/", { replace: true });
  };

  return (
    <nav className="w-full h-16 flex items-center justify-between px-4 md:px-6 bg-white border-b border-gray-200">
      
      {/* Left section */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <FiMenu size={22} />
        </button>

        {/* Logo */}
        <img src={logo} alt="Logo" className="h-15.5 w-auto" />
      </div>

      {/* Right section */}
      <button
        onClick={logoutHandler}
        className="text-sm font-medium text-gray-600 hover:text-black transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
