import React from 'react';
import { Link } from 'react-router';

const LeftSidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-base-200 p-4 flex flex-col">
      
      {/* Logo / Title */}
      <Link to="/" className="text-2xl font-bold mb-6">
        <span className='text-blue-600'>Extra</span>book
      </Link>

      {/* Menu Items */}
      <div className="flex flex-col gap-2">
        <Link to="/newsfeed" className="btn btn-ghost justify-start">
          Newsfeed
        </Link>

        <Link to="/profile" className="btn btn-ghost justify-start">
          Profile
        </Link><Link to="/save" className="btn btn-ghost justify-start">
          Saved
        </Link>
      </div>

    </div>
  );
};

export default LeftSidebar;
