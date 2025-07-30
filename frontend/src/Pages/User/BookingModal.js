import React, { useState } from "react";
import { FaTimes, FaTicketAlt, FaUser } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { MdOutlineTheaters } from "react-icons/md";

const BookingModal = ({ movie, showtime, onClose }) => {
  const [tickets, setTickets] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Sample seats data - in a real app, this would come from your API
  const seats = [
    { id: "A1", available: true },
    { id: "A2", available: true },
    { id: "A3", available: false },
    { id: "A4", available: true },
    { id: "B1", available: true },
    { id: "B2", available: false },
    { id: "B3", available: true },
    { id: "B4", available: true },
    { id: "C1", available: true },
    { id: "C2", available: true },
    { id: "C3", available: false },
    { id: "C4", available: true },
  ];

  const handleSeatSelect = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      if (selectedSeats.length < tickets) {
        setSelectedSeats([...selectedSeats, seatId]);
      }
    }
  };

  const handleConfirmBooking = () => {
    // In a real app, you would send this data to your backend
    console.log("Booking confirmed:", {
      movieId: movie.id,
      showtime,
      seats: selectedSeats,
      tickets,
    });
    alert(
      `Booking confirmed for ${tickets} ticket(s) to ${movie.title} at ${showtime.time}`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Book Tickets</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FaTimes />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Movie Info */}
          <div className="flex items-start space-x-4 mb-6">
            <img
              src={movie.poster || "https://via.placeholder.com/100x150"}
              alt={movie.title}
              className="w-20 h-28 object-cover rounded"
            />
            <div>
              <h3 className="text-lg font-bold">{movie.title}</h3>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <IoMdTime className="mr-1" />
                {showtime.time} • {showtime.theater}
              </div>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <MdOutlineTheaters className="mr-1" />
                {new Date(showtime.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>

          {/* Ticket Quantity */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaTicketAlt className="mr-2" />
              Number of Tickets
            </label>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setTickets(Math.max(1, tickets - 1))}
                className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-1 border border-gray-300 rounded-md bg-gray-50">
                {tickets}
              </span>
              <button
                onClick={() => setTickets(tickets + 1)}
                className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Seat Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaUser className="mr-2" />
              Select Seats ({selectedSeats.length}/{tickets} selected)
            </label>

            {/* Screen Indicator */}
            <div className="text-center mb-4">
              <div className="inline-block px-8 py-1 bg-gray-200 rounded-t-lg">
                <span className="text-sm font-medium">SCREEN</span>
              </div>
            </div>

            {/* Seats Grid */}
            <div className="grid grid-cols-4 gap-3">
              {seats.map((seat) => (
                <button
                  key={seat.id}
                  onClick={() => seat.available && handleSeatSelect(seat.id)}
                  disabled={!seat.available}
                  className={`flex items-center justify-center h-10 w-10 rounded-md text-sm font-medium
                    ${
                      !seat.available
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : selectedSeats.includes(seat.id)
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    }`}
                >
                  {seat.id}
                </button>
              ))}
            </div>

            {/* Seats Legend */}
            <div className="flex justify-center space-x-4 mt-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-indigo-600 rounded-sm mr-1"></div>
                <span>Selected</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-100 rounded-sm mr-1"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-200 rounded-sm mr-1"></div>
                <span>Booked</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmBooking}
              disabled={selectedSeats.length !== tickets}
              className={`px-4 py-2 rounded-md text-white ${
                selectedSeats.length === tickets
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-indigo-300 cursor-not-allowed"
              }`}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
