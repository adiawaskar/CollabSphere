import React from 'react';

const Navbar = () => {
  return (
    <nav className="w-full bg-purple-900 shadow-md px-6 py-4 flex items-center justify-between fixed top-0 left-0 z-50">
      {/* Left - Project Name */}
      <div className="text-2xl font-bold text-purple-300">
        CollabSphere
      </div>

      {/* Right - Navigation Links */}
      <div className="flex space-x-6">
        <a
          href="/login"
          className="text-purple-200 hover:text-purple-100 font-semibold transition"
        >
          Login
        </a>
        <a
          href="/signup"
          className="text-purple-200 hover:text-purple-100 font-semibold transition"
        >
          Signup
        </a>
      </div>
    </nav>
  );
};

export default Navbar;