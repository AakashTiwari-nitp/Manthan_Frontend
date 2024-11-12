import React, { useState, useEffect } from "react";
import ClubCard from "./ClubCard";
import { Link } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { MdCloseFullscreen } from "react-icons/md";
import logo from "../assets/logo.png";

const Homepage = () => {
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for user data in local storage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setIsLoggedIn(true);
    }
  }, []);

  // Fetch clubs data from backend
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch("https://manthan-backend-7qm5.onrender.com/get-clubs"); // Update with your backend URL
        if (!response.ok) {
          throw new Error("Failed to fetch clubs.");
        }
        const data = await response.json();
        setClubs(data.clubs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  const handleMenuClick = () => {
    setShow(!show);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-gray-800 h-fit py-4 relative">
        <div className="px-4 md:px-8 lg:px-16 mx-auto flex justify-between items-center">
          <div className="h-10 w-10">
            <img src={logo} alt="img" className="cover" />
          </div>
          <div className="hidden md:flex gap-5 lg:gap-10 xl:gap-16 text-md">
            <Link to="/" className="text-white">
              Home
            </Link>
            {isLoggedIn ? (
              <Link to="/add-club" className="text-white">
                Add Club
              </Link>
            ) : (
              <>
                <Link to="/signup" className="text-white">
                  SignUp
                </Link>
                <Link to="/login" className="text-white">
                  Login
                </Link>
              </>
            )}
          </div>
          <button className="md:hidden text-white" onClick={handleMenuClick}>
            <CiMenuFries size={24} />
          </button>
        </div>
        <div
          className={`w-48 z-10 fixed top-0 right-0 h-fit bg-gray-800 transition-transform transform ${
            show ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
        >
          <button className="text-white p-4" onClick={handleMenuClick}>
            <MdCloseFullscreen size={24} />
          </button>
          <Link
            to="/"
            className="block text-white py-2 px-4"
            onClick={handleMenuClick}
          >
            Home
          </Link>
          {isLoggedIn ? (
            <Link
              to="/add-club"
              className="block text-white py-2 px-4"
              onClick={handleMenuClick}
            >
              Add Club
            </Link>
          ) : (
            <>
              <Link
                to="/signup"
                className="block text-white py-2 px-4"
                onClick={handleMenuClick}
              >
                SignUp
              </Link>
              <Link
                to="/login"
                className="block text-white py-2 px-4"
                onClick={handleMenuClick}
              >
                Login
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">College Clubs</h1>
        
        {/* Loading and Error States */}
        {loading && <p>Loading clubs...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Club Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {!loading && !error && clubs.map((club) => (
            <ClubCard
              key={club._id}
              club={{
                id: club._id,
                name: club.name,
                description: club.club_message,
                poster: club.club_poster, // Update with club poster URL
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
