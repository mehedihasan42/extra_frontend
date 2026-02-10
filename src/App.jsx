import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import Navbar from "./common/Navbar";
import Newsfeed from "./pages/Newsfeed";
import Profile from "./pages/Profile";
import Signup from "./authentication/Signup";
import Login from "./authentication/Login";
import Users from "./pages/Users";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto px-4 mt-4">
        <Routes>
          <Route path="/" element={<Navigate to="/newsfeed" />} />
          <Route path="/newsfeed" element={<Newsfeed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
