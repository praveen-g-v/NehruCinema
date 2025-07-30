// import React, { useState, useEffect } from "react";
// import axios from "../../api/axios"; // Assuming you use Axios for HTTP requests
// import Loader from "../../hooks/Loader";
// import { useNavigate, useLocation } from "react-router-dom";

// function BookingPage({ isLoading, setIsLoading }) {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const item = location.state;
//   const [ticketAvailable, setTicketAvailable] = useState(false);
//   const [BookingData, setBookingData] = useState(item);
//   /**
//    * create a backend for available tickets and
//    * change or crate new table to maintain record of avialibility seats and booking information
//    */
//   useEffect(() => {
//     console.log(item);
//     if (item === null || item === undefined) {
//       navigate("/shows");
//     }
//     try {
//       axios
//         .get("/movie/getAvailablSeats", {
//           params: {
//             bookingId: item.id,
//           },
//         })
//         .then((data) => {
//           // console.log(data.data.availableSeats);
//           if (data.data.availableSeats > 0) {
//             setTicketAvailable(true);
//             setBookingData({ ...data.data, ...BookingData });
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } catch (err) {}
//   }, []);
//   const navigatetoBookingPortal = () => {
//     axios
//       .get("/hasLogged")
//       .then((res) => {
//         if (ticketAvailable) {
//           if (BookingData) {
//             navigate("/bookshow", { state: BookingData });
//           }
//         }
//       })
//       .catch((err) => {
//         navigate("/login");
//       });
//   };
//   const navigateToShows = () => {
//     console.log(item);
//     navigate("/shows");
//   };
//   useEffect(() => {
//     if (item == null || item == undefined || item == null) {
//       navigateToShows();
//     }
//   }, []);

//   return (
//     <div className="container mx-auto px-4 mt-8 py-8">
//       {item === undefined || item === null ? (
//         <></>
//       ) : (
//         <div className="flex flex-col md:flex-row md:space-x-8">
//           <div className="flex-1  flex items-center justify-center max-h-96  md:min-h-96">
//             <img
//               className="flex rounded w-96  max-h-96  md:min-h-96"
//               src={item.poster}
//               alt={item.title}
//             />
//           </div>
//           <div className="flex-1 justify-between flex-grow flex-col min-h-80 md:justify-start">
//             <div>
//               <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
//               <div>
//                 <p className="text-gray-700 mb-4">{item.genre}</p>
//                 <p className="text-gray-700 mb-4">
//                   Duration: {(Number(item.duration) / 60).toFixed(2)} hrs
//                 </p>
//               </div>

//               <p className="text-base leading-loose mb-4">{item.synopsis}</p>
//             </div>
//             {ticketAvailable ? (
//               <button
//                 onClick={() => {
//                   navigatetoBookingPortal();
//                 }}
//                 className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded shadow-md"
//               >
//                 Book Tickets
//               </button>
//             ) : (
//               <button
//                 disabled
//                 className="bg-red-300  text-white font-bold py-2 px-4 rounded shadow-md"
//               >
//                 Not Available
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default BookingPage;

import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import Loader from "../../hooks/Loader";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaClock,
  FaTicketAlt,
  FaArrowLeft,
  FaFilm,
  FaCalendarAlt,
  FaTimesCircle,
} from "react-icons/fa";

function BookingPage({ isLoading, setIsLoading }) {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state;
  const [ticketAvailable, setTicketAvailable] = useState(false);
  const [bookingData, setBookingData] = useState(item);

  useEffect(() => {
    if (item === null || item === undefined) {
      navigate("/shows");
    }
    try {
      axios
        .get("/movie/getAvailablSeats", {
          params: {
            bookingId: item.id,
          },
        })
        .then((data) => {
          if (data.data.availableSeats > 0) {
            setTicketAvailable(true);
            setBookingData({ ...data.data, ...bookingData });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const navigatetoBookingPortal = () => {
    axios
      .get("/hasLogged")
      .then((res) => {
        if (ticketAvailable) {
          if (bookingData) {
            navigate("/bookshow", { state: bookingData });
          }
        }
      })
      .catch((err) => {
        navigate("/login");
      });
  };

  const navigateToShows = () => {
    navigate("/");
  };

  useEffect(() => {
    if (item == null || item == undefined) {
      navigateToShows();
    }
  }, []);

  if (item === undefined || item === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader isLoading={true} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <button
        onClick={navigateToShows}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
      >
        <FaArrowLeft className="mr-2" />
        Back to Shows
      </button>

      <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Movie Poster */}
        <div className="lg:w-1/3">
          <img
            className="w-full h-full object-cover max-h-96 lg:max-h-full"
            src={item.poster}
            alt={item.title}
          />
        </div>

        {/* Movie Details */}
        <div className="lg:w-2/3 p-6 md:p-8 flex flex-col">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {item.title}
            </h1>

            <div className="flex items-center mb-4">
              <span className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full mr-3">
                {item.genre}
              </span>
              <div className="flex items-center text-gray-600">
                <FaClock className="mr-2" />
                <span>{(Number(item.duration) / 60).toFixed(2)} hours</span>
              </div>
            </div>

            {item.time && (
              <div className="flex items-center mb-6 text-gray-600">
                <FaCalendarAlt className="mr-2" />
                <span>Showtime: {item.time}</span>
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Synopsis
              </h3>
              <p className="text-gray-600 leading-relaxed">{item.synopsis}</p>
            </div>
          </div>

          <div className="mt-auto">
            {ticketAvailable ? (
              <button
                onClick={navigatetoBookingPortal}
                className="w-full md:w-auto flex items-center justify-center px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition-all duration-300"
              >
                <FaTicketAlt className="mr-2" />
                Book Tickets Now
              </button>
            ) : (
              <div className="flex items-center justify-center p-4 bg-red-50 rounded-lg">
                <FaTimesCircle className="text-red-500 mr-2 text-xl" />
                <span className="text-red-600 font-medium">
                  Tickets Not Available
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
