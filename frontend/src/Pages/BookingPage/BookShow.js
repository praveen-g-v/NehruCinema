// import React, { useState, useEffect } from "react";
// import axios from "../../api/axios"; // Assuming you use Axios for HTTP requests
// import Loader from "../../hooks/Loader";
// import { useNavigate, useLocation } from "react-router-dom";

// function BookShow({ isLoading, setIsLoading }) {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [bookingDetails, setBookingDetails] = useState({});

//   const item = location.state;
//   console.log(item);
//   const [seatLayout, setSeatLayout] = useState([]);
//   /**
//    * create a backend for available tickets and
//    * change or crate new table to maintain record of avialibility seats and booking information
//    */
//   useEffect(() => {
//     //console.log(item);
//     if (item === null || item === undefined) {
//       navigate("/shows");
//     }
//     try {
//       axios
//         .get("/movie/getBookingInfo", {
//           params: {
//             bookingInfoId: item.BookingInfoId,
//             showTimeId: item.showTimeId,
//           },
//         })
//         .then((res) => {
//           //console.log(res);
//           // //console.log(data.data.availableSeats);
//           if (res.data.bookedSeats.length > 0) {
//             //console.log(res.data.bookedSeats);
//             setBookingDetails(res.data);
//             setSeatLayout(res.data.bookedSeats);
//           }
//         })
//         .catch((err) => {
//           //console.log(err);
//         });
//     } catch (err) {}
//   }, []);
//   const BookTicket = () => {
//     axios
//       .post("/movie/bookTicket", {
//         bookingInfoId: item.BookingInfoId,
//         showTimeId: item.showTimeId,
//         selectedSeats: selectedSeats,
//       })
//       .then((resp) => {
//         console.log(resp);
//         if (resp.status === 200) {
//           alert("Ticket Booked Success Fully");
//           navigate("/shows");
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const removeSelectedSeats = (value) => {
//     setSelectedSeats(
//       selectedSeats.filter((val) => {
//         if (val.id == value.id) {
//           return false;
//         }
//         return true;
//       })
//     );
//   };
//   function checkSelected(value) {
//     for (let i = 0; i < selectedSeats.length; i++) {
//       if (selectedSeats[i].id == value.id) {
//         return true;
//       }
//     }
//     return false;
//   }
//   const addSelectedSeats = (value) => {
//     //console.log(value);
//     setSelectedSeats([...selectedSeats, value]);
//     console.log(selectedSeats);
//   };
//   const navigateToShows = () => {
//     //console.log(item);
//     navigate("/shows");
//   };
//   useEffect(() => {
//     if (item == null || item == undefined || item == null) {
//       navigateToShows();
//     }
//   }, []);

//   return (
//     <div className="container mx-auto px-4 mt-8 py-8">
//       <div className="flex justify-evenly  md:flex-row flex-col">
//         <div className="flex-1 ">
//           <div
//             className={`flex flex-1 bg-slate-700 flex-row text-slate-200 item-centre justify-center mb-10`}
//           >
//             Screen
//           </div>
//           {seatLayout.length > 0 ? (
//             <>
//               {seatLayout.map((val) => {
//                 return (
//                   <>
//                     <div className={`flex flex-1 md:justify-center  p-2`}>
//                       {val.map((value) => {
//                         return (
//                           <>
//                             {value.attribute === "seats" ? (
//                               <>
//                                 {value.seatBooked ? (
//                                   <>
//                                     <div className="w-16 h-8 bg-red-300 border m-1 border-red-500 rounded-lg flex items-center justify-center">
//                                       <span className="text-red-600 font-semibold">
//                                         {value.id}
//                                       </span>
//                                     </div>
//                                   </>
//                                 ) : (
//                                   <>
//                                     {checkSelected(value) ? (
//                                       <>
//                                         <button
//                                           onClick={() => {
//                                             removeSelectedSeats(value);
//                                           }}
//                                           className="w-16 h-8 m-1 bg-blue-300 border border-blue-500 rounded-lg flex items-center justify-center"
//                                         >
//                                           <span className="text-blue-600 font-semibold">
//                                             {value.id}
//                                           </span>
//                                         </button>
//                                       </>
//                                     ) : (
//                                       <>
//                                         <button
//                                           onClick={() => {
//                                             addSelectedSeats(value);
//                                           }}
//                                           className="w-16 h-8 m-1 bg-green-200 border border-green-500 rounded-lg flex items-center justify-center"
//                                         >
//                                           <span className="text-green-600 font-semibold">
//                                             {value.id}
//                                           </span>
//                                         </button>
//                                       </>
//                                     )}
//                                   </>
//                                 )}
//                               </>
//                             ) : (
//                               <div className="w-16 text-white   h-8 rounded-lg flex items-center justify-center">
//                                 <span className="text-white font-semibold">
//                                   ____
//                                 </span>
//                               </div>
//                             )}
//                             {/* <div
//                               onClick={() => {
//                                 changeAttribute(value.i, value.j);
//                               }}
//                               className={`flex-1 m-0 p-1 w-8 h-8 text-center border-2 border-gray-600`}
//                             >
//                               {value.attribute === "seats" ? "seat" : "      "}
//                             </div> */}
//                           </>
//                         );
//                       })}
//                     </div>
//                   </>
//                 );
//               })}
//             </>
//           ) : (
//             <></>
//           )}
//         </div>
//         <div className="flex-1 md:ml-4 min-h-72 flex flex-col">
//           <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
//           <div>
//             <p className="text-lg text-gray-700 mb-4">
//               Duration: {(Number(item.duration) / 60).toFixed(2)} hrs
//             </p>
//           </div>
//           <div className="flex flex-row">
//             <div className="flex-1 mr-4 text-lg text-gray-700 font-bold mb-4">
//               Selected Seats:
//             </div>
//             <div className=" flex-1 text-lg text-gray-700 font-bold mb-4">
//               {selectedSeats.length}
//             </div>
//           </div>

//           <div className="flex flex-row">
//             <div className="flex-1 mr-4 text-lg text-gray-700 font-bold mb-4">
//               Price:
//             </div>
//             <div className=" flex-1 text-lg text-gray-700 font-bold mb-4">
//               {selectedSeats.length * 120}
//             </div>
//           </div>
//           <button
//             onClick={() => {
//               BookTicket();
//             }}
//             className="bg-green-500 mt-8 hover:bg-green-700  text-white font-bold py-2 px-4 rounded shadow-md"
//           >
//             Book Tickets
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BookShow;

import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import Loader from "../../hooks/Loader";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaChair,
  FaMoneyBillWave,
  FaTicketAlt,
  FaArrowLeft,
  FaFilm,
  FaClock,
} from "react-icons/fa";

function BookShow({ isLoading, setIsLoading }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({});
  const item = location.state;
  const [seatLayout, setSeatLayout] = useState([]);

  useEffect(() => {
    if (item === null || item === undefined) {
      navigate("/shows");
    }
    try {
      axios
        .get("/movie/getBookingInfo", {
          params: {
            bookingInfoId: item.BookingInfoId,
            showTimeId: item.showTimeId,
          },
        })
        .then((res) => {
          if (res.data.bookedSeats.length > 0) {
            setBookingDetails(res.data);
            setSeatLayout(res.data.bookedSeats);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const BookTicket = () => {
    axios
      .post("/movie/bookTicket", {
        bookingInfoId: item.BookingInfoId,
        showTimeId: item.showTimeId,
        selectedSeats: selectedSeats,
      })
      .then((resp) => {
        if (resp.status === 200) {
          alert("Ticket Booked Successfully");
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeSelectedSeats = (value) => {
    setSelectedSeats(selectedSeats.filter((val) => val.id !== value.id));
  };

  const checkSelected = (value) => {
    return selectedSeats.some((val) => val.id === value.id);
  };

  const addSelectedSeats = (value) => {
    setSelectedSeats([...selectedSeats, value]);
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

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Seat Selection Section */}
        <div className="lg:w-2/3">
          <div className="bg-gray-800 text-white py-4 text-center text-xl font-bold rounded-t-lg shadow-md">
            Screen
          </div>

          <div className="border border-gray-200 rounded-b-lg p-4 shadow-md">
            {seatLayout.length > 0 ? (
              seatLayout.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center mb-2">
                  {row.map((seat, seatIndex) => (
                    <div key={seatIndex} className="mx-1">
                      {seat.attribute === "seats" ? (
                        seat.seatBooked ? (
                          <div className="w-12 h-12 bg-red-100 border-2 border-red-300 rounded-md flex items-center justify-center cursor-not-allowed">
                            <FaChair className="text-red-500" />
                          </div>
                        ) : (
                          <button
                            onClick={() =>
                              checkSelected(seat)
                                ? removeSelectedSeats(seat)
                                : addSelectedSeats(seat)
                            }
                            className={`w-12 h-12 border-2 rounded-md flex items-center justify-center transition-colors ${
                              checkSelected(seat)
                                ? "bg-indigo-100 border-indigo-500 text-indigo-600"
                                : "bg-green-100 border-green-300 hover:bg-green-200 text-green-600"
                            }`}
                          >
                            <FaChair />
                          </button>
                        )
                      ) : (
                        <div className="w-12 h-12"></div>
                      )}
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center h-64">
                <Loader isLoading={true} />
              </div>
            )}
          </div>
        </div>

        {/* Booking Summary Section */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <div className="flex items-center mb-4">
              <FaFilm className="text-indigo-600 mr-2 text-xl" />
              <h3 className="text-2xl font-bold text-gray-800">{item.title}</h3>
            </div>

            <div className="flex items-center mb-4 text-gray-600">
              <FaClock className="mr-2" />
              <span>
                Duration: {(Number(item.duration) / 60).toFixed(2)} hours
              </span>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center text-gray-700">
                  <FaChair className="mr-2" />
                  <span>Selected Seats:</span>
                </div>
                <div className="font-semibold">
                  {selectedSeats.map((seat) => seat.id).join(", ") || "None"}
                </div>
              </div>

              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center text-gray-700">
                  <FaTicketAlt className="mr-2" />
                  <span>Total Tickets:</span>
                </div>
                <div className="font-semibold">{selectedSeats.length}</div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center text-gray-700">
                  <FaMoneyBillWave className="mr-2" />
                  <span>Total Price:</span>
                </div>
                <div className="font-semibold">
                  ₹{selectedSeats.length * 120}
                </div>
              </div>
            </div>

            <button
              onClick={BookTicket}
              disabled={selectedSeats.length === 0}
              className={`w-full flex items-center justify-center py-3 px-4 rounded-lg font-medium shadow-md transition-colors ${
                selectedSeats.length > 0
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <FaTicketAlt className="mr-2" />
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookShow;
