import React, { useCallback, useState } from "react";
import { FaEye } from "react-icons/fa";
import { GrFormViewHide } from "react-icons/gr";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const { name, email, password } = formData;

    if (!name || !email || !password) {
      setMessage("All fields are required.");
      return;
    }

    try {
      // Send data to backend API using fetch
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Sending form data in the body
      });

      // Parse response
      const result = await response.json();

      if (response.ok) {
        if (result.status) {
          setMessage("Admin created successfully. Please add a club.");
           // Save the login information (e.g., token or user details) to localStorage
        localStorage.setItem("authToken", result.token); // Assuming `token` is returned
        localStorage.setItem("user", JSON.stringify(result.admin)); // Assuming `admin` details are returned
          setFormData({
            name: "",
            email: "",
            password: "",
          }); // Clear form data
          window.location.href = "/";
        } else {
          setMessage(result.message);
        }
      } else {
        setMessage("Failed to create admin: " + result.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("Internal server error. Please try again later.");
    }
  };

  const [showpassword, setShowPassword] = useState(false);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log(container);
  }, []);

  return (
    <div className="bg-[#111] w-full h-screen flex items-center justify-center relative">
      <Particles
        className="-z-1 absolute inset-0"
        id="tsparticles"
        init={particlesInit}
        options={{
          autoPlay: true,
          background: {
            color: {
              value: "#111",
            },
          },
          particles: {
            color: {
              value: "#fff",
            },
            move: {
              angle: {
                offset: 0,
                value: 90,
              },
              decay: 0,
              direction: "bottom",
              drift: 0,
              enable: true,
              speed: 2,
            },
            number: {
              density: {
                enable: true,
                area: 1000,
                factor: 5000,
              },
              limit: 0,
              value: 400,
            },
            size: {
              value: 10,
              random: true,
              anim: {
                enable: false,
                speed: 200,
                size_min: 0.1,
                sync: false,
              },
            },
          },
        }}
      />

      <div className="bg-gray-800 w-96 h-fit rounded-lg p-5 z-50 shadow-lg shadow-gray-700">
        <h1 className="text-white text-center text-3xl mb-4">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col p-4">
            <label htmlFor="name" className="text-white mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="p-2 rounded-md bg-gray-900 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
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
              className="p-2 rounded-md bg-gray-900 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col p-4">
            <label htmlFor="password" className="text-white mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showpassword ? "text" : "password"}
                name="password"
                id="password"
                className="p-2 rounded-md bg-gray-900 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all w-full"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!showpassword)}
              >
                {showpassword ? <GrFormViewHide /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="flex justify-center p-4">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md w-full transition-all shadow-md shadow-blue-500"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="text-center mt-4 text-white">
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Signup;
