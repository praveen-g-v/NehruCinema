import React, { useEffect, useState } from "react";
import MovieList from "./MovieList";
import Search from "../User/Search";

const ViewShowtime = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  useEffect(() => {
    // Fetch movies with upcoming showtimes
    fetch("/api/movies?availableShowtimes=true")
      .then((response) => response.json())
      .then((data) => setMovies(data));
  }, []);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleShowtimeClick = (showtime) => {
    setSelectedShowtime(showtime);
  };

  const handleSeatSelection = (seats) => {
    // Implement seat booking logic (optional)
  };

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.release_date.includes(searchTerm)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Movies Now Showing
      </h1>
      <Search onSearch={handleSearchChange} />
      <MovieList movies={filteredMovies} onMovieClick={handleMovieClick} />
      {selectedMovie && (
        <>
          <h2>{selectedMovie.title}</h2>
          {/* <Showtimes showtimes={selectedMovie.showtimes} onShowtimeClick={handleShowtimeClick} />
          {selectedShowtime && <SeatSelection showtime={selectedShowtime} onSeatSelection={handleSeatSelection} />} */}
        </>
      )}
    </div>
  );
};

export default ViewShowtime;
