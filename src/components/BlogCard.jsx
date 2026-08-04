import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';

const BlogCard = ({ post, currentUserRole, onEdit, onDelete }) => {
  const { id, title, excerpt, date, author } = post;
  const { name, role: authorRole } = author || {};

  const topBorderColor = {
    admin: 'border-purple-500',
    moderator: 'border-blue-500',
    user: 'border-gray-400',
    guest: 'border-gray-300',
  }[authorRole] || 'border-gray-400';

  return (
    <article className={`border-l-4 ${topBorderColor} p-6 mb-4 rounded-lg shadow-sm`}>
      <div className="flex items-start space-x-4">
        <Avatar role={authorRole} />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{excerpt}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(date).toLocaleDateString()}
            </span>
            {currentUserRole && (
              <div className="flex space-x-2">
                {currentUserRole === 'admin' || currentUserRole === authorRole ? (
                  <>
                    <button
                      onClick={onEdit}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={onDelete}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

BlogCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string,
      role: PropTypes.oneOf(['admin', 'moderator', 'user', 'guest']),
    }),
  }).isRequired,
  currentUserRole: PropTypes.oneOf(['admin', 'moderator', 'user', 'guest']),
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default BlogCard;