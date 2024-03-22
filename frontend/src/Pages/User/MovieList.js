import React from "react";
import Movie from "./Movie";

const MovieList = ({ movies, onMovieClick }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {movies.map((movie) => (
      <Movie key={movie.id} movie={movie} onClick={() => onMovieClick(movie)} />
    ))}
  </div>
);

export default MovieList;
