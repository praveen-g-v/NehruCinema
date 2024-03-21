import React, { useState } from "react";

const AddMovie = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [ageRestriction, setAgeRestriction] = useState("");
  const [poster, setPoster] = useState(null);
  const [trailer, setTrailer] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMovie = {
      title,
      genre,
      duration,
      synopsis,
      cast,
      crew,
      ageRestriction,
      poster,
      trailer,
    };
    onSubmit(newMovie); // Call the provided onSubmit function with new movie data
    // Clear the form after submission
    setTitle("");
    setGenre("");
    setDuration("");
    setSynopsis("");
    setCast([]);
    setCrew([]);
    setAgeRestriction("");
    setPoster(null);
    setTrailer(null);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file.type.startsWith("image/")) {
      setPoster(file);
    } else if (file.type.startsWith("video/")) {
      setTrailer(file);
    } else {
      alert("Invalid file type. Please upload an image or video.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Add New Movie</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="genre">
            Genre
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="genre"
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="duration">
            Duration (minutes)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="synopsis">
            Synopsis
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="synopsis"
            rows="5"
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-bold">Cast</label>
          <div>
            {cast.map((actor, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                  type="text"
                  placeholder={`Actor ${index + 1}`}
                  value={actor}
                  onChange={(e) => {
                    const newCast = [...cast];
                    newCast[index] = e.target.value;
                    setCast(newCast);
                  }}
                />
                {index > 0 && (
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => setCast(cast.filter((_, i) => i !== index))}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-bold rounded shadow-sm sm:mt-0 sm:ml-2 mt-4"
            onClick={() => setCast([...cast, ""])}
          >
            Add Cast
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-bold">Crew</label>
          {/* Similar logic can be implemented for Crew */}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="ageRestriction">
            Age Restriction
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="ageRestriction"
            value={ageRestriction}
            onChange={(e) => setAgeRestriction(e.target.value)}
            required
          >
            <option value="">Select...</option>
            <option value="G">General Audiences</option>
            <option value="PG">Parental Guidance Suggested</option>
            {/* Add other options as needed */}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="poster">
            Movie Poster
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="poster"
            type="file"
            onChange={handleFileUpload}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="trailer">
            Movie Trailer
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="trailer"
            type="file"
            onChange={handleFileUpload}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
