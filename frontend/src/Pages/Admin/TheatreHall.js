import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming axios for API calls

const TheatreHall = () => {
  const [theatreHalls, setTheatreHalls] = useState([]);
  const [selectedHall, setSelectedHall] = useState(null); // Stores selected hall for booking
  const [selectedSeats, setSelectedSeats] = useState([]); // Stores selected seats for booking

  // Fetch theatre halls on component mount
  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const response = await axios.get("/api/theatre-halls");
        setTheatreHalls(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchHalls();
  }, []);

  const handleHallChange = (event) => {
    setSelectedHall(
      theatreHalls.find((hall) => hall._id === event.target.value)
    );
    setSelectedSeats([]); // Reset selected seats when hall changes
  };

  const handleSeatSelection = (rowIndex, seatIndex, isAvailable) => {
    if (!isAvailable) return; // Don't allow selecting unavailable seats

    const newSelectedSeats = [...selectedSeats];
    const seat = { row: rowIndex, column: seatIndex };

    if (
      selectedSeats.some((s) => s.row === rowIndex && s.column === seatIndex)
    ) {
      // Deselect seat if already selected
      newSelectedSeats.splice(
        newSelectedSeats.findIndex(
          (s) => s.row === rowIndex && s.column === seatIndex
        ),
        1
      );
    } else {
      newSelectedSeats.push(seat);
    }

    setSelectedSeats(newSelectedSeats);
  };

  const handleBooking = async () => {
    if (!selectedHall || selectedSeats.length === 0) return;

    const bookingData = {
      // Data for booking (e.g., user ID, showtime ID, selected seats)
      theatreHallId: selectedHall._id,
      seats: selectedSeats,
    };

    try {
      const response = await axios.post("/api/bookings", bookingData);
      console.log("Booking successful:", response.data);
      // Handle successful booking (e.g., confirmation message, update seat availability)
    } catch (error) {
      console.error(error);
      // Handle booking errors
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Theatre Hall Management</h1>
      <h2>Define Theatre Hall</h2>
      {/* Logic for defining theatre halls (form elements, etc.) can be added here */}

      <h2>Manage Existing Halls</h2>
      <select
        value={selectedHall?._id}
        onChange={handleHallChange}
        className="mb-4 block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">-- Select Hall --</option>
        {theatreHalls.map((hall) => (
          <option key={hall._id} value={hall._id}>
            {hall.name}
          </option>
        ))}
      </select>

      {selectedHall && (
        <div>
          <h2>Seating Layout for {selectedHall.name}</h2>
          <div className="grid grid-cols-auto gap-2">
            {/* Implement seating layout visualization here using a grid library (e.g., react-grid-layout) */}
            {selectedHall.seatingLayout.map((seat, index) => (
              <div
                key={index}
                className={`seat ${
                  selectedSeats.some(
                    (s) => s.row === seat.row && s.column === seat.column
                  )
                    ? "selected"
                    : seat.isAvailable
                    ? "available"
                    : "unavailable"
                }`}
                onClick={() =>
                  handleSeatSelection(seat.row, seat.column, seat.isAvailable)
                }
              >
                {/* Seat representation (color, text) based on type and availability */}
                {seat.type}
              </div>
            ))}
          </div>
          <button
            type="button"
            disabled={!selectedHall || selectedSeats.length === 0}
            onClick={handleBooking}
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700"
          >
            Book Selected Seats
          </button>
        </div>
      )}
    </div>
  );
};

export default TheatreHall;
