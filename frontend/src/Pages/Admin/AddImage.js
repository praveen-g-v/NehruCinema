import React, { useState } from "react";
import axios from "../../api/axios"; // Assuming you use Axios for HTTP requests
import Loader from "../../hooks/Loader";

function AddImage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadMessage, setUploadMessage] = useState(null);

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
    <div className="container mx-auto mt-20 p-4">
      <Loader />
      <input type="file" onChange={onImageChange} />
      <button onClick={onImageUpload} disabled={!selectedImage}>
        Upload Image
      </button>
      {uploadMessage && <p>{uploadMessage}</p>}
      {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
    </div>
  );
}

export default AddImage;
