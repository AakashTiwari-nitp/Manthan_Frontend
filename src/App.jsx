import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import ClubDetail from "./components/ClubDetail";
import Navbar from "./components/Navbar";
import EventDescription from "./components/EventDescription";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AddClub from "./components/AddClub";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-club" element={<AddClub />} />
        <Route path="/clubs/:name/*" element={<ClubDetail />} />
        <Route path="/event-description" element={<EventDescription />} />{" "}
        {/* Add this route */}
      </Routes>
    </>
  );
};

export default App;
