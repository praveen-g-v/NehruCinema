import React, { useState, useEffect } from "react";
import axios from "../../api/axios";

const CreateShowtime = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("00:00");
  const [theatreHall, setTheatreHall] = useState("");
  const [availableSeats, setAvailableSeats] = useState(0);

  // Fetch movie data on component mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("/movie/getmovies"); // Assuming endpoint for movies
        setMovies(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/movie/addshowtime", {
        movieId: selectedMovie,
        date,
        time,
        theatreHall,
        availableSeats,
      });
      console.log("Showtime created successfully:", response.data);
      // Clear form or handle success state here
    } catch (error) {
      console.error(error);
      // Handle errors appropriately
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Showtime</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="movie" className="block text-gray-700 font-bold mb-2">
            Movie:
          </label>
          <select
            id="movie"
            name="movie"
            className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedMovie}
            onChange={(e) => setSelectedMovie(e.target.value)}
          >
            <option value="">-- Select Movie --</option>
            {movies.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.title} - {movie.duration / 60} hrs
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
            Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={date.toISOString().split("T")[0]} // Format date for input
            onChange={(e) => setDate(new Date(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="block text-gray-700 font-bold mb-2">
            Time:
          </label>
          <input
            type="time"
            id="time"
            name="time"
            className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="theatreHall"
            className="block text-gray-700 font-bold mb-2"
          >
            Theatre Hall:
          </label>
          <input
            type="text"
            id="theatreHall"
            name="theatreHall"
            onChange={(e) => setTheatreHall(e.target.value)}
            className="w-full rounded-md border border-gray-30"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="availableSeats"
            className="block text-gray-700 font-bold mb-2"
          >
            Available Seats:
          </label>
          <input
            type="number"
            id="availableSeats"
            name="availableSeats"
            className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={availableSeats}
            onChange={(e) => setAvailableSeats(Number(e.target.value))}
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700"
        >
          Create Showtime
        </button>
      </form>
    </div>
  );
};

export default CreateShowtime;
