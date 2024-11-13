import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ClubAbout = () => {
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

  if (loading) {
    return (
      <div className="p-6 w-full h-fit bg-[#111] text-white">
        <h1 className="text-3xl font-bold mb-4 text-yellow-100">About the Club</h1>
        <p className="text-white py-3 px-5">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 w-full h-fit min-h-screen bg-[#111] text-white">
        <h1 className="text-3xl font-bold mb-4 text-yellow-100">About the Club</h1>
        <p className="text-white py-3 px-5">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 w-full h-fit min-h-[60vh] bg-[#111] text-white z-50">
      <h1 className="text-3xl font-bold mb-4 text-yellow-100">About the Club</h1>
      <div className="text-white py-3 px-5 z-5">
        {/* Display each element in the 'about' array */}
        {club?.about && club.about.length > 0 ? (
          club.about.map((item, index) => (
            <p key={index} className="py-2">{item}</p>
          ))
        ) : (
          <p>No description available.</p>
        )}
      </div>
    </div>
  );
};

export default ClubAbout;
