import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import logo from "../../assets/NCLogoWhite.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className="header bg-gray-800 text-white p-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      {" "}
      {/* Fixed positioning */}
      <div className="flex items-center">
        <a href="#" className="mr-4">
          <img src={logo} alt="Nehru Cinemas Logo" className="h-10 w-10" />
        </a>
        <h1 className="text-xl font-bold">Nehru Cinemas</h1>
      </div>
      <nav className="md:block hidden flex space-x-4">
        {" "}
        {/* Visible on medium and larger screens */}
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
      <button
        className="md:hidden focus:outline-none text-white hover:bg-gray-700 px-3 py-2 rounded-md absolute right-2 top-2"
        onClick={toggleMenu}
      >
        {isOpen ? (
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          // <svg
          //   xmlns="http://www.w3.org/2000/svg"
          //   className="h-6 w-6"
          //   fill="none"
          //   viewBox="0 0 24 24"
          //   stroke="currentColor"
          // >
          //   <path
          //     strokeLinecap="round"
          //     strokeLinejoin="round"
          //     strokeWidth="2"
          //     d="M4 6h16v2H4zm0 7h16v2H4z"
          //   />
          // </svg>

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
              d="M4 6h16v2H4zM4 11h16v2H4zM4 16h16v2H4z"
            />
          </svg>
        )}
      </button>
      <nav
        className={`md:hidden absolute top-full left-0 w-full py-4 bg-gray-800 text-white transition duration-300 ease-in-out transform ${
          isOpen ? "translate-y-0" : "hidden"
        }`} // Control menu visibility
      >
        <Link
          to="/login"
          className="block px-3 py-2 rounded-md hover:bg-gray-700"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="block px-3 py-2 rounded-md hover:bg-gray-700"
        >
          Register
        </Link>
      </nav>
    </header>
  );
};

export default Header;
