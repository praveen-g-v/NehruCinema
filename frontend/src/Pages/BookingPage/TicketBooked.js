import React, { useState, useEffect } from "react";
import axios from "../../api/axios"; // Assuming you use Axios for HTTP requests
import Loader from "../../hooks/Loader";
import { useNavigate, useLocation } from "react-router-dom";

function TicketBooked({ isLoading, setIsLoading }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({});

  const item = location.state;
  console.log(item);
  const [seatLayout, setSeatLayout] = useState([]);
  //   {
  //     id: 1,
  //     movieName: "Avengers: Endgame",
  //     date: "2024-08-09",
  //     time: "7:00 PM",
  //     cinema: "Cinema 5",
  //     seat: "A5",
  //     price: "$12.00",
  //   },

  const [tickets, setTickets] = useState([]);
  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  const [selectedTicket, setSelectedTicket] = useState(null);
  /**
   * create a backend for available tickets and
   * change or crate new table to maintain record of avialibility seats and booking information
   */
  useEffect(() => {
    axios
      .get("/movie/getMyBookings")
      .then((res) => {
        console.log(res);
        setTickets(res.data.bookings);
      })
      .catch((err) => {
        console.log(err);
      });
    //console.log(item);
    // if (item === null || item === undefined) {
    //   navigate("/shows");
    // }
    // try {
    //   axios
    //     .get("/movie/getBookingInfo", {
    //       params: {
    //         bookingInfoId: item.BookingInfoId,
    //         showTimeId: item.showTimeId,
    //       },
    //     })
    //     .then((res) => {
    //       //console.log(res);
    //       // //console.log(data.data.availableSeats);
    //       if (res.data.bookedSeats.length > 0) {
    //         //console.log(res.data.bookedSeats);
    //         setBookingDetails(res.data);
    //         setSeatLayout(res.data.bookedSeats);
    //       }
    //     })
    //     .catch((err) => {
    //       //console.log(err);
    //     });
    // } catch (err) {}
  }, []);

  const navigateToShows = () => {
    //console.log(item);
    navigate("/shows");
  };
  useEffect(() => {
    // if (item == null || item == undefined || item == null) {
    //   navigateToShows();
    // }
  }, []);

  return (
    <div className="container  mx-auto px-4 mt-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Booked Movie Tickets</h1>
      {tickets.length <= 0 ? (
        <>
          <div className="text-3xl h-[20em] flex items-center justify-center text-gray-500 font-bold mb-8">
            No Tickets Booked
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="flex  sm:flex-row flex-col">
            <div className="flex flex-col bg-gray-300 h-96 overflow-scroll">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-white p-4 m-1 flex-1 rounded-lg shadow-lg hover:shadow-xl cursor-pointer"
                  onClick={() => handleTicketClick(ticket)}
                >
                  <h2 className="text-2xl font-semibold mb-2">
                    {ticket.movie}
                  </h2>
                  <p className="text-gray-600">
                    {new Date(ticket.date).getDate()}
                    {"/"}
                    {new Date(ticket.date).getMonth()}
                    {"/"}
                    {new Date(ticket.date).getFullYear()} - {ticket.time}
                  </p>
                  <p className="text-gray-600">
                    Cinema: {ticket.theatreHallName}
                    {" - "}
                    {ticket.location}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex-1 ml-2">
              {/* Detailed Ticket View */}
              {selectedTicket && (
                <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-semibold mb-4">
                    {selectedTicket.movie} - Ticket Details
                  </h2>
                  <p className="text-gray-700">
                    <strong>Date:</strong>{" "}
                    {new Date(selectedTicket.date).getDate()}
                    {"/"}
                    {new Date(selectedTicket.date).getMonth()}
                    {"/"}
                    {new Date(selectedTicket.date).getFullYear()}
                  </p>
                  <p className="text-gray-700">
                    <strong>Time:</strong> {selectedTicket.time}
                  </p>
                  <p className="text-gray-700">
                    <strong>Cinema:</strong> {selectedTicket.theatreHallName}
                    {" ( "}
                    {selectedTicket.location} {" ) "}
                  </p>
                  <p className="text-gray-700">
                    <strong>Seat:</strong>{" "}
                    {selectedTicket.seats.map((val) => {
                      return val.id + ", ";
                    })}
                  </p>
                  <p className="text-gray-700">
                    <strong>Price:</strong> {selectedTicket.seats.length * 120}
                  </p>

                  {/* Button to close details */}
                  <button
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() => setSelectedTicket(null)}
                  >
                    Close Details
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TicketBooked;
