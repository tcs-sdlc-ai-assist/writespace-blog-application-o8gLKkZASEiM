import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Avatar from '../components/Avatar';
import { getPosts, updatePosts, savePosts, getUsers, saveUsers, deleteUsers } from '../utils/storage';
import { getSession } from '../utils/auth';
import PropTypes from 'prop-types';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState('guest');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsData = getPosts();
        const usersData = getUsers();
        setPosts(postsData);
        setUsers(usersData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
        console.error(err);
      }
    };

    const fetchUserRole = () => {
      const session = getSession();
      if (session) {
        setUserRole(session.role || 'user');
      }
    };

    fetchData();
    fetchUserRole();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Failed to load data: {error}</p>
      </div>
    );
  }

  if (userRole !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Access denied. Admin only.</p>
      </div>
    );
  }

  const totalPosts = posts.length;
  const totalUsers = users.length;
  const recentPosts = posts.slice(0, 5);

  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const updatedPosts = posts.filter((p) => p.id !== postId);
      updatePosts(updatedPosts);
      setPosts(updatedPosts);
    }
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter((u) => u.id !== userId);
      saveUsers(updatedUsers);
      setUsers(updatedUsers);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your platform</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium bg-purple-500 text-white">
                📝
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalPosts}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Posts</p>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium bg-blue-500 text-white">
                👥
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalUsers}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium bg-green-500 text-white">
                ⚡
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">Quick Actions</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Create post, manage users</p>
              </div>
            </div>
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Posts</h2>
          {recentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="border-l-4 border-purple-500 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm"
                >
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{post.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400 text-center py-8">No posts yet.</p>
          )}
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Users</h2>
          {users.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="border-l-4 border-blue-500 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm"
                >
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{user.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">@{user.username}</p>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700`}>
                    {user.role}
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Joined {new Date(user.createdAt).toLocaleDateString()}</p>
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400 text-center py-8">No users yet.</p>
          )}
        </section>

        <div className="flex justify-between mt-8">
          <Link to="/write" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Create New Post
          </Link>
          <Link to="/users" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Manage Users
          </Link>
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <span className="text-xl font-bold text-gray-900 dark:text-white">WriteSpace</span>
            <p className="text-gray-600 dark:text-gray-400 text-center md:text-left">© 2024 WriteSpace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

AdminDashboard.propTypes = {
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
};

export default AdminDashboard;