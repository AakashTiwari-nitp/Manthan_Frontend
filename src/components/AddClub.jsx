import React, { useCallback, useState } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const AddClub = () => {
  const storedEmail = JSON.parse(localStorage.getItem("user")).email;

  const [formData, setFormData] = useState({
    email: storedEmail, // Initialize email with the value from local storage
    name: "",
    club_message: "",
    club_poster: "",
    pi_name: "",
    pi_message: "",
    about: "",
    gallery: [],
    members: [{ name: "", role: "" }],
    events: [
      {
        event_name: "",
        event_date: "",
        event_details: "",
        event_poster: "",
        event_detailedDescription: "",
      },
    ],
    social_links: { facebook: "", twitter: "", instagram: "" },
  });

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newData = { ...prevData };
      const nameParts = name.split(".");

      if (nameParts.length === 1) {
        newData[name] = value;
      } else if (nameParts[0] === "social_links") {
        newData.social_links[nameParts[1]] = value;
      } else if (nameParts[0] === "members") {
        const index = parseInt(nameParts[1], 10);
        newData.members[index] = {
          ...newData.members[index],
          [nameParts[2]]: value,
        };
      } else if (nameParts[0] === "events") {
        const index = parseInt(nameParts[1], 10);
        newData.events[index] = {
          ...newData.events[index],
          [nameParts[2]]: value,
        };
      }
      return newData;
    });
  };

  const handleAddMember = () => {
    setFormData((prevData) => ({
      ...prevData,
      members: [...prevData.members, { name: "", role: "" }],
    }));
  };

  const handleAddEvent = () => {
    setFormData((prevData) => ({
      ...prevData,
      events: [
        ...prevData.events,
        {
          event_name: "",
          event_date: "",
          event_details: "",
          event_poster: "",
          event_detailedDescription: "",
        },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/add-club", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.status) {
        alert("Club added successfully!");
        setFormData({
          email: storedEmail, // Reset with the email from local storage
          name: "",
          club_message: "",
          club_poster: "",
          pi_name: "",
          pi_message: "",
          about: "",
          gallery: [],
          members: [{ name: "", role: "" }],
          events: [
            {
              event_name: "",
              event_date: "",
              event_details: "",
              event_poster: "",
              event_detailedDescription: "",
            },
          ],
          social_links: { facebook: "", twitter: "", instagram: "" },
        });
      } else {
        alert(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("Failed to add club. Please try again later.");
    }
  };

  return (
    <div className="bg-[#111] w-full h-fit flex items-center justify-center relative">
      <Particles
        className="-z-1 absolute inset-0"
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "#111" } },
          particles: {
            color: { value: "#fff" },
            move: { direction: "bottom", speed: 2, enable: true },
            number: { density: { enable: true, area: 1000 }, value: 400 },
            size: { value: 10, random: true },
          },
        }}
      />

      <div className="bg-gray-800 w-11/12 max-w-3xl rounded-lg p-5 z-50 shadow-lg shadow-gray-700 m-5">
        <h1 className="text-white text-center text-3xl mb-4">Add Club</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col p-4">
            <label htmlFor="name" className="text-white mb-2">
              Club Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="p-2 rounded-md bg-gray-900 text-white"
            />
          </div>
          <div className="flex flex-col p-4">
            <label htmlFor="club_message" className="text-white mb-2">
              Club Message
            </label>
            <input
              type="text"
              name="club_message"
              value={formData.club_message}
              onChange={handleInputChange}
              className="p-2 rounded-md bg-gray-900 text-white"
            />
          </div>
          <div className="flex flex-col p-4">
            <label htmlFor="club_poster" className="text-white mb-2">
              Club Poster URL
            </label>
            <input
              type="text"
              name="club_poster"
              value={formData.club_poster}
              onChange={handleInputChange}
              className="p-2 rounded-md bg-gray-900 text-white"
            />
          </div>

          {/* PI Information */}
          <div className="flex flex-col p-4">
            <label htmlFor="pi_name" className="text-white mb-2">
              PI Name
            </label>
            <input
              type="text"
              name="pi_name"
              value={formData.pi_name}
              onChange={handleInputChange}
              className="p-2 rounded-md bg-gray-900 text-white"
            />
          </div>
          <div className="flex flex-col p-4">
            <label htmlFor="pi_message" className="text-white mb-2">
              PI Message
            </label>
            <input
              type="text"
              name="pi_message"
              value={formData.pi_message}
              onChange={handleInputChange}
              className="p-2 rounded-md bg-gray-900 text-white"
            />
          </div>

          {/* Social Links */}
          <div className="flex flex-col p-4">
            <label className="text-white mb-2">Social Links</label>
            {["facebook", "twitter", "instagram"].map((platform) => (
              <input
                key={platform}
                type="text"
                name={`social_links.${platform}`} // Updated name attribute
                placeholder={`${platform} URL`}
                value={formData.social_links[platform]}
                onChange={handleInputChange}
                className="p-2 rounded-md bg-gray-900 text-white mb-2"
              />
            ))}
          </div>

          {/* Members Section */}
          <div className="flex flex-col p-4">
            <label className="text-white mb-2">Members</label>
            {formData.members.map((member, index) => (
              <div key={index} className="flex flex-row space-x-2 mb-2">
                <input
                  type="text"
                  name={`members.${index}.name`}
                  placeholder="Name"
                  value={member.name}
                  onChange={handleInputChange}
                  className="p-2 rounded-md bg-gray-900 text-white"
                />
                <input
                  type="text"
                  name={`members.${index}.role`}
                  placeholder="Role"
                  value={member.role}
                  onChange={handleInputChange}
                  className="p-2 rounded-md bg-gray-900 text-white"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddMember}
              className="bg-blue-600 text-white p-2 rounded-md mt-2"
            >
              Add Member
            </button>
          </div>

          {/* Events Section */}
          <div className="flex flex-col p-4">
            <label className="text-white mb-2">Events</label>
            {formData.events.map((event, index) => (
              <div key={index} className="flex flex-col mb-4">
                <input
                  type="text"
                  name={`events.${index}.event_name`}
                  placeholder="Event Name"
                  value={event.event_name}
                  onChange={handleInputChange}
                  className="p-2 rounded-md bg-gray-900 text-white mb-2"
                />
                <input
                  type="date"
                  name={`events.${index}.event_date`}
                  placeholder="Event Date"
                  value={event.event_date}
                  onChange={handleInputChange}
                  className="p-2 rounded-md bg-gray-900 text-white mb-2"
                />
                <input
                  type="text"
                  name={`events.${index}.event_details`}
                  placeholder="Event Details"
                  value={event.event_details}
                  onChange={handleInputChange}
                  className="p-2 rounded-md bg-gray-900 text-white mb-2"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center p-4">
            <button className="bg-blue-600 text-white p-2 rounded-md w-full transition-all shadow-md">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClub;
