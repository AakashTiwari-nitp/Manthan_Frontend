import React, { useState, useCallback } from "react";

const ClubJoin = ({ clubName }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    branch: "",
    year: "",
    message: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        "https://your-backend-url.com/send-join-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setSuccess("Your request has been sent successfully!");
        setFormData({
          name: "",
          email: "",
          mobile: "",
          branch: "",
          year: "",
          message: "",
        });
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Failed to send request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#111] w-full h-fit flex items-center justify-center relative">
      <div className="w-full max-w-xl h-auto rounded-lg p-5 z-50 shadow-lg bg-[#333]">
        <h1 className="text-white text-center text-3xl mb-4">Join the Club</h1>
        {success && <div className="text-green-500 mb-4">{success}</div>}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col p-4">
          <div className="flex flex-col p-4">
            <label htmlFor="name" className="text-white mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="p-2 rounded-md bg-gray-900 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all w-full"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col p-4">
            <label htmlFor="email" className="text-white mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="p-2 rounded-md bg-gray-900 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all w-full"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col p-4">
            <label htmlFor="mobile" className="text-white mb-2">
              Mobile Number
            </label>
            <input
              type="number"
              name="mobile"
              id="mobile"
              className="p-2 rounded-md bg-gray-900 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all w-full"
              value={formData.mobile}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit mobile number"
            />
          </div>

          <div className="flex flex-col p-4">
            <label htmlFor="branch" className="text-white mb-2">
              Branch
            </label>
            <input
              type="text"
              name="branch"
              id="branch"
              className="p-2 rounded-md bg-gray-900 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all w-full"
              value={formData.branch}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col p-4">
            <label htmlFor="year" className="text-white mb-2">
              Year
            </label>
            <input
              type="text"
              name="year"
              id="year"
              className="p-2 rounded-md bg-gray-900 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all w-full"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col p-4">
            <label htmlFor="message" className="text-white mb-2">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              className="p-2 rounded-md bg-gray-900 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all w-full resize-none"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
            ></textarea>
          </div>

          <div className="flex justify-center p-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md w-full transition-all shadow-md shadow-blue-500"
              disabled={loading}
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClubJoin;
