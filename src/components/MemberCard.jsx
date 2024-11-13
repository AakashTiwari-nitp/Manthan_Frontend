import React from "react";

const MemberCard = ({ member }) => {
  // Fallback image in case the member image is not available
  const fallbackImage = "https://via.placeholder.com/150";

  return (
    <div className="border-2 border-black rounded-lg p-4 shadow-lg h-fit w-64 text-center hover:shadow-zinc-800 hover:shadow-xl hover:scale-105">
      <img
        // If member.image exists, use it; otherwise, use fallbackImage
        src={member.image || fallbackImage}
        alt={member.name || "Member"}
        className="border-2 w-48 h-48 object-cover rounded-md mb-4 mx-auto"
      />
      <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
      <p className="text-white">{member.role}</p>
    </div>
  );
};

export default MemberCard;
