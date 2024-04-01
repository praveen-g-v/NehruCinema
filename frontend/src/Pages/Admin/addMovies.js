import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import Loader from "../../hooks/Loader";

const AddMovie = ({ isLoading, setIsLoading }) => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [ageRestriction, setAgeRestriction] = useState("");
  const [poster, setPoster] = useState(null);
  const [trailer, setTrailer] = useState("");
  const valiadateData = () => {
    console.log("Validating Data");
    if (title.length > 0) {
      if (genre.length > 0) {
        if (synopsis.length > 20) {
          if (cast.length > 0) {
            cast.forEach((val) => {
              if (val.length < 0) {
                alert("Please enter valid cast");
                return false;
              }
            });
            if (crew.length > 0) {
              crew.forEach((val) => {
                if (val.length < 0) {
                  alert("Please enter valid crew");
                  return false;
                }
              });
              if (ageRestriction.length > 0) {
                if (poster != null) {
                  var regExp =
                    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
                  var newTrailer = trailer.match(regExp);
                  if (newTrailer) {
                    if (newTrailer.length >= 7) {
                      return true;
                    } else {
                      alert("Enter Valid Youtube URL");
                    }
                  } else {
                    alert("Enter Valid Youtube URL");
                  }
                  console.log(poster);
                } else {
                  alert("Please Upload the poster");
                }
              } else {
                alert("Please choice age restriction");
              }
            } else {
              alert("Please add a crew");
            }
          } else {
            alert("Please add a cast");
          }
        } else {
          alert("Please enter a synopsis");
        }
      } else {
        alert("Please enter a genre");
      }
    } else {
      alert("Please enter a title");
    }
    return false;
  };
  const onSubmit = async (newmovie) => {
    console.log(newmovie);
    // console.log(valiadateData());
    if (valiadateData()) {
      setIsLoading(true);
      var regExp =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      var newTrailer = trailer.match(regExp);
      let tempTrailer = newTrailer[7];
      if (newTrailer) {
        tempTrailer = newTrailer[7];
      }
      const formData = new FormData();
      formData.append("poster", poster);
      formData.append("title", title);
      formData.append("genre", genre);
      formData.append("duration", duration);
      formData.append("synopsis", synopsis);
      formData.append("cast", cast);
      formData.append("crew", crew);
      formData.append("ageRestriction", ageRestriction);
      formData.append("trailer", tempTrailer);

      try {
        const res = await axios.post("/movie/addmovie", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res.status === 200) {
          alert("Updated Successfully");
        } else if (res.status === 304) {
          alert(res.data.message);
        }
        // console.log(res);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("Not setting loadinf");
        setIsLoading(false);
        setTitle("");
        setGenre("");
        setDuration("");
        setSynopsis("");
        setCast([]);
        setCrew([]);
        setAgeRestriction("");
        setPoster(null);
        setTrailer("");
        // Clear selected image after upload
      }
    }
    setIsLoading(false);
  };
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
    // setTitle("");
    // setGenre("");
    // setDuration("");
    // setSynopsis("");
    // setCast([]);
    // setCrew([]);
    // setAgeRestriction("");
    // setPoster(null);
    // setTrailer("");
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
    <div className={` flex-6 container  mx-auto p-4  `}>
      {isLoading ? <Loader isLoading={isLoading} /> : null}
      <h1 className="text-xl font-bold mb-4">Add New Movie</h1>
      <form>
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
                    onClick={(e) => setCast(cast.filter((_, i) => i !== index))}
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
          {crew.map((actor, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                type="text"
                placeholder={`Actor ${index + 1}`}
                value={actor}
                onChange={(e) => {
                  const newCrew = [...crew];
                  newCrew[index] = e.target.value;
                  setCrew(newCrew);
                }}
              />
              {index > 0 && (
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => setCrew(crew.filter((_, i) => i !== index))}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-bold rounded shadow-sm sm:mt-0 sm:ml-2 mt-4"
            onClick={() => setCrew([...crew, ""])}
          >
            Add Crew
          </button>
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
            Movie Trailer (Youtube Link only)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="trailer"
            type="text"
            value={trailer}
            onChange={(e) => setTrailer(e.target.value)}
            required
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSubmit}
        >
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
