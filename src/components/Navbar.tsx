import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '../server/contexts/AuthContext';
import Logo from "./assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src={Logo} alt="Muxa Academy Logo" className="h-8 w-8" />
              <span className="text-xl font-bold text-gray-800">Muxa Academy</span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-[#E16A54]">Home</Link>
            <Link to="/courses" className="text-gray-600 hover:text-[#E16A54]">Courses</Link>
            <Link to="/about" className="text-gray-600 hover:text-[#E16A54]">About</Link>
            <Link to="/contact" className="text-gray-600 hover:text-[#E16A54]">Contact</Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-600">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-[#E16A54] text-white px-4 py-2 rounded-md hover:bg-[#d15543] transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-[#E16A54] text-white px-4 py-2 rounded-md hover:bg-[#d15543] transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-[#E16A54] focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Links */}
        {isOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-2 py-2">
              <Link
                to="/"
                onClick={toggleMenu}
                className="block text-gray-600 hover:text-[#E16A54] px-4 py-2"
              >
                Home
              </Link>
              <Link
                to="/courses"
                onClick={toggleMenu}
                className="block text-gray-600 hover:text-[#E16A54] px-4 py-2"
              >
                Courses
              </Link>
              <Link
                to="/about"
                onClick={toggleMenu}
                className="block text-gray-600 hover:text-[#E16A54] px-4 py-2"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={toggleMenu}
                className="block text-gray-600 hover:text-[#E16A54] px-4 py-2"
              >
                Contact
              </Link>
              
              {user ? (
                <>
                  <div className="flex items-center space-x-2 px-4 py-2">
                    <User className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-600">{user.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="block w-full text-left bg-[#E16A54] text-white px-4 py-2 rounded-md hover:bg-[#d15543] transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="block bg-[#E16A54] text-white px-4 py-2 rounded-md hover:bg-[#d15543] transition-colors"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;