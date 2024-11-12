import React, { useCallback, useState } from "react";
import { FaEye } from "react-icons/fa";
import { GrFormViewHide } from "react-icons/gr";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const Login = () => {
  const [showpassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // To store success or error message

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log(container);
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage("Both email and password are required.");
      return;
    }

    try {
      // Send data to the backend via POST request
      const response = await fetch("https://manthan-backend-7qm5.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Sending email and password
      });

      const result = await response.json(); // Parse the response

      if (response.ok) {
        setMessage(result.message); // Success message from backend

        // Save the login information (e.g., token or user details) to localStorage
        localStorage.setItem("authToken", result.token); // Assuming `token` is returned
        localStorage.setItem("user", JSON.stringify(result.admin)); // Assuming `admin` details are returned

        // Optionally redirect to a protected page after successful login
        // For example:
        // window.location.href = "/dashboard"; // Or use React Router's `navigate` function

        // If you are using react-router-dom, you can use:
        // navigate("/dashboard");
        window.location.href = "/";
      } else {
        setMessage(result.message); // Error message from backend
      }
    } catch (error) {
      console.error(error);
      setMessage("Internal server error. Please try again later.");
    }
  };

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
        <h1 className="text-white text-center text-3xl mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col p-4">
            <label htmlFor="email" className="text-white mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="p-2 rounded-md bg-gray-900 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md w-full transition-all shadow-md shadow-blue-500">
              Login
            </button>
          </div>
        </form>
        {message && (
          <div className="text-center text-red-500 mt-4">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
