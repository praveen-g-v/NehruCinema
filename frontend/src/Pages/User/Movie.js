import React, { useState } from "react";

const Movie = () => {
  const [movie, setMovies] = useState({
    title: "Sdhvsajhdukshaudhsa",
    poster: "https://httpbin.org/image/png",
    genre: "gdsuky gfusdgif",
    release_date: "623785947",
  });
  return (
    <div className="flex flex-col bg-white rounded shadow-md p-4 mb-4">
      <img
        className="w-48 h-64 rounded object-cover"
        src={movie.poster}
        alt={movie.title}
      />
      <h3 className="text-lg font-medium text-gray-800 mt-2">{movie.title}</h3>
      <p className="text-sm text-gray-500">
        {movie.genre} ({movie.release_date})
      </p>
      <button className="btn btn-primary mt-2">
        {/**onClick={() => onClick(movie)} */}
        Showtimes
      </button>
    </div>
  );
};

export default Movie;
