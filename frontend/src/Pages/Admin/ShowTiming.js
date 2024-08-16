import React, { useState, useEffect } from "react";
import axios from "../../api/axios";

const CreateShowtime = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("00:00");
  const [theatreHall, setTheatreHall] = useState("");
  const [halls, setHalls] = useState([]);
  const [availableSeats, setAvailableSeats] = useState(0);

  // Fetch movie data on component mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("/movie/getmovies"); // Assuming endpoint for movies
        setMovies(response.data);
        const resp = await axios.get("/movie/gettheatrehall");
        setHalls(resp.data);
        // setAvailableSeats(resp.data.totalSeats);
        console.log(resp.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, []);

  const handleSubmit = async (event) => {
    let checkTime = time.split(":");

    console.log(time.split(":"));
    console.log(
      (new Date().getHours() + ":" + new Date().getMinutes()).split(":")
    );
    event.preventDefault();
    if (selectedMovie === "") {
      alert("Please select a movie to continue");
    } else if (theatreHall === "") {
      alert("Please select a Thetre Hall to continue");
    } else if (
      new Date(date).getFullYear() < new Date().getFullYear() ||
      new Date(date).getMonth() < new Date().getMonth() ||
      new Date(date).getDay() < new Date().getDay()
    ) {
      alert("Past date cannot be selected");
    } else if (checkTime[0] < new Date().getHours()) {
      if (checkTime[1] < new Date().getMinutes()) {
        alert("Past time cannot be selected");
      } else {
        alert("Past Time cannot be selected");
      }
    } else {
      try {
        const response = await axios.post("/movie/addshowtime", {
          movieId: selectedMovie,
          date,
          time,
          theatreHall,
          availableSeats,
        });
        alert("Showtime created successfully");
        setSelectedMovie("");
        setDate(new Date());
        setTime("00:00");
        setAvailableSeats("");
        setTheatreHall("");

        console.log("Showtime created successfully:", response.data);
        // Clear form or handle success state here
      } catch (error) {
        console.error(error);
        alert("Error");
        setSelectedMovie("");
        setDate(new Date());
        setTime("00:00");
        setAvailableSeats("");
        setTheatreHall("");
        // Handle errors appropriately
      }
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
            onChange={(e) => {
              console.log(e.target.value);
              setDate(new Date(e.target.value));
            }}
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
          <label htmlFor="movie" className="block text-gray-700 font-bold mb-2">
            Theatre Hall:
          </label>
          <select
            id="hall"
            name="hall"
            className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={theatreHall}
            onChange={(e) => {
              halls.forEach((val) => {
                if (val.id === e.target.value) {
                  setAvailableSeats(val.totalSeats);
                }
              });
              setTheatreHall(e.target.value);
            }}
          >
            <option value="">-- Select Hall --</option>
            {halls.map((val) => (
              <option key={val.id} value={val.id}>
                {val.name}
              </option>
            ))}
          </select>
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
            disabled={true}
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
