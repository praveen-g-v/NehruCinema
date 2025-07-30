import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import {
  FaStar,
  FaClock,
  FaCalendarAlt,
  FaLanguage,
  FaImdb,
  FaYoutube,
  FaTicketAlt,
} from "react-icons/fa";
import {
  MdOutlineMovie,
  MdOutlinePerson,
  MdOutlineTheaters,
} from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import Loader from "../../hooks/Loader";
import BookingModal from "./BookingModal"; // We'll create this component next
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  // Sample showtimes data - in a real app, this would come from your API
  const [showtimes, setShowtimes] = useState([
    { id: 1, time: "10:00 AM", date: "2023-06-15", theater: "Screen 1" },
    { id: 2, time: "1:30 PM", date: "2023-06-15", theater: "Screen 2" },
    { id: 3, time: "4:45 PM", date: "2023-06-15", theater: "Screen 1" },
    { id: 4, time: "8:00 PM", date: "2023-06-15", theater: "Screen 3" },
    { id: 5, time: "10:30 PM", date: "2023-06-15", theater: "Screen 2" },
  ]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await axiosPrivate.get(`/public/movie`);
        setMovie(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleBookTicket = (showtime) => {
    setSelectedShowtime(showtime);
    setShowBookingModal(true);
  };

  if (loading) return <Loader isLoading={true} />;
  if (error)
    return <div className="text-red-500 text-center py-10">{error}</div>;
  if (!movie) return <div className="text-center py-10">Movie not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Movie Header Section */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Movie Poster */}
          <div className="md:w-1/3 p-4">
            <div className="relative pb-150% rounded-lg overflow-hidden shadow-md">
              <img
                src={movie.poster || "https://via.placeholder.com/300x450"}
                alt={movie.title}
                className="absolute h-full w-full object-cover"
              />
            </div>

            {/* Trailer Button */}
            {movie.trailer && (
              <a
                href={`https://www.youtube.com/watch?v=${movie.trailer}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <FaYoutube className="mr-2" />
                Watch Trailer
              </a>
            )}
          </div>

          {/* Movie Details */}
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {movie.title}
                </h1>
                <div className="flex items-center mt-2">
                  <div className="flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-medium">
                    <FaStar className="mr-1" />
                    {movie.rating || "N/A"}
                  </div>
                  <span className="mx-2 text-gray-500">|</span>
                  <div className="flex items-center text-gray-700">
                    <FaClock className="mr-1" />
                    {movie.duration} mins
                  </div>
                  <span className="mx-2 text-gray-500">|</span>
                  <div className="flex items-center text-gray-700">
                    <FaCalendarAlt className="mr-1" />
                    {new Date(movie.releaseDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {movie.imdbLink && (
                <a
                  href={movie.imdbLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600 transition-colors"
                >
                  <FaImdb className="text-xl mr-1" />
                  IMDb
                </a>
              )}
            </div>

            {/* Genre Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {movie.genre?.split(",").map((genre, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full"
                >
                  {genre.trim()}
                </span>
              ))}
            </div>

            {/* Synopsis */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Synopsis
              </h2>
              <p className="text-gray-700 leading-relaxed">{movie.synopsis}</p>
            </div>

            {/* Additional Details */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                  <MdOutlinePerson className="mr-2" />
                  Cast
                </h3>
                <ul className="space-y-1">
                  {movie.cast?.map((actor, index) => (
                    <li key={index} className="text-gray-700">
                      {actor}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                  <MdOutlineMovie className="mr-2" />
                  Crew
                </h3>
                <ul className="space-y-1">
                  {movie.crew?.map((member, index) => (
                    <li key={index} className="text-gray-700">
                      {member}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                  <FaLanguage className="mr-2" />
                  Language
                </h3>
                <p className="text-gray-700">{movie.language}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                  <MdOutlineTheaters className="mr-2" />
                  Production
                </h3>
                <p className="text-gray-700">
                  {movie.productionCompany || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Showtimes Section */}
        <div className="border-t border-gray-200 px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Showtimes</h2>

          <div className="space-y-4">
            {/* Group showtimes by date */}
            {[...new Set(showtimes.map((st) => st.date))].map((date) => (
              <div key={date} className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {new Date(date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {showtimes
                    .filter((st) => st.date === date)
                    .map((showtime) => (
                      <button
                        key={showtime.id}
                        onClick={() => handleBookTicket(showtime)}
                        className="flex flex-col items-center justify-center p-3 border border-indigo-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
                      >
                        <span className="text-gray-700">{showtime.time}</span>
                        <span className="text-sm text-gray-500">
                          {showtime.theater}
                        </span>
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          movie={movie}
          showtime={selectedShowtime}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
};

export default MovieDetails;
