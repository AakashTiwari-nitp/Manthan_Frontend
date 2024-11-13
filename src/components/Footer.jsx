import React, { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";  // Import the email icon
import { Link, useParams } from "react-router-dom";

const Footer = () => {
  const { name } = useParams(); // Get dynamic club name from the URL
  const [club, setClub] = useState(null); // Store club data
  const [show, setShow] = useState(false);

  const handleMenuClick = () => {
    setShow(!show);
  };

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const response = await fetch(
          `https://manthan-backend-7qm5.onrender.com/get-club/${name}`
        );
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
    <>
      <div className="mx-auto flex-col md:flex md:flex-row bg-gray-800 bg-gradient-to-t text-white max-w-screen px-6 py-1 md:py-2 md:justify-between h-fit">
        <div className="flex my-2 items-center justify-center flex-col">
          <img src={club?.club_poster} alt="Logo" width={80} height={80} />
          <h1 className="font-bold font-colona">FOLLOW US</h1>
          <div className="flex flex-row justify-center space-x-4 mt-2">
            {/* Render social media links dynamically */}
            {club?.social_links?.facebook && (
              <a href={club.social_links.facebook} target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-white w-6 h-6 md:w-8 md:h-8" />
              </a>
            )}
            {club?.social_links?.linkedin && (
              <a href={club.social_links.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-white w-6 h-6 md:w-8 md:h-8" />
              </a>
            )}
            {club?.social_links?.instagram && (
              <a href={club.social_links.instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-white w-6 h-6 md:w-8 md:h-8" />
              </a>
            )}
            {/* Add Twitter icon */}
            {club?.social_links?.twitter && (
              <a href={club.social_links.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-white w-6 h-6 md:w-8 md:h-8" />
              </a>
            )}
            {/* Add Mail icon */}
            {club?.Club_email && (
              <a href={`mailto:${club.Club_email}`} target="_blank" rel="noopener noreferrer">
                <MdOutlineAlternateEmail className="text-white w-6 h-6 md:w-8 md:h-8" />
              </a>
            )}
          </div>
        </div>
        <div className="flex flex-col text-white py-4">
          <h1 className="font-bold text-center font-colona">USEFUL LINKS</h1>
          <div className="flex text-center md:text-start text-sm flex-col gap-2 mt-2">
            {/* Use dynamic club name in links */}
            <Link to={`/clubs/${name}`} onClick={handleMenuClick}>
              HOME
            </Link>
            <Link to={`/clubs/${name}/about`} onClick={handleMenuClick}>
              ABOUT
            </Link>
            <Link to={`/clubs/${name}/events`} onClick={handleMenuClick}>
              EVENTS
            </Link>
            <Link to={`/clubs/${name}/members`} onClick={handleMenuClick}>
              MEMBERS
            </Link>
            <Link to={`/clubs/${name}/gallery`} onClick={handleMenuClick}>
              Gallery
            </Link>
          </div>
        </div>
        <div className="flex flex-col text-white py-4 items-center text-center">
          <h1 className="font-bold font-colona">CONTACT US</h1>
          <div className="flex flex-row justify-between">
            <a href="mailto:info@nitp.ac.in" target="blank" className="my-2">
              <IoIosMail className="text-white w-6 h-6 md:w-8 md:h-8" />
            </a>
            <a href="https://www.google.com/maps/place/National+Institute+of+Technology,+Patna/@25.6207961,85.1719948,17z/data=!3m1!4b1!4m6!3m5!1s0x39ed58dce6732867:0x4059f39a1ac82f06!8m2!3d25.6207961!4d85.1719948!16zL20vMDl2OGJq?entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D">
              <FaLocationDot className="text-white w-6 h-6 md:w-8 md:h-8" />
            </a>
          </div>
          <div className="text-white text-xs">
            <p className="mb-1 font-Antonio">
              Student Activity Centre (SAC), NIT Patna
            </p>
            <p>Ashok Rajpath, Patna, Bihar - 800005</p>
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-800 text-white text-center text-base mb-1">
        &copy; {club?.name} NIT Patna 2024
      </div>
    </>
  );
};

export default Footer;
