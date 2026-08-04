import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPosts, updatePosts, savePosts } from '../utils/storage';
import { getSession } from '../utils/auth';
import PropTypes from 'prop-types';

const WriteBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [post, setPost] = useState(null);
  const [userRole, setUserRole] = useState('guest');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const posts = getPosts();
        const postData = posts.find((p) => p.id === id);
        if (postData) {
          setPost(postData);
          setFormData({
            title: postData.title,
            excerpt: postData.excerpt,
            content: postData.content
          });
          setIsEditing(true);
          // Check permission for editing
          const session = getSession();
          const userRole = session?.role || 'guest';
          const authorRole = postData.author?.role || 'guest';
          if (userRole !== 'admin' && userRole !== 'moderator' && userRole !== authorRole) {
            setError('You do not have permission to edit this post');
          }
        }
      } catch (err) {
        setError('Failed to load post');
      }
    };

    const fetchUserRole = () => {
      const session = getSession();
      if (session) {
        setUserRole(session.role || 'user');
      }
    };

    fetchPost();
    fetchUserRole();
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const newPost = {
        id: id || Math.random().toString(36).substr(2, 9),
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        date: new Date().toISOString(),
        author: {
          name: getSession()?.user?.name || 'Anonymous',
          role: userRole
        }
      };

      if (id) {
        // Update existing post
        const posts = getPosts();
        const updatedPosts = posts.map(p => p.id === id ? newPost : p);
        updatePosts(updatedPosts);
      } else {
        // Create new post
        const posts = getPosts();
        posts.push(newPost);
        savePosts(posts);
      }

      navigate('/dashboard');
    } catch (err) {
      setError('Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  const charCount = formData.content.length;
  const maxLength = 5000;

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
        <p className="text-red-600">Failed to save post: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {isEditing ? 'Edit Post' : 'Create Post'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Write and publish your blog post</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}

          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter title"
              maxLength={100}
            />
            {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Enter excerpt"
              rows={3}
              maxLength={500}
            />
            {errors.excerpt && <p className="text-red-600 text-sm mt-1">{errors.excerpt}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Content
            </label>
            <textarea
              id="content"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Write your blog post content..."
              rows={10}
              maxLength={5000}
            />
            {errors.content && <p className="text-red-600 text-sm mt-1">{errors.content}</p>}
            <div className="mt-1 flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>{charCount}/{maxLength} characters</span>
              <span className={charCount > maxLength * 0.9 ? 'text-red-600' : 'text-gray-500'}>
                {charCount > maxLength ? 'Exceeded' : ''}
              </span>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
            </button>
          </div>
        </form>
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

WriteBlog.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string,
      role: PropTypes.oneOf(['admin', 'moderator', 'user', 'guest']),
    }),
  }).isRequired,
  currentUserRole: PropTypes.oneOf(['admin', 'moderator', 'user', 'guest']),
};

export default WriteBlog;