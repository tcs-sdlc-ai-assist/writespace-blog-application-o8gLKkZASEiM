import React from 'react';
import PropTypes from 'prop-types';

const StatCard = ({ value, label, icon, color = 'bg-blue-500', onClick }) => {
  return (
    <div
      className={`p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
        onClick
          ? 'hover:bg-gray-100 dark:hover:bg-gray-800'
          : ''
      } ${onClick ? 'group' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <div className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${color} text-white`}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
        </div>
      </div>
    </div>
  );
};

StatCard.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  color: PropTypes.oneOf([
    'bg-purple-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-gray-400',
  ]),
  onClick: PropTypes.func,
};

export default StatCard;