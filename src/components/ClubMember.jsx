import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MemberCard from "./MemberCard";

const ClubMembers = () => {
  const { name } = useParams(); // Get the 'name' parameter from the URL
  const [club, setClub] = useState(null); // State to store club data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

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
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClubData();
  }, [name]);

  if (loading) return <p>Loading members...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <div className="w-full h-screen overflow-hidden bg-[#111] text-white">
        <div
          className="absolute w-[100%] h-full bg-cover bg-center overflow-hidden"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dnbutfdy7/image/upload/v1719665026/expresso/teambg_k9zlxh.jpg')`,
          }}
        >
          <h1 className="text-center absolute top-[30%] left-1/2 text-9xl -translate-x-1/2 translate-y-1/2">
            TEAM
          </h1>
        </div>
        <p className="text-gray-700 text-center mt-4">This is the members page of the club.</p>
      </div>

      <div className="w-full h-fit bg-slate-700 flex gap-10 py-5 px-10 flex-wrap justify-evenly">
        {club && club.members && club.members.length > 0 ? (
          club.members.map((member) => (
            <MemberCard key={member._id} member={member} /> // Assuming '_id' is the unique identifier for each member
          ))
        ) : (
          <p>No members found.</p>
        )}
      </div>
    </>
  );
};

export default ClubMembers;
