import React from 'react';

const RightSidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-base-200 p-4 flex flex-col">
      
      <div className="flex flex-col gap-2">
        <div className="p-2 bg-base-100 rounded shadow">Trending Post 1</div>
        <div className="p-2 bg-base-100 rounded shadow">Trending Post 2</div>
        <div className="p-2 bg-base-100 rounded shadow">Friend Online</div>
        <div className="p-2 bg-base-100 rounded shadow">Ad Section</div>
      </div>

    </div>
  );
};

export default RightSidebar;
