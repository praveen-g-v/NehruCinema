// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom"; // Import Link for navigation
// import logo from "../../assets/NCLogoWhite.png";
// import axios from "../../api/axios";
// import profile from "../../assets/profile-default.png";
// import { useNavigate } from "react-router-dom";
// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUserDetails] = useState({});
//   const navigate = useNavigate();
//   const signOut = () => {
//     axios
//       .get("/logout")
//       .then((data) => {
//         console.log(data);
//         navigate("/");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   useEffect(() => {
//     try {
//       axios
//         .get("/hasLogged")
//         .then((data) => {
//           console.log(data);
//           setIsLoggedIn(data.data.user.isLogged);
//           setUserDetails({
//             name: data.data.user.name,
//             role: data.data.user.role,
//           });
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } catch (err) {
//       console.log(err);
//     }
//   }, []);
//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };
//   return (
//     <header className="header   bg-slate-700 text-white p-1 flex justify-between items-center fixed top-0 left-0 w-full z-50">
//       {" "}
//       {/* Fixed positioning */}
//       <button
//         className="flex items-center"
//         onClick={() => {
//           navigate("/");
//         }}
//       >
//         <a href="#" className="mr-4">
//           <img src={logo} alt="Nehru Cinemas Logo" className="h-10 w-10" />
//         </a>
//         <h1 className="text-xl font-bold">Nehru Cinemas</h1>
//       </button>
//       {isLoggedIn ? (
//         <>
//           <button
//             className="focus:outline-none text-white hover:bg-gray-700 rounded-md absolute right-2 top-2"
//             onClick={toggleMenu}
//           >
//             <div className="flex">
//               <img
//                 src={profile}
//                 alt="mdo"
//                 width="32"
//                 height="32"
//                 className="rounded-circle sm:block hidden pr-1"
//                 style={{ marginLeft: 4 + "em" }}
//               />
//               Welcome {user.name ? user.name : "User"}
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="30px"
//                 height="30px"
//                 viewBox="0 0 24 24"
//               >
//                 <rect x="0" fill="none" width="24" height="24" />

//                 <g>
//                   <path d="M7 10l5 5 5-5" />
//                 </g>
//               </svg>
//             </div>
//           </button>
//           <nav
//             className={`absolute w-full flex flex-col sm:justify-center top-full right-0 sm:w-48  py-4 bg-gray-800 text-white transition duration-300 ease-in-out transform ${
//               isOpen ? "translate-y-0" : "hidden"
//             }`} // Control menu visibility
//           >
// {user.role === "admin" ? (
//   <>
//     <Link
//       to="/addmovie"
//       onClick={toggleMenu}
//       className="px-3 py-2 rounded-md text-white hover:bg-gray-700"
//     >
//       Add Movie
//     </Link>
//     <Link
//       to="/createshowtime"
//       onClick={toggleMenu}
//       className="px-3 py-2 rounded-md text-white hover:bg-gray-700"
//     >
//       Create Showtime
//     </Link>
//     <Link
//       to="/theatrehall"
//       onClick={toggleMenu}
//       className="px-3 py-2 rounded-md text-white hover:bg-gray-700"
//     >
//       Add Theatre Hall
//     </Link>
//   </>
// ) : (
//   <></>
// )}
//             <Link
//               to="/bookedTicket"
//               onClick={toggleMenu}
//               className="px-3 py-2 rounded-md text-white hover:bg-gray-700"
//             >
//               View Bookings
//             </Link>
//             <a
//               className="dropdown-item px-3 py-2  hover:bg-gray-700"
//               onClick={() => {
//                 toggleMenu();
//                 signOut();
//               }}
//               href="#"
//             >
//               Sign out
//             </a>
//           </nav>
//         </>
//       ) : (
//         <>
//           <nav className="md:block hidden  space-x-4">
//             {" "}
//             {/* Visible on medium and larger screens */}
//             <Link
//               to="/login"
//               className="px-3 py-2 rounded-md text-white hover:bg-gray-700"
//             >
//               Login
//             </Link>
//             <Link
//               to="/register"
//               className="px-3 py-2 rounded-md text-white hover:bg-gray-700"
//             >
//               Register
//             </Link>
//           </nav>
//           <button
//             className="md:hidden focus:outline-none text-white hover:bg-gray-700 px-3 py-2 rounded-md absolute right-2 top-2"
//             onClick={toggleMenu}
//           >
//             {isOpen ? (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             ) : (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16v2H4zM4 11h16v2H4zM4 16h16v2H4z"
//                 />
//               </svg>
//             )}
//           </button>
//           <nav
//             className={`md:hidden absolute top-full left-0 w-full py-4 bg-gray-800 text-white transition duration-300 ease-in-out transform ${
//               isOpen ? "translate-y-0" : "hidden"
//             }`} // Control menu visibility
//           >
//             <Link
//               to="/login"
//               className="block px-3 py-2 rounded-md hover:bg-gray-700"
//             >
//               Login
//             </Link>
//             <Link
//               to="/register"
//               className="block px-3 py-2 rounded-md hover:bg-gray-700"
//             >
//               Register
//             </Link>
//           </nav>
//         </>
//       )}
//     </header>
//   );
// };

// export default Header;
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "../../api/axios";
// import logo from "../../assets/NCLogoWhite.png";
// import profile from "../../assets/profile-default.png";
// import {
//   FaHome,
//   FaFilm,
//   FaUser,
//   FaSignOutAlt,
//   FaTicketAlt,
//   FaPlus,
// } from "react-icons/fa";
// import { use } from "react";
// import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// import useAuth from "../../hooks/useAuth";

// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();
//   const axiosPrivate = useAxiosPrivate();

//   const { user, setUser } = useAuth();

//   const signOut = () => {
//     axiosPrivate
//       .get("/auth/logout")
//       .then((data) => {
//         console.log(data);
//         setIsLoggedIn(false);
//         checkAdminUser();
//         navigate("/");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const checkAdminUser = () => {
//     if (!user || !user.role) {
//       setIsAdmin(false);
//       return;
//     }
//     if (!user.role || !Array.isArray(user.role)) {
//       setIsAdmin(false);
//       return;
//     }
//     console.log("Checking user role   " + user.role);
//     // Check if the user has the 'admin' role
//     user.role.forEach((role) => {
//       console.log(role);
//       if (role === "admin" || role === "ADMIN") {
//         console.log("User is an admin ");
//         setIsAdmin(true);
//       }
//     });
//   };

//   useEffect(() => {
//     try {
//       axiosPrivate
//         .get("/auth/loggedIn")
//         .then((data) => {
//           console.log(data);
//           setIsLoggedIn(data.data.hasloggedIn);
//           setUser({
//             name: data.data.username,
//             role: data.data.role,
//           });
//           checkAdminUser();
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } catch (err) {
//       console.log(err);
//     }
//   }, []);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//     checkAdminUser();
//   };

//   return (
//     <header className="bg-gray-900 text-white shadow-lg fixed top-0 left-0 w-full z-50">
//       <div className="container mx-auto px-4 py-3">
//         <div className="flex justify-between items-center">
//           {/* Logo and Brand */}
//           <div className="flex items-center space-x-2">
//             <Link to="/" className="flex items-center">
//               <img src={logo} alt="Nehru Cinemas Logo" className="h-10 w-10" />
//               <h1 className="text-xl font-bold ml-2">Nehru Cinemas</h1>
//             </Link>
//           </div>

//           {/* Navigation - Desktop */}
//           <div className="hidden md:flex items-center space-x-6">
//             {isAdmin && (
//               <Link
//                 to="/admin-home"
//                 className="hover:text-red-500 flex items-center"
//               >
//                 <FaHome className="mr-1" /> Admin Home
//               </Link>
//             )}
//             <Link to="/" className="hover:text-red-500 flex items-center">
//               <FaHome className="mr-1" /> Home
//             </Link>
//             <Link to="/movies" className="hover:text-red-500 flex items-center">
//               <FaFilm className="mr-1" /> Movies
//             </Link>
//             <Link
//               to="/my-booking"
//               className="hover:text-red-500 flex items-center"
//             >
//               <FaTicketAlt className="mr-1" /> My Booking
//             </Link>

//             {isLoggedIn ? (
//               <div className="relative group">
//                 <button className="flex items-center space-x-1 hover:text-red-500">
//                   <img
//                     src={profile}
//                     alt="Profile"
//                     className="w-8 h-8 rounded-full mr-1"
//                   />
//                   <span>Hi, {user.name || "User"}</span>
//                 </button>

//                 <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
//                   {user.role === "admin" ? (
//                     <>
//                       <Link
//                         to="/addmovie"
//                         onClick={toggleMenu}
//                         className="px-3 py-2 rounded-md text-white hover:bg-gray-700"
//                       >
//                         Add Movie
//                       </Link>
//                       <Link
//                         to="/createshowtime"
//                         onClick={toggleMenu}
//                         className="px-3 py-2 rounded-md text-white hover:bg-gray-700"
//                       >
//                         Create Showtime
//                       </Link>
//                       <Link
//                         to="/theatrehall"
//                         onClick={toggleMenu}
//                         className="px-3 py-2 rounded-md text-white hover:bg-gray-700"
//                       >
//                         Add Theatre Hall
//                       </Link>
//                     </>
//                   ) : (
//                     <></>
//                   )}

//                   {user.role === "ADMIN" && (
//                     <>
//                       <Link
//                         to="/addmovie"
//                         className="block px-4 py-2 text-sm hover:bg-gray-700 flex items-center"
//                       >
//                         <FaPlus className="mr-2" /> Add Movie
//                       </Link>
//                       <Link
//                         to="/createshowtime"
//                         className="block px-4 py-2 text-sm hover:bg-gray-700 flex items-center"
//                       >
//                         <FaPlus className="mr-2" /> Create Showtime
//                       </Link>
//                       <Link
//                         to="/theatrehall"
//                         className="block px-4 py-2 text-sm hover:bg-gray-700 flex items-center"
//                       >
//                         <FaPlus className="mr-2" /> Add Theatre Hall
//                       </Link>
//                     </>
//                   )}
//                   <button
//                     onClick={signOut}
//                     className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700 flex items-center"
//                   >
//                     <FaSignOutAlt className="mr-2" /> Sign Out
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="hover:text-red-500 flex items-center"
//                 >
//                   <FaUser className="mr-1" /> Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-sm font-medium"
//                 >
//                   Register
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden text-white focus:outline-none"
//             onClick={toggleMenu}
//           >
//             {isOpen ? (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             ) : (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16v2H4zM4 11h16v2H4zM4 16h16v2H4z"
//                 />
//               </svg>
//             )}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isOpen && (
//           <div className="md:hidden bg-gray-800 pb-4 px-4 mt-3 rounded-lg">
//             <nav className="flex flex-col space-y-2">
//               {user.role === "admin" && (
//                 <Link
//                   to="/admin-home"
//                   onClick={toggleMenu}
//                   className="px-3 py-2 rounded-md hover:bg-gray-700 flex items-center"
//                 >
//                   <FaHome className="mr-2" /> Admin Home
//                 </Link>
//               )}
//               <Link
//                 to="/"
//                 onClick={toggleMenu}
//                 className="px-3 py-2 rounded-md hover:bg-gray-700 flex items-center"
//               >
//                 <FaHome className="mr-2" /> Home
//               </Link>
//               <Link
//                 to="/movies"
//                 onClick={toggleMenu}
//                 className="px-3 py-2 rounded-md hover:bg-gray-700 flex items-center"
//               >
//                 <FaFilm className="mr-2" /> Movies
//               </Link>
//               <Link
//                 to="/bookedTicket"
//                 onClick={toggleMenu}
//                 className="px-3 py-2 rounded-md hover:bg-gray-700 flex items-center"
//               >
//                 <FaTicketAlt className="mr-2" /> My Booking
//               </Link>

//               {isLoggedIn ? (
//                 <>
//                   {user.role === "admin" && (
//                     <>
//                       <Link
//                         to="/addmovie"
//                         onClick={toggleMenu}
//                         className="px-3 py-2 rounded-md hover:bg-gray-700 flex items-center"
//                       >
//                         <FaPlus className="mr-2" /> Add Movie
//                       </Link>
//                       <Link
//                         to="/createshowtime"
//                         onClick={toggleMenu}
//                         className="px-3 py-2 rounded-md hover:bg-gray-700 flex items-center"
//                       >
//                         <FaPlus className="mr-2" /> Create Showtime
//                       </Link>
//                       <Link
//                         to="/theatrehall"
//                         onClick={toggleMenu}
//                         className="px-3 py-2 rounded-md hover:bg-gray-700 flex items-center"
//                       >
//                         <FaPlus className="mr-2" /> Add Theatre Hall
//                       </Link>
//                     </>
//                   )}
//                   <button
//                     onClick={() => {
//                       toggleMenu();
//                       signOut();
//                     }}
//                     className="px-3 py-2 rounded-md hover:bg-gray-700 flex items-center text-left w-full"
//                   >
//                     <FaSignOutAlt className="mr-2" /> Sign Out
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <Link
//                     to="/login"
//                     onClick={toggleMenu}
//                     className="px-3 py-2 rounded-md hover:bg-gray-700 flex items-center"
//                   >
//                     <FaUser className="mr-2" /> Login
//                   </Link>
//                   <Link
//                     to="/register"
//                     onClick={toggleMenu}
//                     className="px-3 py-2 rounded-md hover:bg-gray-900 text-center bg-red-600 hover:bg-red-700"
//                   >
//                     Register
//                   </Link>
//                 </>
//               )}
//             </nav>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import logo from "../../assets/NCLogoWhite.png";
import profile from "../../assets/profile-default.png";
import {
  FaHome,
  FaFilm,
  FaUser,
  FaSignOutAlt,
  FaTicketAlt,
  FaPlus,
  FaDropbox,
} from "react-icons/fa";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { FaDroplet } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { user, setUser, setAuth } = useAuth();

  const signOut = async () => {
    try {
      await axiosPrivate.get("/logout");

      setIsLoggedIn(false);
      setIsAdmin(false);
      setUser(null);
      setAuth("");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const checkAdminStatus = (userRoles) => {
    return (
      userRoles == "admin" ||
      userRoles === "ADMIN" ||
      userRoles === "Admin" ||
      userRoles === "Administrator" ||
      userRoles === "administrator"
    );
  };
  //   if (!userRoles || typeof userRoles !== "object") {
  //     return false;
  //   }
  //   if (!userRoles) return false;
  //   return userRoles.some(
  //     (role) =>
  //       role.toLowerCase() === "admin" || role.toLowerCase() === "administrator"
  //   );
  // };

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const response = await axiosPrivate.get("/hasLogged");
        const { isLogged, name, role } = response.data.user;

        setIsLoggedIn(isLogged);
        setUser({
          name: name,
          role: role,
        });
        setIsAdmin(checkAdminStatus(role));
      } catch (err) {
        console.error("Error fetching user status:", err);
      }
    };

    fetchUserStatus();
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-gray-900 text-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Nehru Cinemas Logo" className="h-10 w-10" />
              <h1 className="text-xl font-bold ml-2">Nehru Cinemas</h1>
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {isAdmin && (
              <Link
                to="/admin-home"
                className="hover:text-red-500 flex items-center"
              >
                <FaHome className="mr-1" /> Admin Home
              </Link>
            )}
            <Link to="/" className="hover:text-red-500 flex items-center">
              <FaHome className="mr-1" /> Home
            </Link>
            <Link to="/movies" className="hover:text-red-500 flex items-center">
              <FaFilm className="mr-1" /> Movies
            </Link>
            <Link
              to="/my-booking"
              className="hover:text-red-500 flex items-center"
            >
              <FaTicketAlt className="mr-1" /> My Booking
            </Link>

            {isLoggedIn ? (
              <div
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                }}
                className="relative group"
              >
                <button className="flex items-center space-x-1 hover:text-red-500">
                  <img
                    src={profile}
                    alt="Profile"
                    className="w-8 h-8 rounded-full mr-1"
                  />
                  <span>Hi, {user?.name || "User"}</span>
                  <IoMdArrowDropdown className="ml-1" />
                </button>

                <div
                  className={`absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 ${
                    isMenuOpen ? "block" : "hidden"
                  } transition duration-300 ease-in-out`}
                >
                  {isAdmin && (
                    <>
                      <Link
                        to="/addmovie"
                        className="block px-4 py-2 text-sm hover:bg-gray-700 flex items-center"
                      >
                        <FaPlus className="mr-2" /> Add Movie
                      </Link>
                      <Link
                        to="/createshowtime"
                        className="block px-4 py-2 text-sm hover:bg-gray-700 flex items-center"
                      >
                        <FaPlus className="mr-2" /> Create Showtime
                      </Link>
                      <Link
                        to="/theatrehall"
                        className="block px-4 py-2 text-sm hover:bg-gray-700 flex items-center"
                      >
                        <FaPlus className="mr-2" /> Add Theatre Hall
                      </Link>
                    </>
                  )}
                  <button
                    onClick={signOut}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700 flex items-center"
                  >
                    <FaSignOutAlt className="mr-2" /> Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-red-500 flex items-center"
                >
                  <FaUser className="mr-1" /> Login
                </Link>
                <Link
                  to="/register"
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-sm font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
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
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-gray-800 pb-4 px-4 mt-3 rounded-lg">
            <nav className="flex flex-col space-y-2">
              {isAdmin && (
                <Link
                  to="/admin-home"
                  onClick={toggleMenu}
                  className="px-3 py-2 rounded-md hover:bg-gray-700 flex items-center"
                >
                  <FaHome className="mr-2" /> Admin Home
                </Link>
              )}
              <Link
                to="/"
                onClick={toggleMenu}
                className="px-3 py-2 rounded-md hover:bg-gray-700 flex items-center"
              >
                <FaHome className="mr-2" /> Home
              </Link>
              <Link
                to="/movies"
                onClick={toggleMenu}
                className="px-3 py-2 rounded-md hover:bg-gray-700 flex items-center"
              >
                <FaFilm className="mr-2" /> Movies
              </Link>
              <Link
                to="/my-booking"
                onClick={toggleMenu}
                className="px-3 py-2 rounded-md hover:bg-gray-700 flex items-center"
              >
                <FaTicketAlt className="mr-2" /> My Booking
              </Link>

              {isLoggedIn ? (
                <>
                  {isAdmin && (
                    <>
                      <Link
                        to="/addmovie"
                        onClick={toggleMenu}
                        className="px-3 py-2 rounded-md hover:bg-gray-700 flex items-center"
                      >
                        <FaPlus className="mr-2" /> Add Movie
                      </Link>
                      <Link
                        to="/createshowtime"
                        onClick={toggleMenu}
                        className="px-3 py-2 rounded-md hover:bg-gray-700 flex items-center"
                      >
                        <FaPlus className="mr-2" /> Create Showtime
                      </Link>
                      <Link
                        to="/theatrehall"
                        onClick={toggleMenu}
                        className="px-3 py-2 rounded-md hover:bg-gray-700 flex items-center"
                      >
                        <FaPlus className="mr-2" /> Add Theatre Hall
                      </Link>
                    </>
                  )}
                  <button
                    onClick={() => {
                      signOut();
                      toggleMenu();
                    }}
                    className="px-3 py-2 rounded-md hover:bg-gray-700 flex items-center text-left w-full"
                  >
                    <FaSignOutAlt className="mr-2" /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={toggleMenu}
                    className="px-3 py-2 rounded-md hover:bg-gray-700 flex items-center"
                  >
                    <FaUser className="mr-2" /> Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={toggleMenu}
                    className="px-3 py-2 rounded-md hover:bg-gray-900 text-center bg-red-600 hover:bg-red-700"
                  >
                    Register
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

// import { useState } from "react";
// import {
//   FaSearch,
//   FaUser,
//   FaBars,
//   FaTimes,
//   FaHome,
//   FaFilm,
// } from "react-icons/fa";

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     // Handle search functionality here
//     console.log("Searching for:", searchQuery);
//   };

//   return (
//     <header className="bg-gray-900 text-white shadow-lg">
//       <div className="container mx-auto px-4 py-3">
//         {/* Top Row - Logo and Main Navigation */}
//         <div className="flex items-center justify-between">
//           {/* Logo and Brand */}
//           <div className="flex items-center space-x-2">
//             <FaFilm className="text-red-500 text-3xl" />
//             <span className="text-xl font-bold">CineMax</span>
//           </div>

//           {/* Search Bar - Hidden on mobile */}
//           <form
//             onSubmit={handleSearch}
//             className="hidden md:flex items-center bg-gray-800 rounded-full px-4 py-2 flex-1 max-w-md mx-4"
//           >
//             <input
//               type="text"
//               placeholder="Search movies..."
//               className="bg-transparent border-none outline-none text-white w-full"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button type="submit" className="text-gray-400 hover:text-white">
//               <FaSearch />
//             </button>
//           </form>

//           {/* Desktop Navigation and Auth */}
//           <div className="hidden md:flex items-center space-x-6">
//             <a href="/" className="hover:text-red-400 flex items-center">
//               <FaHome className="mr-1" /> Home
//             </a>
//             <a href="/movies" className="hover:text-red-400">
//               Movies
//             </a>
//             <a href="/cinemas" className="hover:text-red-400">
//               Cinemas
//             </a>
//             <div className="flex items-center space-x-4">
//               <a href="/login" className="hover:text-red-400 flex items-center">
//                 <FaUser className="mr-1" /> Login
//               </a>
//               <a
//                 href="/register"
//                 className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-sm font-medium"
//               >
//                 Register
//               </a>
//             </div>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden text-white focus:outline-none"
//             onClick={toggleMenu}
//           >
//             {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//           </button>
//         </div>

//         {/* Mobile Search - Visible only on mobile */}
//         <form
//           onSubmit={handleSearch}
//           className="md:hidden flex items-center bg-gray-800 rounded-full px-4 py-2 mt-3"
//         >
//           <input
//             type="text"
//             placeholder="Search movies..."
//             className="bg-transparent border-none outline-none text-white w-full"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button type="submit" className="text-gray-400 hover:text-white">
//             <FaSearch />
//           </button>
//         </form>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-gray-800 pb-4 px-4">
//           <nav className="flex flex-col space-y-3">
//             <a
//               href="/"
//               className="hover:text-red-400 py-2 border-b border-gray-700 flex items-center"
//             >
//               <FaHome className="mr-2" /> Home
//             </a>
//             <a
//               href="/movies"
//               className="hover:text-red-400 py-2 border-b border-gray-700"
//             >
//               Movies
//             </a>
//             <a
//               href="/cinemas"
//               className="hover:text-red-400 py-2 border-b border-gray-700"
//             >
//               Cinemas
//             </a>
//             <div className="flex flex-col space-y-3 pt-2">
//               <a
//                 href="/login"
//                 className="hover:text-red-400 py-2 flex items-center"
//               >
//                 <FaUser className="mr-2" /> Login
//               </a>
//               <a
//                 href="/register"
//                 className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-sm font-medium text-center"
//               >
//                 Register
//               </a>
//             </div>
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;
