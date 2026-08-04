import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';

const UserRow = ({ user, currentUserRole, onDelete }) => {
  const { id, name, username, role, createdAt } = user;

  const roleBadgeClasses = {
    admin: 'bg-purple-100 text-purple-700',
    moderator: 'bg-blue-100 text-blue-700',
    user: 'bg-gray-100 text-gray-700',
    guest: 'bg-gray-100 text-gray-700',
  }[role] || 'bg-gray-100 text-gray-700';

  return (
    <div
      className="border-l-4 border-gray-400 p-4 mb-4 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <Avatar role={role} />
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">@{username}</p>
        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${roleBadgeClasses}`}>
          {role}
        </span>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Joined {new Date(createdAt).toLocaleDateString()}</p>
      </div>
      {currentUserRole && (
        <div className="flex space-x-2">
          {currentUserRole === 'admin' || currentUserRole === role ? (
            <button
              onClick={onDelete}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Delete
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
};

UserRow.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    role: PropTypes.oneOf(['admin', 'moderator', 'user', 'guest']),
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  currentUserRole: PropTypes.oneOf(['admin', 'moderator', 'user', 'guest']),
  onDelete: PropTypes.func,
};

export default UserRow;