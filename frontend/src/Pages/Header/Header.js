import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const Header = () => {
  return (
    <header className="header bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <a href="#" className="mr-4">
          <img src="logo.png" alt="Nehru Cinemas Logo" className="h-10 w-10" />
        </a>
        <h1 className="text-xl font-bold">Nehru Cinemas - Movie Management</h1>
      </div>
      <nav className="hidden md:flex space-x-4">
        {" "}
        {/* Hidden on mobile */}
        <Link
          to="/login"
          className="px-3 py-2 rounded-md text-white hover:bg-gray-700"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-3 py-2 rounded-md text-white hover:bg-gray-700"
        >
          Register
        </Link>
      </nav>
      <button className="md:hidden focus:outline-none text-white hover:bg-gray-700 px-3 py-2 rounded-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6zM12 8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"
          />
        </svg>
      </button>
    </header>
  );
};

export default Header;
