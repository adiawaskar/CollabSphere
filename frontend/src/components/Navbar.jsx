import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { email, setEmail, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="w-full bg-purple-900 shadow-md px-6 py-4 flex items-center justify-between fixed top-0 left-0 z-50">
      <div className="text-2xl font-bold text-purple-300">CollabSphere</div>

      <div className="flex space-x-6">
        {email === null ? (
          <Link
            to="/login"
            className="text-purple-200 hover:text-purple-100 font-semibold transition"
          >
            Login
          </Link>
        ) : (
          <>
            <Link
              to="/home"
              className="text-purple-200 hover:text-purple-100 font-semibold transition"
            >
              Home
            </Link>
            <button
              onClick={handleLogout}
              className="text-purple-200 hover:text-purple-100 font-semibold transition cursor-pointer"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;