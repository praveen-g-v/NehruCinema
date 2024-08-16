import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import logo from "../../assets/NCLogoWhite.png";
import axios from "../../api/axios";
import profile from "../../assets/profile-default.png";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();
  const signOut = () => {
    axios
      .get("/logout")
      .then((data) => {
        console.log(data);
        navigate("/shows");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    try {
      axios
        .get("/hasLogged")
        .then((data) => {
          console.log(data);
          setIsLoggedIn(data.data.user.isLogged);
          setUserDetails({
            name: data.data.user.name,
            role: data.data.user.role,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className="header   bg-slate-700 text-white p-1 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      {" "}
      {/* Fixed positioning */}
      <button
        className="flex items-center"
        onClick={() => {
          navigate("/shows");
        }}
      >
        <a href="#" className="mr-4">
          <img src={logo} alt="Nehru Cinemas Logo" className="h-10 w-10" />
        </a>
        <h1 className="text-xl font-bold">Nehru Cinemas</h1>
      </button>
      {isLoggedIn ? (
        <>
          <button
            className="focus:outline-none text-white hover:bg-gray-700 rounded-md absolute right-2 top-2"
            onClick={toggleMenu}
          >
            <div className="flex">
              <img
                src={profile}
                alt="mdo"
                width="32"
                height="32"
                className="rounded-circle sm:block hidden pr-1"
                style={{ marginLeft: 4 + "em" }}
              />
              Welcome {userDetails.name ? userDetails.name : "User"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
              >
                <rect x="0" fill="none" width="24" height="24" />

                <g>
                  <path d="M7 10l5 5 5-5" />
                </g>
              </svg>
            </div>
          </button>
          <nav
            className={`absolute w-full flex flex-col sm:justify-center top-full right-0 sm:w-48  py-4 bg-gray-800 text-white transition duration-300 ease-in-out transform ${
              isOpen ? "translate-y-0" : "hidden"
            }`} // Control menu visibility
          >
            {userDetails.role === "admin" ? (
              <>
                <Link
                  to="/addmovie"
                  onClick={toggleMenu}
                  className="px-3 py-2 rounded-md text-white hover:bg-gray-700"
                >
                  Add Movie
                </Link>
                <Link
                  to="/createshowtime"
                  onClick={toggleMenu}
                  className="px-3 py-2 rounded-md text-white hover:bg-gray-700"
                >
                  Create Showtime
                </Link>
                <Link
                  to="/theatrehall"
                  onClick={toggleMenu}
                  className="px-3 py-2 rounded-md text-white hover:bg-gray-700"
                >
                  Add Theatre Hall
                </Link>
              </>
            ) : (
              <></>
            )}
            <Link
              to="/bookedTicket"
              onClick={toggleMenu}
              className="px-3 py-2 rounded-md text-white hover:bg-gray-700"
            >
              View Bookings
            </Link>
            <a
              className="dropdown-item px-3 py-2  hover:bg-gray-700"
              onClick={() => {
                toggleMenu();
                signOut();
              }}
              href="#"
            >
              Sign out
            </a>
          </nav>
        </>
      ) : (
        <>
          <nav className="md:block hidden  space-x-4">
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
        </>
      )}
    </header>
  );
};

export default Header;
