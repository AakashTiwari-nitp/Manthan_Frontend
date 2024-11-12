import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar"; // Import Navbar component
import Footer from "./Footer"; // Import Footer component

const EventDescription = () => {
  const location = useLocation();
  const { event } = location.state || {};

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Navbar />
      <div className="w-full h-fit bg-[#222] flex flex-col justify-center text-white">
        <div className="flex flex-col items-center justify-center text-white">
          <h1 className="text-3xl font-bold my-4">{event.name}</h1>
          <p className="text-md">{event.date}</p>
          <div className="flex p-10 gap-10">
            <img
              src={event.poster}
              alt="Event Poster"
              className="w-64 h-64 object-cover rounded-md mb-4 border-2 mx-auto"
            />
            <p className="w-4/5 text-lg mb-4 p-3">
              {event.detailedDescription}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EventDescription;
