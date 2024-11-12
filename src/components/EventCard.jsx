import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div className="w-96 sm:w-80 md:w-80 h-fit lg:w-96 lg:h-fit border rounded-lg p-4 shadow-lg text-center">
        <img
          src={event.poster}
          alt="Event Image"
          className="w-80 sm:w-64 h-48 lg:w-80 lg:h-64 object-cover rounded-md mb-4 border-2 mx-auto"
        />
        <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
        <p className="text-gray-700 mb-2">{event.description}</p>
        <p className="text-gray-500">{event.date}</p>
        <Link to={`/event-description`} state={{ event }} className="text-blue-500 hover:underline">
          View Details
        </Link>
    </div>
  );
};

export default EventCard;