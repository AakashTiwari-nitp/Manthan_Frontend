import React, { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import Gallery from "./Gallery";
import Footer from "./Footer";
import { useParams } from "react-router-dom"; // To access the club name from URL

const ClubHome = () => {
  const { name } = useParams(); // Get the club name from the URL
  const [club, setClub] = useState(null); // Store club data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [parentHeight, setParentHeight] = useState(500); // Initial height

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 500);
    };

    handleResize(); // Check initial window size
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/get-club/${name}`);
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

  useEffect(() => {
    if (showFullDescription) {
      setParentHeight(700);
    } else {
      setParentHeight(380);
    }
  }, [showFullDescription]);

  const handleReadMore = () => {
    setShowFullDescription(true);
  };

  const handleReadLess = () => {
    setShowFullDescription(false);
  };

  if (loading) return <p>Loading club details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const fullTextWithLineBreaks = club?.pi_message?.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line.trim()}
      <br />
    </React.Fragment>
  ));

  const shortText = club?.pi_message?.split(" ").slice(0, 120).join(" ") + "...";

  return (
    <>
      <div className="p-6 w-full bg-[#111] text-white">
        <div className="hero-section h-fit flex gap-2">
          <div className="w-1/2 h-full rounded-lg">
            <h1 className="text-3xl lg:text-5xl md:leading-normal xl:leading-loose p-5 font-['Gilroy']">
              In a dance between literature and art, lives become canvas where words and brush strokes create beauty that whispers still.
            </h1>
          </div>
          <div className="w-1/2 h-96 border-2 rounded-lg">
            <img src={club?.club_poster || "https://via.placeholder.com/150"} alt={club?.name} className="w-full h-full cover" />
          </div>
        </div>
        <div className="bg-black p-0 m-0 min-h-[400px] flex flex-col gap-y-4 justify-center w-full mt-10 rounded-lg">
          <div className="flex flex-col items-center lg:justify-start lg:items-start lg:ml-40 lg:z-10 gap-4 py-4">
            <div className="text-white">
              <span className="font-antonio text-xl md:text-[46px]">
                MESSAGE FROM OUR
              </span>
            </div>

            <div className="text-[#FEB952] text-xl md:text-[46px] md:mt-[-10px]">
              PROFESSOR INCHARGE
            </div>
            <div className="font-antonio text-md text-gray-200 md:text-[30px] md:pt-4 ">
              {club?.name}
            </div>
          </div>

          <div className="flex flex-row justify-center items-center relative lg:mt-[-9.5%] lg:ml-[70%] lg:z-10">
            <span>
              <img src="https://via.placeholder.com/150" width={200} height={180} alt="Professor Image" />
            </span>
            <span className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-16 sm:mr-48 md:mr-64 lg:mr-6">
              <a
                href={club?.social_links?.linkedin || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-white w-6 h-6" />
              </a>
            </span>
          </div>

          <div className="md:w-[66%] text-sm text-white m-4 p-4 overflow-auto lg:mx-36 lg:text-lg lg:backdrop-filter lg:backdrop-blur-md lg:mt-[-15%] lg:z-8 lg:pt-32 lg:rounded-md">
            <p>
              {isMobile && !showFullDescription ? shortText : fullTextWithLineBreaks}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClubHome;
