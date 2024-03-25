import React, { useState } from "react";

const MovieCard = () => {
  const [movie, setMovies] = useState({
    title: "Sdhvsajhdukshaudhsa",
    posterUrl: "https://httpbin.org/image/png",
    runtime: "gdsuky gfusdgif",
  });
  return (
    <div className="flex flex-col space-y-2 overflow-hidden bg-gray-100 rounded-lg shadow-md">
      <img
        src={movie.posterUrl || "https://via.placeholder.com/150x100"}
        alt={movie.title}
        className="w-full h-40 object-cover"
      />
      <div className="px-4 py-2 flex-grow">
        <h3 className="text-lg font-medium text-gray-800 line-clamp-2">
          {movie.title}
        </h3>
        <p className="text-sm text-gray-600">{movie.runtime} minutes</p>
      </div>
    </div>
  );
};

export default MovieCard;
