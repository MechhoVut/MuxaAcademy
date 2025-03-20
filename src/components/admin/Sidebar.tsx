import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  
  
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: '/admin/dashboard'
    },
    
    {
      name: 'Courses',
      icon: <GraduationCap className="h-5 w-5" />,
      path: '/admin/courses'
    },
    {
      name: 'Users',
      icon: <Users className="h-5 w-5" />,
      path: '/admin/users'
    },
    
  ];

  return (
    <div className="h-screen w-64 bg-gray-800 text-white fixed left-0 top-0">
      {/* Logo */}
      <div className="px-6 py-4 border-b border-gray-700">
        <Link to="/admin/dashboard" className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8" />
          <span className="text-xl font-bold">Admin Panel</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="mt-6">
        <div className="px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Logout */}
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
        <button className="flex items-center space-x-2 text-gray-300 hover:text-white w-full px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;