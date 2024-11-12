import React from 'react';
import { Link } from 'react-router-dom';

const ClubCard = ({ club }) => {
  return (
    <div className="border rounded-lg p-4 shadow-lg">
      <img src={club.poster} alt={club.name} className="w-full h-48 object-cover rounded-md mb-4" />
      <h2 className="text-xl font-semibold mb-2">{club.name}</h2>
      <p className="text-gray-700 mb-4">{club.description}</p>
      <Link to={`/clubs/${club.name}`} className="text-blue-500 hover:underline">View Details</Link>
    </div>
  );
};


export default ClubCard;