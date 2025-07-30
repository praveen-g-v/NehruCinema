import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import Loader from "../../hooks/Loader";

const AddMovie = ({ isLoading, setIsLoading }) => {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    duration: "",
    synopsis: "",
    cast: [""],
    crew: [""],
    ageRestriction: "",
    poster: null,
    trailer: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (arrayName, index, value) => {
    setFormData((prev) => {
      const newArray = [...prev[arrayName]];
      newArray[index] = value;
      return {
        ...prev,
        [arrayName]: newArray,
      };
    });
  };

  const addArrayItem = (arrayName) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], ""],
    }));
  };

  const removeArrayItem = (arrayName, index) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index),
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, poster: file }));
    } else {
      alert("Please upload a valid image file");
    }
  };

  const validateData = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.genre.trim()) newErrors.genre = "Genre is required";
    if (formData.synopsis.length < 20)
      newErrors.synopsis = "Synopsis should be at least 20 characters";
    if (formData.cast.some((item) => !item.trim()))
      newErrors.cast = "All cast members must be filled";
    if (formData.crew.some((item) => !item.trim()))
      newErrors.crew = "All crew members must be filled";
    if (!formData.ageRestriction)
      newErrors.ageRestriction = "Age restriction is required";
    if (!formData.poster) newErrors.poster = "Poster is required";

    // Validate YouTube URL
    if (formData.trailer) {
      const regExp =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      const match = formData.trailer.match(regExp);
      if (!match || match.length < 7) {
        newErrors.trailer = "Please enter a valid YouTube URL";
      }
    } else {
      newErrors.trailer = "Trailer URL is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateData()) return;

    setIsLoading(true);

    try {
      const regExp =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      const match = formData.trailer.match(regExp);
      const youtubeId = match ? match[7] : "";

      const data = new FormData();
      data.append("poster", formData.poster);
      data.append("title", formData.title);
      data.append("genre", formData.genre);
      data.append("duration", formData.duration);
      data.append("synopsis", formData.synopsis);
      data.append("cast", JSON.stringify(formData.cast));
      data.append("crew", JSON.stringify(formData.crew));
      data.append("ageRestriction", formData.ageRestriction);
      data.append("trailer", youtubeId);

      const res = await axios.post("/movie", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        alert("Movie added successfully!");
        // Reset form
        setFormData({
          title: "",
          genre: "",
          duration: "",
          synopsis: "",
          cast: [""],
          crew: [""],
          ageRestriction: "",
          poster: null,
          trailer: "",
        });
      } else if (res.status === 304) {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Error adding movie:", error);
      alert("An error occurred while adding the movie");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {isLoading && <Loader isLoading={isLoading} />}

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-indigo-600 py-4 px-6">
          <h1 className="text-2xl font-bold text-white">Add New Movie</h1>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Movie Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border ${
                errors.title ? "border-red-500" : ""
              }`}
              placeholder="Enter movie title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Genre and Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="genre"
                className="block text-sm font-medium text-gray-700"
              >
                Genre
              </label>
              <input
                type="text"
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border ${
                  errors.genre ? "border-red-500" : ""
                }`}
                placeholder="e.g. Action, Drama"
              />
              {errors.genre && (
                <p className="mt-1 text-sm text-red-600">{errors.genre}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700"
              >
                Duration (minutes)
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                placeholder="120"
                min="1"
              />
            </div>
          </div>

          {/* Synopsis */}
          <div>
            <label
              htmlFor="synopsis"
              className="block text-sm font-medium text-gray-700"
            >
              Synopsis
            </label>
            <textarea
              id="synopsis"
              name="synopsis"
              rows={4}
              value={formData.synopsis}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border ${
                errors.synopsis ? "border-red-500" : ""
              }`}
              placeholder="Write a brief summary of the movie..."
            />
            {errors.synopsis && (
              <p className="mt-1 text-sm text-red-600">{errors.synopsis}</p>
            )}
          </div>

          {/* Cast */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cast
            </label>
            <div className="mt-1 space-y-2">
              {formData.cast.map((actor, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={actor}
                    onChange={(e) =>
                      handleArrayChange("cast", index, e.target.value)
                    }
                    className={`flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border ${
                      errors.cast && !actor.trim() ? "border-red-500" : ""
                    }`}
                    placeholder={`Actor ${index + 1}`}
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem("cast", index)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              {errors.cast && (
                <p className="mt-1 text-sm text-red-600">{errors.cast}</p>
              )}
              <button
                type="button"
                onClick={() => addArrayItem("cast")}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-2"
              >
                Add Cast Member
              </button>
            </div>
          </div>

          {/* Crew */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Crew
            </label>
            <div className="mt-1 space-y-2">
              {formData.crew.map((member, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={member}
                    onChange={(e) =>
                      handleArrayChange("crew", index, e.target.value)
                    }
                    className={`flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border ${
                      errors.crew && !member.trim() ? "border-red-500" : ""
                    }`}
                    placeholder={`Crew member ${index + 1}`}
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem("crew", index)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              {errors.crew && (
                <p className="mt-1 text-sm text-red-600">{errors.crew}</p>
              )}
              <button
                type="button"
                onClick={() => addArrayItem("crew")}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-2"
              >
                Add Crew Member
              </button>
            </div>
          </div>

          {/* Age Restriction */}
          <div>
            <label
              htmlFor="ageRestriction"
              className="block text-sm font-medium text-gray-700"
            >
              Age Restriction
            </label>
            <select
              id="ageRestriction"
              name="ageRestriction"
              value={formData.ageRestriction}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border ${
                errors.ageRestriction ? "border-red-500" : ""
              }`}
            >
              <option value="">Select age restriction...</option>
              <option value="U">U (Universal) - Suitable for all ages</option>
              <option value="UA">
                UA (Parental Guidance) - Suitable for all ages with parental
                guidance for under 12
              </option>
              <option value="A">A (Adult) - Restricted to 18+</option>
              <option value="R">
                R (Restricted) - Restricted in some regions
              </option>
            </select>
            {errors.ageRestriction && (
              <p className="mt-1 text-sm text-red-600">
                {errors.ageRestriction}
              </p>
            )}
          </div>

          {/* Poster Upload */}
          <div>
            <label
              htmlFor="poster"
              className="block text-sm font-medium text-gray-700"
            >
              Movie Poster
            </label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                id="poster"
                name="poster"
                onChange={handleFileUpload}
                accept="image/*"
                className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 ${
                  errors.poster ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.poster && (
              <p className="mt-1 text-sm text-red-600">{errors.poster}</p>
            )}
            {formData.poster && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {formData.poster.name}
              </p>
            )}
          </div>

          {/* Trailer URL */}
          <div>
            <label
              htmlFor="trailer"
              className="block text-sm font-medium text-gray-700"
            >
              YouTube Trailer URL
            </label>
            <input
              type="url"
              id="trailer"
              name="trailer"
              value={formData.trailer}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border ${
                errors.trailer ? "border-red-500" : ""
              }`}
              placeholder="https://www.youtube.com/watch?v=..."
            />
            {errors.trailer && (
              <p className="mt-1 text-sm text-red-600">{errors.trailer}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovie;

// import React, { useState } from "react";
// import axios from "../../api/axios";
// import Loader from "../../hooks/Loader";
// import { FiPlus, FiTrash2, FiUpload, FiYoutube } from "react-icons/fi";
// import { FaImdb } from "react-icons/fa";
// import { MdOutlineMovie } from "react-icons/md";
// import { showToast } from "../../utils/toast";
// import useAxiosPrivate from "../../hooks/useAxiosPrivate";

// const AddMovie = ({ isLoading, setIsLoading }) => {
//   const [formData, setFormData] = useState({
//     title: "",
//     genre: "",
//     duration: "",
//     synopsis: "",
//     cast: [""],
//     crew: [""],
//     ageRestriction: "",
//     poster: null,
//     trailer: "",
//     releaseDate: "",
//     rating: "",
//     language: "English",
//     productionCompany: "",
//     imdbLink: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [previewImage, setPreviewImage] = useState(null);
//   const axiosPrivate = useAxiosPrivate();

//   const genres = [
//     "Action",
//     "Adventure",
//     "Animation",
//     "Comedy",
//     "Crime",
//     "Documentary",
//     "Drama",
//     "Fantasy",
//     "Horror",
//     "Mystery",
//     "Romance",
//     "Sci-Fi",
//     "Thriller",
//     "Western",
//   ];

//   const languages = [
//     "English",
//     "Hindi",
//     "Spanish",
//     "French",
//     "Mandarin",
//     "Japanese",
//     "German",
//     "Russian",
//     "Portuguese",
//     "Other",
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleArrayChange = (arrayName, index, value) => {
//     setFormData((prev) => {
//       const newArray = [...prev[arrayName]];
//       newArray[index] = value;
//       return {
//         ...prev,
//         [arrayName]: newArray,
//       };
//     });
//   };

//   const addArrayItem = (arrayName) => {
//     setFormData((prev) => ({
//       ...prev,
//       [arrayName]: [...prev[arrayName], ""],
//     }));
//   };

//   const removeArrayItem = (arrayName, index) => {
//     setFormData((prev) => ({
//       ...prev,
//       [arrayName]: prev[arrayName].filter((_, i) => i !== index),
//     }));
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type.startsWith("image/")) {
//       setFormData((prev) => ({ ...prev, poster: file }));

//       // Create preview
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       alert("Please upload a valid image file");
//     }
//   };

//   const validateData = () => {
//     const newErrors = {};

//     if (!formData.title.trim()) newErrors.title = "Title is required";
//     if (!formData.genre.trim()) newErrors.genre = "Genre is required";
//     if (formData.synopsis.length < 20)
//       newErrors.synopsis = "Synopsis should be at least 20 characters";
//     if (formData.cast.some((item) => !item.trim()))
//       newErrors.cast = "All cast members must be filled";
//     if (formData.crew.some((item) => !item.trim()))
//       newErrors.crew = "All crew members must be filled";
//     if (!formData.ageRestriction)
//       newErrors.ageRestriction = "Age restriction is required";
//     if (!formData.poster) newErrors.poster = "Poster is required";
//     if (!formData.releaseDate)
//       newErrors.releaseDate = "Release date is required";
//     if (!formData.language) newErrors.language = "Language is required";

//     // Validate YouTube URL
//     if (formData.trailer) {
//       const regExp =
//         /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
//       const match = formData.trailer.match(regExp);
//       if (!match || match.length < 7) {
//         newErrors.trailer = "Please enter a valid YouTube URL";
//       }
//     } else {
//       newErrors.trailer = "Trailer URL is required";
//     }

//     // Validate IMDb URL if provided
//     if (formData.imdbLink && !formData.imdbLink.includes("imdb.com")) {
//       newErrors.imdbLink = "Please enter a valid IMDb URL";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateData()) return;

//     setIsLoading(true);

//     try {
//       const regExp =
//         /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
//       const match = formData.trailer.match(regExp);
//       const youtubeId = match ? match[7] : "";

//       const data = new FormData();
//       data.append("poster", formData.poster);
//       data.append("title", formData.title);
//       data.append("genre", formData.genre);
//       data.append("duration", formData.duration);
//       data.append("synopsis", formData.synopsis);
//       data.append("cast", JSON.stringify(formData.cast));
//       data.append("crew", JSON.stringify(formData.crew));
//       data.append("ageRestriction", formData.ageRestriction);
//       data.append("trailer", youtubeId);
//       data.append("releaseDate", formData.releaseDate);
//       data.append("rating", formData.rating);
//       data.append("language", formData.language);
//       data.append("productionCompany", formData.productionCompany);
//       data.append("imdbLink", formData.imdbLink);

//       const res = axiosPrivate.post("/public/movie", data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (res.status === 200) {
//         showToast.success("Movie added successfully!");
//         // Reset form
//         setFormData({
//           title: "",
//           genre: "",
//           duration: "",
//           synopsis: "",
//           cast: [""],
//           crew: [""],
//           ageRestriction: "",
//           poster: null,
//           trailer: "",
//           releaseDate: "",
//           rating: "",
//           language: "English",
//           productionCompany: "",
//           imdbLink: "",
//         });
//         setPreviewImage(null);
//       } else if (res.status === 304) {
//         showToast.error(res.data.message);
//       }
//     } catch (error) {
//       console.error("Error adding movie:", error);
//       showToast.error("An error occurred while adding the movie");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
//       {isLoading && <Loader isLoading={isLoading} />}

//       <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
//         <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-5 px-6 flex items-center">
//           <MdOutlineMovie className="text-white text-3xl mr-3" />
//           <h1 className="text-2xl font-bold text-white">Add New Movie</h1>
//         </div>

//         <form onSubmit={onSubmit} className="p-6 space-y-6">
//           {/* Basic Information Section */}
//           <div className="space-y-6">
//             <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
//               Basic Information
//             </h2>

//             {/* Title */}
//             <div>
//               <label
//                 htmlFor="title"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Movie Title *
//               </label>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border ${
//                   errors.title ? "border-red-500" : ""
//                 }`}
//                 placeholder="Enter movie title"
//               />
//               {errors.title && (
//                 <p className="mt-1 text-sm text-red-600">{errors.title}</p>
//               )}
//             </div>

//             {/* Genre, Duration, Release Date */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div>
//                 <label
//                   htmlFor="genre"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Genre *
//                 </label>
//                 <select
//                   id="genre"
//                   name="genre"
//                   value={formData.genre}
//                   onChange={handleChange}
//                   className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border ${
//                     errors.genre ? "border-red-500" : ""
//                   }`}
//                 >
//                   <option value="">Select genre...</option>
//                   {genres.map((genre) => (
//                     <option key={genre} value={genre}>
//                       {genre}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.genre && (
//                   <p className="mt-1 text-sm text-red-600">{errors.genre}</p>
//                 )}
//               </div>

//               <div>
//                 <label
//                   htmlFor="duration"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Duration (minutes)
//                 </label>
//                 <input
//                   type="number"
//                   id="duration"
//                   name="duration"
//                   value={formData.duration}
//                   onChange={handleChange}
//                   className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
//                   placeholder="120"
//                   min="1"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="releaseDate"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Release Date *
//                 </label>
//                 <input
//                   type="date"
//                   id="releaseDate"
//                   name="releaseDate"
//                   value={formData.releaseDate}
//                   onChange={handleChange}
//                   className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border ${
//                     errors.releaseDate ? "border-red-500" : ""
//                   }`}
//                 />
//                 {errors.releaseDate && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.releaseDate}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Language and Rating */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label
//                   htmlFor="language"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Language *
//                 </label>
//                 <select
//                   id="language"
//                   name="language"
//                   value={formData.language}
//                   onChange={handleChange}
//                   className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border ${
//                     errors.language ? "border-red-500" : ""
//                   }`}
//                 >
//                   {languages.map((lang) => (
//                     <option key={lang} value={lang}>
//                       {lang}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.language && (
//                   <p className="mt-1 text-sm text-red-600">{errors.language}</p>
//                 )}
//               </div>

//               <div>
//                 <label
//                   htmlFor="rating"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Rating (0-10)
//                 </label>
//                 <input
//                   type="number"
//                   id="rating"
//                   name="rating"
//                   value={formData.rating}
//                   onChange={handleChange}
//                   min="0"
//                   max="10"
//                   step="0.1"
//                   className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
//                   placeholder="7.5"
//                 />
//               </div>
//             </div>

//             {/* Production Company and IMDb Link */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label
//                   htmlFor="productionCompany"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Production Company
//                 </label>
//                 <input
//                   type="text"
//                   id="productionCompany"
//                   name="productionCompany"
//                   value={formData.productionCompany}
//                   onChange={handleChange}
//                   className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
//                   placeholder="Enter production company"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="imdbLink"
//                   className="block text-sm font-medium text-gray-700 mb-1 flex items-center"
//                 >
//                   <FaImdb className="text-yellow-500 mr-1 text-xl" />
//                   IMDb Link
//                 </label>
//                 <input
//                   type="url"
//                   id="imdbLink"
//                   name="imdbLink"
//                   value={formData.imdbLink}
//                   onChange={handleChange}
//                   className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border ${
//                     errors.imdbLink ? "border-red-500" : ""
//                   }`}
//                   placeholder="https://www.imdb.com/title/..."
//                 />
//                 {errors.imdbLink && (
//                   <p className="mt-1 text-sm text-red-600">{errors.imdbLink}</p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Synopsis Section */}
//           <div className="space-y-6">
//             <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
//               Synopsis
//             </h2>
//             <div>
//               <label
//                 htmlFor="synopsis"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Synopsis *
//               </label>
//               <textarea
//                 id="synopsis"
//                 name="synopsis"
//                 rows={5}
//                 value={formData.synopsis}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border ${
//                   errors.synopsis ? "border-red-500" : ""
//                 }`}
//                 placeholder="Write a detailed summary of the movie..."
//               />
//               {errors.synopsis && (
//                 <p className="mt-1 text-sm text-red-600">{errors.synopsis}</p>
//               )}
//             </div>
//           </div>

//           {/* Cast & Crew Section */}
//           <div className="space-y-6">
//             <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
//               Cast & Crew
//             </h2>

//             {/* Cast */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Cast Members *
//               </label>
//               <div className="mt-1 space-y-3">
//                 {formData.cast.map((actor, index) => (
//                   <div key={index} className="flex items-center space-x-3">
//                     <input
//                       type="text"
//                       value={actor}
//                       onChange={(e) =>
//                         handleArrayChange("cast", index, e.target.value)
//                       }
//                       className={`flex-1 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border ${
//                         errors.cast && !actor.trim() ? "border-red-500" : ""
//                       }`}
//                       placeholder={`Actor ${index + 1} name`}
//                     />
//                     {index > 0 && (
//                       <button
//                         type="button"
//                         onClick={() => removeArrayItem("cast", index)}
//                         className="inline-flex items-center p-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//                         title="Remove cast member"
//                       >
//                         <FiTrash2 className="h-4 w-4" />
//                       </button>
//                     )}
//                   </div>
//                 ))}
//                 {errors.cast && (
//                   <p className="mt-1 text-sm text-red-600">{errors.cast}</p>
//                 )}
//                 <button
//                   type="button"
//                   onClick={() => addArrayItem("cast")}
//                   className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-2"
//                 >
//                   <FiPlus className="mr-1" /> Add Cast Member
//                 </button>
//               </div>
//             </div>

//             {/* Crew */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Crew Members *
//               </label>
//               <div className="mt-1 space-y-3">
//                 {formData.crew.map((member, index) => (
//                   <div key={index} className="flex items-center space-x-3">
//                     <input
//                       type="text"
//                       value={member}
//                       onChange={(e) =>
//                         handleArrayChange("crew", index, e.target.value)
//                       }
//                       className={`flex-1 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border ${
//                         errors.crew && !member.trim() ? "border-red-500" : ""
//                       }`}
//                       placeholder={`Crew member ${index + 1} name`}
//                     />
//                     {index > 0 && (
//                       <button
//                         type="button"
//                         onClick={() => removeArrayItem("crew", index)}
//                         className="inline-flex items-center p-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//                         title="Remove crew member"
//                       >
//                         <FiTrash2 className="h-4 w-4" />
//                       </button>
//                     )}
//                   </div>
//                 ))}
//                 {errors.crew && (
//                   <p className="mt-1 text-sm text-red-600">{errors.crew}</p>
//                 )}
//                 <button
//                   type="button"
//                   onClick={() => addArrayItem("crew")}
//                   className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-2"
//                 >
//                   <FiPlus className="mr-1" /> Add Crew Member
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Media Section */}
//           <div className="space-y-6">
//             <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
//               Media
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Poster Upload */}
//               <div>
//                 <label
//                   htmlFor="poster"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Movie Poster *
//                 </label>
//                 <div className="mt-1">
//                   <label
//                     htmlFor="poster"
//                     className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${
//                       errors.poster
//                         ? "border-red-500 bg-red-50"
//                         : "border-gray-300 hover:border-indigo-500 hover:bg-indigo-50"
//                     }`}
//                   >
//                     {previewImage ? (
//                       <img
//                         src={previewImage}
//                         alt="Poster preview"
//                         className="h-full w-full object-contain rounded-lg"
//                       />
//                     ) : (
//                       <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                         <FiUpload className="w-8 h-8 mb-3 text-gray-500" />
//                         <p className="mb-2 text-sm text-gray-500">
//                           <span className="font-semibold">Click to upload</span>{" "}
//                           or drag and drop
//                         </p>
//                         <p className="text-xs text-gray-500">
//                           PNG, JPG, JPEG (Max 5MB)
//                         </p>
//                       </div>
//                     )}
//                     <input
//                       id="poster"
//                       name="poster"
//                       type="file"
//                       onChange={handleFileUpload}
//                       accept="image/*"
//                       className="hidden"
//                     />
//                   </label>
//                 </div>
//                 {errors.poster && (
//                   <p className="mt-1 text-sm text-red-600">{errors.poster}</p>
//                 )}
//                 {formData.poster && !previewImage && (
//                   <p className="mt-2 text-sm text-gray-600">
//                     Selected: {formData.poster.name}
//                   </p>
//                 )}
//               </div>

//               {/* Trailer URL */}
//               <div>
//                 <label
//                   htmlFor="trailer"
//                   className="block text-sm font-medium text-gray-700 mb-1 flex items-center"
//                 >
//                   <FiYoutube className="text-red-600 mr-1 text-lg" />
//                   YouTube Trailer URL *
//                 </label>
//                 <input
//                   type="url"
//                   id="trailer"
//                   name="trailer"
//                   value={formData.trailer}
//                   onChange={handleChange}
//                   className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border ${
//                     errors.trailer ? "border-red-500" : ""
//                   }`}
//                   placeholder="https://www.youtube.com/watch?v=..."
//                 />
//                 {errors.trailer && (
//                   <p className="mt-1 text-sm text-red-600">{errors.trailer}</p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Age Restriction */}
//           <div>
//             <label
//               htmlFor="ageRestriction"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Age Restriction *
//             </label>
//             <select
//               id="ageRestriction"
//               name="ageRestriction"
//               value={formData.ageRestriction}
//               onChange={handleChange}
//               className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border ${
//                 errors.ageRestriction ? "border-red-500" : ""
//               }`}
//             >
//               <option value="">Select age restriction...</option>
//               <option value="U">U (Universal) - Suitable for all ages</option>
//               <option value="UA">
//                 UA (Parental Guidance) - Suitable for all ages with parental
//                 guidance for under 12
//               </option>
//               <option value="A">A (Adult) - Restricted to 18+</option>
//               <option value="R">
//                 R (Restricted) - Restricted in some regions
//               </option>
//             </select>
//             {errors.ageRestriction && (
//               <p className="mt-1 text-sm text-red-600">
//                 {errors.ageRestriction}
//               </p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-end pt-4">
//             <button
//               type="submit"
//               className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
//             >
//               Add Movie
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddMovie;
