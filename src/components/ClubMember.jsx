import React from "react";
import MemberCard from "./MemberCard";

const members = [
  {
    id: 1,
    name: "John Doe",
    role: "President",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Jane Doe",
    role: "Vice President",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Alice",
    role: "Secretary",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Bob",
    role: "Treasurer",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    name: "Charlie",
    role: "Member",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    name: "David",
    role: "Member",
    image: "https://via.placeholder.com/150",
  },
];

const ClubMembers = () => {
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
        <p className="text-gray-700">This is the members page of the club.</p>
      </div>
      <div className="w-full h-fit bg-slate-700 flex gap-10 py-5 px-10 flex-wrap justify-evenly">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </>
  );
};

export default ClubMembers;
