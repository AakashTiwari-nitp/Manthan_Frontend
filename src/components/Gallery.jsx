import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Gallery() {
  const { name } = useParams(); // Get the 'name' parameter from the URL
  const [club, setClub] = useState(null); // State to store club data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const response = await fetch(`https://manthan-backend-7qm5.onrender.com/get-club/${name}`);
        if (!response.ok) {
          throw new Error("Failed to fetch club details.");
        }
        const data = await response.json();
        setClub(data.club); // Set club data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClubData();
  }, [name]);

  const placeholderImage = "https://via.placeholder.com/150"; // Placeholder image link

  if (loading) return <p>Loading gallery...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Ensure the gallery has exactly 9 images by filling missing spots with placeholder images
  const totalImages = 9;
  const galleryImages = club?.gallery || [];
  const paddedGalleryImages = [
    ...galleryImages,
    ...Array(totalImages - galleryImages.length).fill(placeholderImage)
  ];

  return (
    <div className="w-full h-fit flex flex-col bg-[#111] text-white">
      <div
        className="w-full h-fit bg-[url('https://res.cloudinary.com/dnbutfdy7/image/upload/v1719682809/Events/MUN/DSC_0418_lclzcs.jpg')] p-6 bg-[#111] flex flex-col gap-2 sm:gap-3"
      >
        <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="flex w-full sm:w-[33%] flex-row sm:flex-col gap-2 sm:gap-3">
            <div className="w-[55vw] sm:w-full h-48 sm:h-80 rounded-lg overflow-hidden">
              <img
                src={paddedGalleryImages[0]}
                className="w-full h-full object-cover"
                alt="Gallery image"
              />
            </div>
            <div className="w-[45vw] sm:w-full h-48 sm:h-64 rounded-lg overflow-hidden">
              <img
                src={paddedGalleryImages[1]}
                className="w-full h-full object-cover"
                alt="Gallery image"
              />
            </div>
          </div>
          <div className="flex w-full sm:w-[33%] flex-row sm:flex-col gap-2 sm:gap-3">
            <div className="w-[45vw] sm:w-full h-48 sm:h-64 rounded-lg overflow-hidden">
              <img
                src={paddedGalleryImages[2]}
                className="w-full h-full object-cover"
                alt="Gallery image"
              />
            </div>
            <div className="w-[55vw] sm:w-full h-48 sm:h-80 rounded-lg overflow-hidden">
              <img
                src={paddedGalleryImages[3]}
                className="w-full h-full object-cover"
                alt="Gallery image"
              />
            </div>
          </div>
          <div className="flex w-full sm:w-[33%] flex-row sm:flex-col gap-2 sm:gap-3">
            <div className="w-[55vw] sm:w-full h-48 sm:h-80 rounded-lg overflow-hidden">
              <img
                src={paddedGalleryImages[4]}
                className="w-full h-full object-cover"
                alt="Gallery image"
              />
            </div>
            <div className="w-[45vw] sm:w-full h-48 sm:h-64 rounded-lg overflow-hidden">
              <img
                src={paddedGalleryImages[5]}
                className="w-full h-full object-cover"
                alt="Gallery image"
              />
            </div>
          </div>
        </div>
        <div className="w-full h-[50vw] rounded-lg overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={paddedGalleryImages[6]}
            alt="Gallery image"
          />
        </div>
        <div className="w-full flex sm:gap-3">
          <div className="w-[50%] h-[40vw] rounded-lg overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={paddedGalleryImages[7]}
              alt="Gallery image"
            />
          </div>
          <div className="w-[50%] h-[40vw] rounded-lg overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={paddedGalleryImages[8]}
              alt="Gallery image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
