import React from 'react';
import { NavLink } from 'react-router';

const LeftSidebar = () => {

  const activeClass = "btn btn-primary justify-start text-white";
  const normalClass = "btn btn-ghost justify-start";

  return (
    <div className="w-64 min-h-screen bg-base-200 p-4 flex flex-col">
      
      {/* Logo / Title */}
      <NavLink to="/" className="text-2xl font-bold mb-6">
        <span className='text-blue-600'>Extra</span>book
      </NavLink>

      {/* Menu Items */}
      <div className="flex flex-col gap-2">
        
        <NavLink 
          to="/newsfeed" 
          className={({ isActive }) => isActive ? activeClass : normalClass}
        >
          Newsfeed
        </NavLink>

        <NavLink 
          to="/profile" 
          className={({ isActive }) => isActive ? activeClass : normalClass}
        >
          Profile
        </NavLink>

        <NavLink 
          to="/save" 
          className={({ isActive }) => isActive ? activeClass : normalClass}
        >
          Saved
        </NavLink>

        <NavLink 
          to="/following" 
          className={({ isActive }) => isActive ? activeClass : normalClass}
        >
          Following
        </NavLink>

        <NavLink 
          to="/followers" 
          className={({ isActive }) => isActive ? activeClass : normalClass}
        >
          Followers
        </NavLink>

      </div>
    </div>
  );
};

export default LeftSidebar;
