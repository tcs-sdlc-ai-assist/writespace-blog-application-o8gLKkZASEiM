import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import Avatar from './Avatar';

const PublicNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <span className="text-xl font-bold text-gray-900 dark:text-white">WriteSpace</span>
          <div className="flex items-center space-x-4">
            <a to="/login" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Login
            </a>
            <a to="/register" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Register
            </a>
            <Avatar role="guest" />
          </div>
        </div>
      </div>
    </nav>
  );
};

PublicNavbar.propTypes = {};

export default PublicNavbar;