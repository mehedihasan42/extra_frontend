import { Outlet } from "react-router";
import LeftSidebar from "../common/LeftSidebar";
import RightSidebar from "../common/RightSidebar";

const Layout = () => {
  return (

      <div className="flex max-w-7xl mx-auto mt-4 px-4 gap-4">
        
        {/* Left Sidebar */}
        <div className="hidden lg:block w-1/4">
          <LeftSidebar />
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-2/4">
          <Outlet />
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block w-1/4">
          <RightSidebar />
        </div>
      </div>
  );
};

export default Layout;
