import React from 'react';
import { Link } from 'react-router';
import Sug_Follower from '../pages/Sug_Follower';

const RightSidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-base-200 p-4 flex flex-col">
      <div className="flex flex-col gap-2">
        <Link to='/users' className="btn btn-ghost text-xl justify-start"><span className='text-blue-600 font-bold'>Add</span> Friends</Link>
       <Sug_Follower/>
      </div>
    </div>
  );
};

export default RightSidebar;