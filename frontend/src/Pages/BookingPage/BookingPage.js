import React, { useState, useEffect } from "react";
import axios from "../../api/axios"; // Assuming you use Axios for HTTP requests
import Loader from "../../hooks/Loader";
import { useNavigate, useLocation } from "react-router-dom";

function BookingPage({ isLoading, setIsLoading }) {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state;
  const [ticketAvailable, setTicketAvailable] = useState(false);
  const [BookingData, setBookingData] = useState(item);
  /**
   * create a backend for available tickets and
   * change or crate new table to maintain record of avialibility seats and booking information
   */
  useEffect(() => {
    console.log(item);
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
          // console.log(data.data.availableSeats);
          if (data.data.availableSeats > 0) {
            setTicketAvailable(true);
            setBookingData({ ...data.data, ...BookingData });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {}
  }, []);
  const navigatetoBookingPortal = () => {
    axios
      .get("/hasLogged")
      .then((res) => {
        if (ticketAvailable) {
          if (BookingData) {
            navigate("/bookshow", { state: BookingData });
          }
        }
      })
      .catch((err) => {
        navigate("/login");
      });
  };
  const navigateToShows = () => {
    console.log(item);
    navigate("/shows");
  };
  useEffect(() => {
    if (item == null || item == undefined || item == null) {
      navigateToShows();
    }
  }, []);

  return (
    <div className="container mx-auto px-4 mt-8 py-8">
      {item === undefined || item === null ? (
        <></>
      ) : (
        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="flex-1  flex items-center justify-center max-h-96  md:min-h-96">
            <img
              className="flex rounded w-96  max-h-96  md:min-h-96"
              src={item.poster}
              alt={item.title}
            />
          </div>
          <div className="flex-1 justify-between flex-grow flex-col min-h-80 md:justify-start">
            <div>
              <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
              <div>
                <p className="text-gray-700 mb-4">{item.genre}</p>
                <p className="text-gray-700 mb-4">
                  Duration: {(Number(item.duration) / 60).toFixed(2)} hrs
                </p>
              </div>

              <p className="text-base leading-loose mb-4">{item.synopsis}</p>
            </div>
            {ticketAvailable ? (
              <button
                onClick={() => {
                  navigatetoBookingPortal();
                }}
                className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded shadow-md"
              >
                Book Tickets
              </button>
            ) : (
              <button
                disabled
                className="bg-red-300  text-white font-bold py-2 px-4 rounded shadow-md"
              >
                Not Available
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingPage;
