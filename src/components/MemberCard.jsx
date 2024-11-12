import React from "react";


const MemberCard = ({ member }) => {

  console.log("Member Image URL:", member.image);
  console.log("Member Name:", member.name);

  return (
    <div className="border-2 border-black rounded-lg p-4 shadow-lg h-fit w-64 text-center hover:shadow-zinc-800 hover:shadow-xl hover:scale-105">
      <img
        src={member.image}
        alt="name"
        className=" border-2  w-48 h-48 object-cover rounded-md mb-4 mx-auto"
      />
      <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
      <p className="text-white">{member.role}</p>
    </div>
  );
};

export default MemberCard;
