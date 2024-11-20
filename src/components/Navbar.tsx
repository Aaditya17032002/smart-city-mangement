import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCity, FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { Button } from '../components/ui/button.tsx';
import { useAuth } from '../AuthContext.tsx';

// Define UserRole type
type UserRole = "citizen" | "government";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Use nullish coalescing operator to ensure fallback to 'guest'
  const { userRole = "guest", logout } = useAuth() || {};

  // Define navigation items based on the userRole
  const navItems = (userRole ?? "guest") === 'citizen'
    ? [
        { name: 'Dashboard', path: '/citizen' },
        { name: 'Usage', path: '/citizen/usage/electricity' },
        { name: 'Alerts', path: '/citizen/alerts' },
        { name: 'Sustainability', path: '/citizen/sustainability' },
      ]
    : (userRole ?? "guest") === 'government'
    ? [
        { name: 'Dashboard', path: '/government' },
        { name: 'Resources', path: '/government/resource/electricity' },
        { name: 'Analytics', path: '/government/analytics' },
        { name: 'Sustainability', path: '/government/sustainability' },
        { name: 'Alerts', path: '/government/alerts' },
      ]
    : []; // Fallback for 'guest' or undefined roles

  return (
    <nav className="bg-primary text-primary-foreground shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to={userRole === 'citizen' ? '/citizen' : '/government'} className="flex-shrink-0">
              <FaCity className="h-8 w-8" />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-foreground hover:text-primary"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Button variant="ghost" className="flex items-center">
                <FaUser className="mr-2" />
                <span>{(userRole ?? "guest").charAt(0).toUpperCase() + (userRole ?? "guest").slice(1)}</span>
              </Button>
              <Button variant="ghost" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
              <span className="sr-only">Open main menu</span>
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-foreground hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <FaUser className="h-6 w-6" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium">
                  {(userRole ?? "guest").charAt(0).toUpperCase() + (userRole ?? "guest").slice(1)}
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Button variant="ghost" className="w-full text-left" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
