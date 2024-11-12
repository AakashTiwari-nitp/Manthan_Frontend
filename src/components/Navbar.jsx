import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CiMenuFries } from "react-icons/ci";
import { MdCloseFullscreen } from "react-icons/md";

const Navbar = () => {
  const { name } = useParams();
  const [show, setShow] = useState(false);

  const handleMenuClick = () => {
    setShow(!show);
  };

  return (
    <nav className="bg-gray-800 h-fit py-4 relative">
      <div className="px-4 md:px-8 lg:px-16 mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Club Logo</div>
        <div className="hidden md:flex gap-5 lg:gap-10 xl:gap-16 text-md">
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