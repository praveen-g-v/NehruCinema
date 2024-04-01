import React from "react";

const movie = {
  title: "The Big Lebowski",
  genre: "Comedy",
  synopsis:
    "The Dude abides. After a case of mistaken identity, Jeff Lebowski, a laid-back Los Angeles slacker with a goatee, is dragged into a crazy mission with his bowling buddies.",
  duration: "4200",
  poster:
    "https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/750/BLACKKLANSMAN_FLAG_ONESHEET_FINISH_V11547059100.jpg",
};

const ViewMovie = () => {
  return (
    <div className="container mx-auto px-4 mt-8 py-8">
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="flex-1  flex items-center justify-center max-h-96  md:min-h-96">
          <img
            className="flex rounded   max-h-96  md:min-h-96"
            src={movie.poster}
            alt={movie.title}
          />
        </div>
        <div className="flex-1 flex-grow min-h-80 md:justify-start">
          <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
          <div>
            <p className="text-gray-700 mb-4">{movie.genre}</p>
            <p className="text-gray-700 mb-4">{movie.duration}</p>
          </div>

          <p className="text-base leading-loose mb-4">{movie.synopsis}</p>
          <button className="bg-red-500 hover:bg-red-700  text-white font-bold py-2 px-4 rounded shadow-md">
            Book Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewMovie;
