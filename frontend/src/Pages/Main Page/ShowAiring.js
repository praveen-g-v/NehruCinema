import React, { useState, useEffect } from "react";
import axios from "../../api/axios"; // Assuming you use Axios for HTTP requests
import Loader from "../../hooks/Loader";
import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel";

function ShowsAiring({ isLoading, setIsLoading }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadMessage, setUploadMessage] = useState(null);
  const [movies, setMovies] = useState([]);
  const [nextmovies, setNextMovies] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch movies with upcoming showtimes
    setIsLoading(true);
    try {
      axios
        .get("/movie/getTodayShows")
        .then((data) => {
          setMovies(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
    try {
      axios
        .get("/movie/getTomorrowShows")
        .then((data) => {
          setNextMovies(data.data);
          console.log(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
    //
  }, []);

  const movie = [
    {
      title: "The Big Lebowski",
      genre: "Comedy",
      synopsis:
        "The Dude abides. After a case of mistaken identity, Jeff Lebowski, a laid-back Los Angeles slacker with a goatee, is dragged into a crazy mission with his bowling buddies.",
      duration: "120",
      time: "12:00 pm",
      poster:
        "https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/750/BLACKKLANSMAN_FLAG_ONESHEET_FINISH_V11547059100.jpg",
    },
    {
      title: "The Big Lebowski",
      genre: "Comedy",
      synopsis:
        "The Dude abides. After a case of mistaken identity, Jeff Lebowski, a laid-back Los Angeles slacker with a goatee, is dragged into a crazy mission with his bowling buddies.",
      duration: "120",
      time: "12:00 pm",
      poster:
        "https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/750/BLACKKLANSMAN_FLAG_ONESHEET_FINISH_V11547059100.jpg",
    },
  ];
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const onImageUpload = async () => {
    if (!selectedImage) {
      setUploadMessage("Please select an image to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await axios.post("/addmovie", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setImageUrl(response.data.url);
      setUploadMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setUploadMessage("Upload failed!");
    } finally {
      setSelectedImage(null); // Clear selected image after upload
    }
  };

  return (
    <div className="container w-screen  mt-12 font-bold  mr-0">
      {isLoading ? <Loader isLoading={isLoading} /> : null}
      {movies.length > 0 ? (
        <>
          <Carousel items={movies} />

          <h1 className="m-2 text-left text-gray-800 text-2xl">
            Currently Airing on Theatre
          </h1>
          <h2 className="m-2 text-left  text-gray-800 text-xl">Today</h2>
          <div className="flex  flex-wrap">
            {movies.map((val) => {
              return (
                <>
                  <div className="flex space-x-0 flex-row md:w-96 p-4">
                    <div className="flex-1 bg-gray-100 flex items-center justify-center max-h-60 max-w-52  ">
                      <img
                        className="flex rounded   max-h-60  "
                        src={val.poster}
                        alt={val.title}
                      />
                    </div>
                    <div className="flex-1 bg-gray-100  min-h-60 ">
                      <h1 className="text-xl font-bold mb-4">{val.title}</h1>
                      <div>
                        <p className="text-gray-700 mb-4">{val.genre}</p>
                        <p className="text-gray-700 mb-4">
                          Duration:{(Number(val.duration) / 60).toFixed(2)}hrs
                        </p>
                        <p className="text-gray-700 mb-4">Timing:{val.time}</p>
                        <p className="text-gray-700 mb-4"></p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>

          <h2 className="m-2 text-left  text-gray-800 text-xl">Tomorrow</h2>
          {nextmovies.length > 0 ? (
            <>
              <div className="flex  flex-wrap">
                {nextmovies.map((val) => {
                  return (
                    <>
                      <div className="flex space-x-0 flex-row md:w-96 p-4">
                        <div className="flex-1 bg-gray-100 flex items-center justify-center max-h-60 max-w-52  ">
                          <img
                            className="flex rounded   max-h-60  "
                            src={val.poster}
                            alt={val.title}
                          />
                        </div>
                        <div className="flex-1 bg-gray-100  min-h-60 ">
                          <h1 className="text-xl font-bold mb-4">
                            {val.title}
                          </h1>
                          <div>
                            <p className="text-gray-700 mb-4">{val.genre}</p>
                            <p className="text-gray-700 mb-4">
                              Duration:{(Number(val.duration) / 60).toFixed(2)}
                              hrs
                            </p>
                            <p className="text-gray-700 mb-4">
                              Timing:{val.time}
                            </p>
                            <p className="text-gray-700 mb-4"></p>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div className="m-2 h-12  flex items-center justify-center p-5 text-left  text-gray-500 text-xl">
                No Shows
              </div>
            </>
          )}
        </>
      ) : (
        <div className="m-2 h-screen  flex items-center justify-center p-5 text-left  text-gray-500 text-xl">
          No Shows are airing Today, Sorry for the inconvenience
        </div>
      )}
    </div>
  );
}

export default ShowsAiring;
