import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";

const Footer = () => {
  const { name } = useParams(); // Get dynamic club name from the URL

  return (
    <>
      <div className="mx-auto flex-col md:flex md:flex-row bg-[#111] bg-gradient-to-t text-white max-w-screen px-6 py-1 md:py-2 md:justify-between h-fit">
        <div className="flex my-2 items-center justify-center flex-col">
          <img src="" alt="Logo" width={120} height={120} />
          <h1 className="font-bold font-colona">FOLLOW US</h1>
          <div className="flex flex-row justify-center space-x-4 mt-2">
            <a href="https://www.facebook.com/" target="blank">
              <FaFacebook className="text-white w-6 h-6 md:w-8 md:h-8" />
            </a>
            <a href="https://www.linkedin.com/" target="blank">
              <FaLinkedin className="text-white w-6 h-6 md:w-8 md:h-8" />
            </a>
            <a href="https://www.instagram.com/" target="blank">
              <FaInstagram className="text-white w-6 h-6 md:w-8 md:h-8" />
            </a>
          </div>
        </div>
        <div className="flex flex-col text-white py-4">
          <h1 className="font-bold text-center font-colona">USEFUL LINKS</h1>
          <div className="flex text-center md:text-start text-sm flex-col gap-2 mt-2">
            {/* Use dynamic club name in links */}
            <Link to={`/clubs/${name}`} target="blank">
              HOME
            </Link>
            <Link to={`/clubs/${name}/about`} target="blank">
              ABOUT
            </Link>
            <Link to={`/clubs/${name}/events`} target="blank">
              EVENTS
            </Link>
            <Link to={`/clubs/${name}/members`} target="blank">
              MEMBERS
            </Link>
            <Link to={`/clubs/${name}/gallery`} target="blank">
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
      <div className="w-full bg-[#111] text-white text-center text-base mb-1">
        &copy; Expresso NIT Patna 2024
      </div>
    </>
  );
};

export default Footer;
