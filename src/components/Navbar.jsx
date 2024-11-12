import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CiMenuFries } from "react-icons/ci";
import { MdCloseFullscreen } from "react-icons/md";

const Navbar = () => {
  const { name } = useParams(); // Get dynamic club name from the URL
  const [club, setClub] = useState(null); // Store club data
  const [show, setShow] = useState(false);

  const handleMenuClick = () => {
    setShow(!show);
  };

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
        console.error("Error fetching club data:", err);
      }
    };

    fetchClubData();
  }, [name]);

  return (
    <nav className="bg-gray-800 h-fit py-4 relative">
      <div className="px-4 md:px-8 lg:px-16 mx-auto flex justify-between items-center">
        {/* Display club poster as an image */}
        {club && club.club_poster && (
          <img
            src={club.club_poster}
            alt={`${club.name} Poster`}
            className="h-12 object-contain" // Adjust the size and fit as necessary
          />
        )}
        
        <div className="hidden md:flex gap-5 lg:gap-10 xl:gap-16 text-md">
          {/* Use dynamic club name in the navigation links */}
          <Link to={`/clubs/${name}`} className="text-white">Home</Link>
          <Link to={`/clubs/${name}/about`} className="text-white">About</Link>
          <Link to={`/clubs/${name}/events`} className="text-white">Events</Link>
          <Link to={`/clubs/${name}/members`} className="text-white">Members</Link>
          <Link to={`/clubs/${name}/gallery`} className="text-white">Gallery</Link>
          <Link to={`/clubs/${name}/join`} className="text-white">Join Us</Link>
        </div>
        <button className="md:hidden text-white" onClick={handleMenuClick}>
          <CiMenuFries size={24} />
        </button>
      </div>
      <div
        className={`w-48 z-10 fixed top-0 right-0 h-fit bg-gray-800 transition-transform transform ${
          show ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <button className="text-white p-4" onClick={handleMenuClick}>
          <MdCloseFullscreen size={24} />
        </button>
        {/* Use dynamic club name in the mobile navigation links */}
        <Link to={`/clubs/${name}`} className="block text-white py-2 px-4" onClick={handleMenuClick}>Home</Link>
        <Link to={`/clubs/${name}/about`} className="block text-white py-2 px-4" onClick={handleMenuClick}>About</Link>
        <Link to={`/clubs/${name}/events`} className="block text-white py-2 px-4" onClick={handleMenuClick}>Events</Link>
        <Link to={`/clubs/${name}/members`} className="block text-white py-2 px-4" onClick={handleMenuClick}>Members</Link>
        <Link to={`/clubs/${name}/gallery`} className="block text-white py-2 px-4" onClick={handleMenuClick}>Gallery</Link>
        <Link to={`/clubs/${name}/join`} className="block text-white py-2 px-4" onClick={handleMenuClick}>Join Us</Link>
      </div>
    </nav>
  );
};

export default Navbar;
