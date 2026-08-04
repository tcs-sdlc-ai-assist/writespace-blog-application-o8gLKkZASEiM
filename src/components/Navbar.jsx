import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Avatar from './Avatar';
import { getSession } from '../utils/auth';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState('user');
  const [userName, setUserName] = useState('User');
  const [logoutMenuOpen, setLogoutMenuOpen] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (session) {
      setUserName(session.name || 'User');
      setUserRole(session.role || 'user');
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
    setLogoutMenuOpen(false);
  };

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', roles: ['admin', 'moderator', 'user', 'guest'] },
    { path: '/profile', label: 'Profile', roles: ['admin', 'moderator', 'user', 'guest'] },
    { path: '/admin', label: 'Admin', roles: ['admin'] },
    { path: '/moderate', label: 'Moderate', roles: ['moderator'] },
  ];

  const filteredLinks = navLinks.filter(link => 
    link.roles.includes(userRole)
  );

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <span className="text-xl font-bold text-gray-900 dark:text-white">WriteSpace</span>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="hidden md:flex items-center space-x-6">
              {filteredLinks.map((link) => (
                <a
                  key={link.path}
                  to={link.path}
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <Avatar role={userRole} />
            <button
              onClick={() => setLogoutMenuOpen(!logoutMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Logout
            </button>

            {logoutMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg py-1">
                <button onClick={logout} className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            {filteredLinks.map((link) => (
              <a
                key={link.path}
                to={link.path}
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
              >
                {link.label}
              </a>
            ))}
            <button onClick={logout} className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {};

export default Navbar;