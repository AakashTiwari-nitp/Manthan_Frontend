import React from "react";
import EventCard from "./EventCard";

const sampleEvents = [
  {
    id: 1,
    name: "Science Fair",
    description: "A fair for science enthusiasts.",
    detailedDescription: "This is a science fair for all the science enthusiasts out there. Come and join us for a day full of science. This event is open to all students and faculty members.",
    date: "2022-10-10",
    poster: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Art Exhibition",
    description: "An exhibition for art lovers.",
    detailedDescription: "This is an art exhibition for all the art lovers out there. Come and join us for a day full of art. This event is open to all students and faculty members.",
    date: "2022-10-20",
    poster: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Music Concert",
    description: "A concert for music lovers.",
    detailedDescription: "This is a music concert for all the music lovers out there. Come and join us for a day full of music. This event is open to all students and faculty members.",
    date: "2022-10-30",
    poster: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Dance Show",
    detailedDescription: "This is a dance show for all the dance enthusiasts out there. Come and join us for a day full of dance. This event is open to all students and faculty members.",
    description: "A show for dance enthusiasts.",
    date: "2022-11-10",
    poster: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    name: "Literary Fest",
    description: "A fest for literature lovers.",
    detailedDescription: "This is a literary fest for all the literature lovers out there. Come and join us for a day full of literature. This event is open to all students and faculty members",
    date: "2022-11-20",
    poster: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    name: "Photography Exhibition",
    description: "An exhibition for photography lovers.",
    detailedDescription: "This is a photography exhibition for all the photography lovers out there. Come and join us for a day full of photography. This event is open to all students and faculty members.",
    date: "2022-11-30",
    poster: "https://via.placeholder.com/150",
  },
];

const UpcomingEvents = () => {
  return (
    <div className="w-full h-fit bg-[#111] flex gap-4 sm:gap-12 md:gap-20 lg:gap-16 flex-wrap py-5 px-2 sm:p-5 lg:p-10 justify-center lg:justify-around">
      {sampleEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default UpcomingEvents;
