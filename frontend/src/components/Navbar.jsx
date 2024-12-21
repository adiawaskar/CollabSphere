import React from "react";
import { Link } from "react-router-dom"; // Import Link

const Navbar = () => {
  return (
    <nav className="w-full bg-purple-900 shadow-md px-6 py-4 flex items-center justify-between fixed top-0 left-0 z-50">
      <div className="text-2xl font-bold text-purple-300">CollabSphere</div>

      <div className="flex space-x-6">
        <Link // Use Link instead of <a>
          to="/login" // Use 'to' prop instead of 'href'
          className="text-purple-200 hover:text-purple-100 font-semibold transition"
        >
          Login
        </Link>
        <Link // Use Link for Signup as well, if you intend to use it as a route
          to="/login" // Redirecting Signup to login as requested
          className="text-purple-200 hover:text-purple-100 font-semibold transition"
        >
          Signup
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;