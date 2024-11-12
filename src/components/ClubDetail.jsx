import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import ClubJoin from "./ClubJoin";
import ClubHome from "./ClubHome";
import ClubAbout from "./ClubAbout";
import Navbar from "./Navbar";
import ClubEvents from "./ClubEvent";
import ClubMembers from "./ClubMember";
import Footer from "./Footer";
import Gallery from "./Gallery";

const ClubDetail = () => {
  const { name } = useParams(); // Retrieve the club name from the URL params

  return (
    <div>
      <Navbar />
      {/* Main Routes */}
      <Routes>
        <Route path="/" element={<ClubHome />} />
        <Route path="about" element={<ClubAbout />} />
        <Route path="events" element={<ClubEvents />} />
        <Route path="members" element={<ClubMembers />} />
        <Route path="join" element={<ClubJoin />} />
        <Route path="gallery" element={<Gallery />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default ClubDetail;
