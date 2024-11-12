import React, { useEffect, useState } from "react";
import UpcomingEvents from "./UpcomingEvents";
import { useParams } from "react-router-dom";

const ClubEvents = () => {

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

  return (
    <div className="p-6 w-full bg-[#111] text-white">
      <div className="min-h-300 md:h-[45vw] lg:h-[40vw] w-full text-gray-100 text-center flex items-center justify-center bg-[url(https://res.cloudinary.com/dnbutfdy7/image/upload/v1719665023/expresso/eventbg_zip57y.png)] bg-cover bg-center min-h-[400px]">
        <div className="text-[16vw] relative z-5 font-antonio text-white">
          EVENTS
        </div>
      </div>
      <UpcomingEvents />
    </div>
  );
};

export default ClubEvents;
