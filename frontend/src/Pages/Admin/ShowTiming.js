// import React, { useState, useEffect } from "react";
// import axios from "../../api/axios";

// const CreateShowtime = () => {
//   const [movies, setMovies] = useState([]);
//   const [selectedMovie, setSelectedMovie] = useState(null);
//   const [date, setDate] = useState(new Date());
//   const [time, setTime] = useState("00:00");
//   const [theatreHall, setTheatreHall] = useState("");
//   const [halls, setHalls] = useState([]);
//   const [availableSeats, setAvailableSeats] = useState(0);

//   // Fetch movie data on component mount
//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await axios.get("/movie/getmovies"); // Assuming endpoint for movies
//         setMovies(response.data);
//         const resp = await axios.get("/movie/gettheatrehall");
//         setHalls(resp.data);
//         // setAvailableSeats(resp.data.totalSeats);
//         console.log(resp.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchMovies();
//   }, []);

//   const handleSubmit = async (event) => {
//     let checkTime = time.split(":");

//     console.log(time.split(":"));
//     console.log(
//       (new Date().getHours() + ":" + new Date().getMinutes()).split(":")
//     );
//     event.preventDefault();
//     if (selectedMovie === "") {
//       alert("Please select a movie to continue");
//     } else if (theatreHall === "") {
//       alert("Please select a Thetre Hall to continue");
//     } else if (
//       new Date(date).getFullYear() < new Date().getFullYear() ||
//       new Date(date).getMonth() < new Date().getMonth() ||
//       new Date(date).getDate() < new Date().getDate()
//     ) {
//       // console.log(new Date(date).getDay() + "  " + new Date().getDay());
//       alert("Past date cannot be selected");
//     } else if (
//       checkTime[0] < new Date().getHours() &&
//       new Date(date).getDate() === new Date().getDate()
//     ) {
//       if (
//         checkTime[1] < new Date().getMinutes() &&
//         new Date(date).getDate() === new Date().getDate()
//       ) {
//         alert("Past time cannot be selected");
//       } else {
//         alert("Past Time cannot be selected");
//       }
//     } else {
//       try {
//         const response = await axios.post("/movie/addshowtime", {
//           movieId: selectedMovie,
//           date,
//           time,
//           theatreHall,
//           availableSeats,
//         });
//         alert("Showtime created successfully");
//         setSelectedMovie("");
//         setDate(new Date());
//         setTime("00:00");
//         setAvailableSeats("");
//         setTheatreHall("");

//         console.log("Showtime created successfully:", response.data);
//         // Clear form or handle success state here
//       } catch (error) {
//         console.error(error);
//         alert("Error");
//         setSelectedMovie("");
//         setDate(new Date());
//         setTime("00:00");
//         setAvailableSeats("");
//         setTheatreHall("");
//         // Handle errors appropriately
//       }
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Create Showtime</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="movie" className="block text-gray-700 font-bold mb-2">
//             Movie:
//           </label>
//           <select
//             id="movie"
//             name="movie"
//             className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             value={selectedMovie}
//             onChange={(e) => setSelectedMovie(e.target.value)}
//           >
//             <option value="">-- Select Movie --</option>
//             {movies.map((movie) => (
//               <option key={movie.id} value={movie.id}>
//                 {movie.title} - {movie.duration / 60} hrs
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="mb-4">
//           <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
//             Date:
//           </label>
//           <input
//             type="date"
//             id="date"
//             name="date"
//             className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             value={date.toISOString().split("T")[0]} // Format date for input
//             onChange={(e) => {
//               console.log(e.target.value);
//               setDate(new Date(e.target.value));
//             }}
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="time" className="block text-gray-700 font-bold mb-2">
//             Time:
//           </label>
//           <input
//             type="time"
//             id="time"
//             name="time"
//             className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             value={time}
//             onChange={(e) => setTime(e.target.value)}
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="movie" className="block text-gray-700 font-bold mb-2">
//             Theatre Hall:
//           </label>
//           <select
//             id="hall"
//             name="hall"
//             className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             value={theatreHall}
//             onChange={(e) => {
//               halls.forEach((val) => {
//                 if (val.id === e.target.value) {
//                   setAvailableSeats(val.totalSeats);
//                 }
//               });
//               setTheatreHall(e.target.value);
//             }}
//           >
//             <option value="">-- Select Hall --</option>
//             {halls.map((val) => (
//               <option key={val.id} value={val.id}>
//                 {val.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="availableSeats"
//             className="block text-gray-700 font-bold mb-2"
//           >
//             Available Seats:
//           </label>
//           <input
//             type="number"
//             id="availableSeats"
//             name="availableSeats"
//             className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             value={availableSeats}
//             disabled={true}
//             onChange={(e) => setAvailableSeats(Number(e.target.value))}
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700"
//         >
//           Create Showtime
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateShowtime;

import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import {
  FaFilm,
  FaCalendarAlt,
  FaClock,
  FaChair,
  FaTheaterMasks,
  FaPlus,
} from "react-icons/fa";

const CreateShowtime = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("00:00");
  const [theatreHall, setTheatreHall] = useState("");
  const [halls, setHalls] = useState([]);
  const [availableSeats, setAvailableSeats] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch movie data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [moviesResponse, hallsResponse] = await Promise.all([
          axios.get("/movie/getmovies"),
          axios.get("/movie/gettheatrehall"),
        ]);
        setMovies(moviesResponse.data);
        setHalls(hallsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const checkTime = time.split(":");
    const currentDate = new Date();
    const selectedDate = new Date(date);

    // Validation checks
    if (!selectedMovie) {
      alert("Please select a movie to continue");
      return;
    }
    if (!theatreHall) {
      alert("Please select a Theatre Hall to continue");
      return;
    }
    if (
      selectedDate <
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      )
    ) {
      alert("Past date cannot be selected");
      return;
    }
    if (
      selectedDate.getDate() === currentDate.getDate() &&
      (checkTime[0] < currentDate.getHours() ||
        (checkTime[0] === currentDate.getHours() &&
          checkTime[1] < currentDate.getMinutes()))
    ) {
      alert("Past time cannot be selected");
      return;
    }

    try {
      setIsLoading(true);
      await axios.post("/movie/addshowtime", {
        movieId: selectedMovie,
        date,
        time,
        theatreHall,
        availableSeats,
      });
      alert("Showtime created successfully");
      // Reset form
      setSelectedMovie("");
      setDate(new Date());
      setTime("00:00");
      setAvailableSeats(0);
      setTheatreHall("");
    } catch (error) {
      console.error("Error creating showtime:", error);
      alert("Error creating showtime");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Create New Showtime
        </h1>
        <p className="text-gray-600">
          Schedule a movie screening by filling the form below
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* Movie Selection */}
          <div className="relative">
            <label
              htmlFor="movie"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Movie
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilm className="text-gray-400" />
              </div>
              <select
                id="movie"
                name="movie"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedMovie}
                onChange={(e) => setSelectedMovie(e.target.value)}
              >
                <option value="">Select a movie</option>
                {movies.map((movie) => (
                  <option key={movie.id} value={movie.id}>
                    {movie.title} - {Math.floor(movie.duration / 60)}h{" "}
                    {movie.duration % 60}m
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="text-gray-400" />
                </div>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={date.toISOString().split("T")[0]}
                  onChange={(e) => setDate(new Date(e.target.value))}
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Time
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaClock className="text-gray-400" />
                </div>
                <input
                  type="time"
                  id="time"
                  name="time"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Theatre Hall */}
          <div className="relative">
            <label
              htmlFor="hall"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Theatre Hall
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaTheaterMasks className="text-gray-400" />
              </div>
              <select
                id="hall"
                name="hall"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={theatreHall}
                onChange={(e) => {
                  const selectedHall = halls.find(
                    (val) => val.id === e.target.value
                  );
                  setAvailableSeats(selectedHall?.totalSeats || 0);
                  setTheatreHall(e.target.value);
                }}
              >
                <option value="">Select a theatre hall</option>
                {halls.map((val) => (
                  <option key={val.id} value={val.id}>
                    {val.name} (Capacity: {val.totalSeats})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Available Seats */}
          <div className="relative">
            <label
              htmlFor="availableSeats"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Available Seats
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaChair className="text-gray-400" />
              </div>
              <input
                type="number"
                id="availableSeats"
                name="availableSeats"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={availableSeats}
                disabled
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <FaPlus className="mr-2" />
                Create Showtime
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateShowtime;
