import React from 'react';
import { FilePlus, StickyNote, Settings } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = ({user}) => {
  const navigate = useNavigate();
  const userName = user?.username || "User";
  // console.log("Sidebar user:", user);
  // console.log("Sidebar user:", userName);

  return (
    <div className="h-auto w-64 bg-[#1C1F2E] border-r border-[#2f334d] flex flex-col justify-between shadow-md">
    <div className="h-screen w-64 bg-[#1C1F2E] border-r border-[#2f334d] flex flex-col justify-between p-6 shadow-md">
      
      {/* Top Section */}
      <div className=''>
        {/* Logo */}
        <div className="flex items-center gap-2 text-white text-2xl font-bold mb-10 bg-slate-600 p-3 rounded-lg shadow-lg-grey">
          <div className="bg-purple-600 h-9 w-9 rounded-full flex items-center justify-center text-lg font-bold shadow-md">
            +
          </div>
          <span className="tracking-wide">NoteGenius</span>
        </div>

        {/* Profile Button */}
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-3 mb-10 w-full p-2 rounded-xl transition hover:bg-[#2a2d3f]"
        >
          <img
            src="https://i.pravatar.cc/100?img=32"
            alt="User"
            className="w-10 h-10 rounded-full object-cover border-2 border-[#2f334d] shadow-sm"
          />
          <div className="text-left">
            <h4 className="text-white text-sm font-semibold">{userName}</h4>
            {/* <h4 className="text-white text-sm font-semibold">Name</h4> */}
            <p className="text-gray-400 text-xs">Lead Product Designer</p>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1 text-sm">
          <NavLink
            to="/create-note"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-[#2a2d3f] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-[#2a2d3f]'
              }`
            }
          >
            <FilePlus className="w-4 h-4" />
            Create Note
          </NavLink>

          <NavLink
            to="/Dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-[#2a2d3f] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-[#2a2d3f]'
              }`
            }
          >
            <StickyNote className="w-4 h-4" />
            All Notes
          </NavLink>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="mt-10">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              isActive
                ? 'bg-[#2a2d3f] text-white'
                : 'text-gray-400 hover:text-white hover:bg-[#2a2d3f]'
            }`
          }
        >
          <Settings className="w-4 h-4" />
          Settings
        </NavLink>
      </div>
    </div>
    </div>);
};

export default Sidebar;
