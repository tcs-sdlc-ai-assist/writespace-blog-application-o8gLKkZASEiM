import PropTypes from 'prop-types';

const getAvatar = (role) => {
  const emojis = {
    admin: '👑',
    moderator: '🛡️',
    user: '👤',
    guest: '👻',
  };
  const colors = {
    admin: 'bg-purple-500',
    moderator: 'bg-blue-500',
    user: 'bg-gray-400',
    guest: 'bg-gray-300',
  };

  const emoji = emojis[role] || '👤';
  const color = colors[role] || 'bg-gray-400';

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${color} text-white`}>
      {emoji}
    </span>
  );
};

getAvatar.propTypes = {
  role: PropTypes.oneOf(['admin', 'moderator', 'user', 'guest']),
};

export default getAvatar;