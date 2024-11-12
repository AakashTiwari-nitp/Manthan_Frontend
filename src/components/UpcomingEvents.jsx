import React, { useEffect, useState } from "react";
import EventCard from "./EventCard"; // Assuming you have an EventCard component
import { useParams } from "react-router-dom";

const UpcomingEvents = () => {
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

  if (loading) return <p>Loading events...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Check if the club has events to render
  const events = club ? club.events : [];

  return (
    <div className="w-full h-fit bg-[#111] flex gap-4 sm:gap-12 md:gap-20 lg:gap-16 flex-wrap py-5 px-2 sm:p-5 lg:p-10 justify-center lg:justify-around">
      {events.length > 0 ? (
        events.map((event) => (
          <EventCard key={event._id} event={event} /> // Pass event data to EventCard
        ))
      ) : (
        <p>No events available for this club.</p>
      )}
    </div>
  );
};

export default UpcomingEvents;
