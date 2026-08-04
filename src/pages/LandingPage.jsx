import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import Avatar from '../components/Avatar';
import StatCard from '../components/StatCard';
import { getPosts } from '../utils/storage';
import PropTypes from 'prop-types';

const LandingPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    fetchPosts();
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

  const featuredPosts = posts.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">WriteSpace</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Create, share, and collaborate on your ideas</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Build Better Together</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Collaborate with your team in real-time. Share ideas, provide feedback, and create amazing content together.</p>
            <Link to="/register" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Get Started Free
            </Link>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Real-time Collaboration</h3>
              <p className="text-gray-600 dark:text-gray-400">Work together simultaneously with instant updates across all devices.</p>
            </div>
            <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Version Control</h3>
              <p className="text-gray-600 dark:text-gray-400">Track changes, revert to previous versions, and maintain a complete history of your work.</p>
            </div>
            <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Team Workspaces</h3>
              <p className="text-gray-600 dark:text-gray-400">Organize projects by team, assign roles, and manage permissions effortlessly.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Latest Posts</h2>
          {featuredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  currentUserRole="guest"
                  onEdit={null}
                  onDelete={null}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">No posts yet. Be the first to create one!</p>
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

LandingPage.propTypes = {};

export default LandingPage;