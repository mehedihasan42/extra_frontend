import React from "react";
import { Link } from "react-router";

export default function Navbar() {
  return (
    <div className="navbar bg-base-200 shadow-lg rounded-lg mb-4">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">SocialApp</Link>
      </div>
      <div className="flex-none">
        <Link to="/newsfeed" className="btn btn-ghost">Newsfeed</Link>
        <Link to="/profile" className="btn btn-ghost">Profile</Link>
      </div>
    </div>
  );
}
