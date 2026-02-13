import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import Newsfeed from "./pages/Newsfeed";
import Profile from "./pages/Profile";
import Signup from "./authentication/Signup";
import Login from "./authentication/Login";
import Users from "./pages/Users";
import Layout from "./pages/Layout";
import Save from "./pages/Save";

function App() {
  return (
    <Router>
        <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/newsfeed" />} />
          <Route path="/newsfeed" element={<Newsfeed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<Users />} />
          <Route path="/save" element={<Save />} />
          {/* <Route path="/update-profile" element={<UpdateProfile />} /> */}
        </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
  );
}

export default App;
