import React from 'react';
import { ChevronRight, Search } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Navbar = ({user}) => {
  const location = useLocation();
  const path = location.pathname;

  // Mapping routes to labels
  const routeTitleMap = {
    '/': 'Dashboard',
    '/login': 'Login',
    '/signup': 'Signup',
    '/settings': 'Settings',
    '/profile': 'Profile',
    '/create-note': 'Create Note',
    '/edit-note': 'Edit Note',
    '/view-note': 'View Note',
    '/trash': 'Trash',
  };

  const currentTitle = routeTitleMap[path] || 'My Notes';

  return (
    <div className="px-6 py-4 bg-[#1C1F2E] border-b border-[#2f334d] flex flex-col gap-2">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-400 flex items-center gap-1">
        <span>Notes</span>
        <ChevronRight size={16} />
        <span className="text-white capitalize">{currentTitle}</span>
      </div>

      {/* Title and optional actions */}
      <div className="flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">{currentTitle}</h1>

        {/* Optional Actions */}
        <div className="flex items-center gap-4">
          {/* Search Input */}
          <div className="relative hidden sm:block">
            <input
              id='search'
              name='search'
              type="text"
              placeholder="Search notes..."
              className="bg-[#2a2d3f] text-sm text-white placeholder-gray-400 px-3 py-2 pl-9 rounded-lg outline-none border border-[#2f334d] focus:border-purple-600 transition-all"
            />
            <Search className="absolute left-2 top-2.5 text-gray-400" size={16} />
          </div>

          {/* Login Link - Corrected className */}
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `flex items-center gap-3 text-sm px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                isActive
                  ? 'bg-[#2a2d3f] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-[#2a2d3f]'
              }`
            }
          >
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;