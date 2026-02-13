import React, { useState } from "react";
import { useNavigate } from "react-router";
import API from "../api/api";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    present_address: "",
    hometown: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/user/signup/", formData);

      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/profile");
    } catch (err) {
      console.log("Signup error:", err.response?.data);
      setError(JSON.stringify(err.response?.data));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Create Account</h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">

            <input
              type="text"
              name="username"
              placeholder="Username"
              className="input input-bordered w-full"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              className="input input-bordered w-full"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              className="input input-bordered w-full"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="input input-bordered w-full"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="present_address"
              placeholder="Present Address"
              className="input input-bordered w-full md:col-span-2"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="hometown"
              placeholder="Hometown"
              className="input input-bordered w-full md:col-span-2"
              onChange={handleChange}
              required
            />

            <button className="btn btn-primary w-full md:col-span-2">
              Signup
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
