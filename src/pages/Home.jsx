import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import Avatar from '../components/Avatar';
import { getPosts } from '../utils/storage';
import { getSession } from '../utils/auth';
import PropTypes from 'prop-types';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState('guest');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = getPosts();
        setPosts(postsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load posts');
        setLoading(false);
      }
    };

    const fetchUserRole = () => {
      const session = getSession();
      if (session) {
        setUserRole(session.role || 'user');
      }
    };

    fetchPosts();
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
        <p className="text-red-600">Failed to load posts: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Home</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Your blog posts</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Posts</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Manage your blog posts here</p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Latest Posts</h2>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  currentUserRole={userRole}
                  onEdit={null}
                  onDelete={null}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">No posts yet. Create your first post!</p>
            </div>
          )}
        </section>
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

Home.propTypes = {};

export default Home;