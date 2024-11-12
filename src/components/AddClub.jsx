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
    club_logo: "",
    pi_name: "",
    pi_message: "",
    pi_image: "", // Add PI image URL
    about: "", // Add about text
    gallery: [], // Add gallery URLs
    members: [{ name: "", role: "", image_url: "" }], // Add image_url for each member
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
      members: [...prevData.members, { name: "", role: "", image_url: "" }],
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
      const response = await fetch("https://manthan-backend-7qm5.onrender.com/add-club", {
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
          club_logo: "",
          pi_name: "",
          pi_message: "",
          pi_image: "",
          about: "",
          gallery: [],
          members: [{ name: "", role: "", image_url: "" }],
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
          {/* Club Name */}
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

          {/* Club Message */}
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

          {/* Club Poster URL */}
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

          {/* Club Logo */}
          <div className="flex flex-col p-4">
            <label htmlFor="club_logo" className="text-white mb-2">
              Club Logo URL
            </label>
            <input
              type="text"
              name="club_logo"
              value={formData.club_logo}
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

          {/* PI Image */}
          <div className="flex flex-col p-4">
            <label htmlFor="pi_image" className="text-white mb-2">
              PI Image URL
            </label>
            <input
              type="text"
              name="pi_image"
              value={formData.pi_image}
              onChange={handleInputChange}
              className="p-2 rounded-md bg-gray-900 text-white"
            />
          </div>

          {/* About Section */}
          <div className="flex flex-col p-4">
            <label htmlFor="about" className="text-white mb-2">
              About the Club
            </label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              className="p-2 rounded-md bg-gray-900 text-white"
            />
          </div>

          {/* Gallery Section */}
          <div className="flex flex-col p-4">
            <label htmlFor="gallery" className="text-white mb-2">
              Gallery Images (URLs)
            </label>
            <textarea
              name="gallery"
              value={formData.gallery.join("\n")}
              onChange={(e) => {
                const galleryUrls = e.target.value.split("\n");
                setFormData((prevData) => ({
                  ...prevData,
                  gallery: galleryUrls,
                }));
              }}
              className="p-2 rounded-md bg-gray-900 text-white"
            />
          </div>

          {/* Members */}
          <div>
            <h2 className="text-white">Members</h2>
            {formData.members.map((member, index) => (
              <div key={index} className="flex flex-col p-4">
                <label className="text-white">Member {index + 1} Name</label>
                <input
                  type="text"
                  name={`members.${index}.name`}
                  value={member.name}
                  onChange={handleInputChange}
                  className="p-2 rounded-md bg-gray-900 text-white"
                />
                <label className="text-white">Member {index + 1} Role</label>
                <input
                  type="text"
                  name={`members.${index}.role`}
                  value={member.role}
                  onChange={handleInputChange}
                  className="p-2 rounded-md bg-gray-900 text-white"
                />
                <label className="text-white">Member {index + 1} Image URL</label>
                <input
                  type="text"
                  name={`members.${index}.image_url`}
                  value={member.image_url}
                  onChange={handleInputChange}
                  className="p-2 rounded-md bg-gray-900 text-white"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddMember}
              className="p-2 bg-blue-500 text-white rounded-md"
            >
              Add Member
            </button>
          </div>

          {/* Events */}
          <div>
            <h2 className="text-white">Events</h2>
            {formData.events.map((event, index) => (
              <div key={index} className="flex flex-col p-4">
                <label className="text-white">Event Name</label>
                <input
                  type="text"
                  name={`events.${index}.event_name`}
                  value={event.event_name}
                  onChange={handleInputChange}
                  className="p-2 rounded-md bg-gray-900 text-white"
                />
                <label className="text-white">Event Date</label>
                <input
                  type="date"
                  name={`events.${index}.event_date`}
                  value={event.event_date}
                  onChange={handleInputChange}
                  className="p-2 rounded-md bg-gray-900 text-white"
                />
                <label className="text-white">Event Details</label>
                <input
                  type="text"
                  name={`events.${index}.event_details`}
                  value={event.event_details}
                  onChange={handleInputChange}
                  className="p-2 rounded-md bg-gray-900 text-white"
                />
                <label className="text-white">Event Poster URL</label>
                <input
                  type="text"
                  name={`events.${index}.event_poster`}
                  value={event.event_poster}
                  onChange={handleInputChange}
                  className="p-2 rounded-md bg-gray-900 text-white"
                />
                <label className="text-white">Event Description</label>
                <textarea
                  name={`events.${index}.event_detailedDescription`}
                  value={event.event_detailedDescription}
                  onChange={handleInputChange}
                  className="p-2 rounded-md bg-gray-900 text-white"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddEvent}
              className="p-2 bg-blue-500 text-white rounded-md"
            >
              Add Event
            </button>
          </div>

          {/* Social Links */}
          <div>
            <h2 className="text-white">Social Links</h2>
            <div className="flex flex-col">
              <label className="text-white">Facebook URL</label>
              <input
                type="text"
                name="social_links.facebook"
                value={formData.social_links.facebook}
                onChange={handleInputChange}
                className="p-2 rounded-md bg-gray-900 text-white"
              />
              <label className="text-white">Twitter URL</label>
              <input
                type="text"
                name="social_links.twitter"
                value={formData.social_links.twitter}
                onChange={handleInputChange}
                className="p-2 rounded-md bg-gray-900 text-white"
              />
              <label className="text-white">Instagram URL</label>
              <input
                type="text"
                name="social_links.instagram"
                value={formData.social_links.instagram}
                onChange={handleInputChange}
                className="p-2 rounded-md bg-gray-900 text-white"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-2 bg-green-500 text-white rounded-md mt-4"
          >
            Add Club
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClub;
