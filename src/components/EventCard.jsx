// EventCard.js
import React from "react";
import { Link, Route, Routes } from "react-router-dom";

const EventCard = ({ event }) => {

  return (
    <div className="w-96 sm:w-80 md:w-80 h-fit lg:w-96 lg:h-fit border rounded-lg p-4 shadow-lg text-center bg-white">
      {/* Event Poster */}
      <img
        src={event.event_poster} // Use the event's poster URL here
        alt={`${event.event_name} Poster`}
        className="w-80 sm:w-64 h-48 lg:w-80 lg:h-64 object-cover rounded-md mb-4 border-2 mx-auto"
      />
      
      {/* Event Title */}
      <h3 className="text-xl font-semibold mb-2">{event.event_name}</h3>
      
      {/* Event Description */}
      <p className="text-gray-700 mb-2">{event.event_details}</p>
      
      {/* Event Date */}
      <p className="text-gray-500 mb-2">{new Date(event.event_date).toLocaleDateString()}</p>
      


    </div>
  );
};

export default EventCard;
