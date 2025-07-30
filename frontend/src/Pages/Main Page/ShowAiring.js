// import React, { useState, useEffect } from "react";
// import axios from "../../api/axios"; // Assuming you use Axios for HTTP requests
// import Loader from "../../hooks/Loader";
// import { useNavigate } from "react-router-dom";
// import Carousel from "./Carousel";

// function ShowsAiring({ isLoading, setIsLoading }) {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [imageUrl, setImageUrl] = useState(null);
//   const [uploadMessage, setUploadMessage] = useState(null);
//   const [movies, setMovies] = useState([]);
//   const [nextmovies, setNextMovies] = useState([]);
//   const navigate = useNavigate();
//   useEffect(() => {
//     // Fetch movies with upcoming showtimes
//     setIsLoading(true);
//     try {
//       axios
//         .get("/movie/getTodayShows")
//         .then((data) => {
//           setMovies(data.data);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } catch (err) {
//       console.log(err);
//     }
//     try {
//       axios
//         .get("/movie/getTomorrowShows")
//         .then((data) => {
//           setNextMovies(data.data);
//           console.log(data.data);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } catch (err) {
//       console.log(err);
//     }
//     setIsLoading(false);
//     //
//   }, []);

//   const movie = [
//     {
//       title: "The Big Lebowski",
//       genre: "Comedy",
//       synopsis:
//         "The Dude abides. After a case of mistaken identity, Jeff Lebowski, a laid-back Los Angeles slacker with a goatee, is dragged into a crazy mission with his bowling buddies.",
//       duration: "120",
//       time: "12:00 pm",
//       poster:
//         "https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/750/BLACKKLANSMAN_FLAG_ONESHEET_FINISH_V11547059100.jpg",
//     },
//     {
//       title: "The Big Lebowski",
//       genre: "Comedy",
//       synopsis:
//         "The Dude abides. After a case of mistaken identity, Jeff Lebowski, a laid-back Los Angeles slacker with a goatee, is dragged into a crazy mission with his bowling buddies.",
//       duration: "120",
//       time: "12:00 pm",
//       poster:
//         "https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/750/BLACKKLANSMAN_FLAG_ONESHEET_FINISH_V11547059100.jpg",
//     },
//   ];
//   const onImageChange = (event) => {
//     if (event.target.files && event.target.files[0]) {
//       setSelectedImage(event.target.files[0]);
//     }
//   };

//   const onImageUpload = async () => {
//     if (!selectedImage) {
//       setUploadMessage("Please select an image to upload!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", selectedImage);

//     try {
//       const response = await axios.post("/addmovie", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setImageUrl(response.data.url);
//       setUploadMessage(response.data.message);
//     } catch (error) {
//       console.error(error);
//       setUploadMessage("Upload failed!");
//     } finally {
//       setSelectedImage(null); // Clear selected image after upload
//     }
//   };

//   return (
//     <div className="container w-screen  mt-12 font-bold  mr-0">
//       {isLoading ? <Loader isLoading={isLoading} /> : null}
//       {movies.length > 0 ? (
//         <>
//           <Carousel items={movies} />

//           <h1 className="m-2 text-left text-gray-800 text-2xl">
//             Currently Airing on Theatre
//           </h1>
//           <h2 className="m-2 text-left  text-gray-800 text-xl">Today</h2>
//           <div className="flex  flex-wrap">
//             {movies.map((val) => {
//               return (
//                 <>
//                   <div className="flex space-x-0 flex-row md:w-96 p-4">
//                     <div className="flex-1 bg-gray-100 flex items-center justify-center max-h-60 max-w-52  ">
//                       <img
//                         className="flex rounded   max-h-60  "
//                         src={val.poster}
//                         alt={val.title}
//                       />
//                     </div>
//                     <div className="flex-1 bg-gray-100  min-h-60 ">
//                       <h1 className="text-xl font-bold mb-4">{val.title}</h1>
//                       <div>
//                         <p className="text-gray-700 mb-4">{val.genre}</p>
//                         <p className="text-gray-700 mb-4">
//                           Duration:{(Number(val.duration) / 60).toFixed(2)}hrs
//                         </p>
//                         <p className="text-gray-700 mb-4">Timing:{val.time}</p>
//                         <p className="text-gray-700 mb-4"></p>
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               );
//             })}
//           </div>

//           {nextmovies.length > 0 ? (
//             <>
//               <h2 className="m-2 text-left  text-gray-800 text-xl">Tomorrow</h2>
//               <div className="flex  flex-wrap">
//                 {nextmovies.map((val) => {
//                   return (
//                     <>
//                       <div className="flex space-x-0 flex-row md:w-96 p-4">
//                         <div className="flex-1 bg-gray-100 flex items-center justify-center max-h-60 max-w-52  ">
//                           <img
//                             className="flex rounded   max-h-60  "
//                             src={val.poster}
//                             alt={val.title}
//                           />
//                         </div>
//                         <div className="flex-1 bg-gray-100  min-h-60 ">
//                           <h1 className="text-xl font-bold mb-4">
//                             {val.title}
//                           </h1>
//                           <div>
//                             <p className="text-gray-700 mb-4">{val.genre}</p>
//                             <p className="text-gray-700 mb-4">
//                               Duration:{(Number(val.duration) / 60).toFixed(2)}
//                               hrs
//                             </p>
//                             <p className="text-gray-700 mb-4">
//                               Timing:{val.time}
//                             </p>
//                             <p className="text-gray-700 mb-4"></p>
//                           </div>
//                         </div>
//                       </div>
//                     </>
//                   );
//                 })}
//               </div>
//             </>
//           ) : (
//             <>
//               <div className="m-2 h-12  flex items-center justify-center p-5 text-left  text-gray-500 text-xl">
//                 No Shows
//               </div>
//             </>
//           )}
//         </>
//       ) : (
//         <div className="m-2 h-screen  flex items-center justify-center p-5 text-left  text-gray-500 text-xl">
//           No Shows are airing Today, Sorry for the inconvenience
//         </div>
//       )}
//     </div>
//   );
// }

// export default ShowsAiring;

import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import Loader from "../../hooks/Loader";
import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel";
import {
  FaClock,
  FaCalendarAlt,
  FaFilm,
  FaTicketAlt,
  FaSadTear,
} from "react-icons/fa";

function ShowsAiring({ isLoading, setIsLoading }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadMessage, setUploadMessage] = useState(null);
  const [movies, setMovies] = useState([]);
  const [nextmovies, setNextMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }, []);

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
      setSelectedImage(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-9xl">
      {isLoading ? <Loader isLoading={isLoading} /> : null}

      {movies.length > 0 ? (
        <>
          <Carousel items={movies} />

          <div className="mb-8">
            <div className="flex items-center mb-6">
              <FaFilm className="text-indigo-600 mr-3 text-2xl" />
              <h1 className="text-3xl font-bold text-gray-800">
                Currently Airing in Theatre
              </h1>
            </div>

            <div className="flex items-center mb-4">
              <FaCalendarAlt className="text-indigo-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-700">Today</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {movies.map((val, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={val.poster}
                      alt={val.title}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {val.title}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                        {val.genre}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <FaClock className="mr-2 text-indigo-500" />
                      <span>
                        {(Number(val.duration) / 60).toFixed(2)} hours
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-4">
                      <FaTicketAlt className="mr-2 text-indigo-500" />
                      <span>{val.time}</span>
                    </div>
                    <button
                      onClick={() => navigate(`/movie/${val._id}`)}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {nextmovies.length > 0 ? (
            <div className="mt-10">
              <div className="flex items-center mb-4">
                <FaCalendarAlt className="text-indigo-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-700">
                  Tomorrow
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nextmovies.map((val, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={val.poster}
                        alt={val.title}
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {val.title}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                          {val.genre}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-2">
                        <FaClock className="mr-2 text-indigo-500" />
                        <span>
                          {(Number(val.duration) / 60).toFixed(2)} hours
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-4">
                        <FaTicketAlt className="mr-2 text-indigo-500" />
                        <span>{val.time}</span>
                      </div>
                      <button
                        onClick={() => navigate(`/movie/${val._id}`)}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center mt-8">
              <div className="flex flex-col items-center">
                <FaSadTear className="text-gray-400 text-4xl mb-4" />
                <h3 className="text-xl text-gray-600">
                  No shows scheduled for tomorrow
                </h3>
                <p className="text-gray-500 mt-2">
                  Check back later for updates!
                </p>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-96">
          <FaSadTear className="text-gray-400 text-5xl mb-4" />
          <h2 className="text-2xl text-gray-600 mb-2">No Shows Today</h2>
          <p className="text-gray-500">We apologize for the inconvenience</p>
        </div>
      )}
    </div>
  );
}

export default ShowsAiring;
