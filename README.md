WriteSpace - A Collaborative Blogging Platform

Project Overview
WriteSpace is a full-featured blogging platform built with React 18, Vite, and Tailwind CSS. It provides a modern interface for creating, sharing, and managing blog posts with role-based access control for admins, moderators, and regular users.

Tech Stack
- React 18 with Vite
- React Router DOM v6
- Tailwind CSS for styling
- PropTypes for component validation
- LocalStorage for state persistence
- Jest for testing

Folder Structure
src/
├── components/          # Reusable UI components
│   ├── Avatar.jsx
│   ├── BlogCard.jsx
│   ├── Navbar.jsx
│   ├── PublicNavbar.jsx
│   ├── ProtectedRoute.jsx
│   ├── StatCard.jsx
│   └── UserRow.jsx
├── pages/               # Page components
│   ├── AdminDashboard.jsx
│   ├── Home.jsx
│   ├── LandingPage.jsx
│   ├── LoginPage.jsx
│   ├── ReadBlog.jsx
│   ├── RegisterPage.jsx
│   ├── UserManagement.jsx
│   └── WriteBlog.jsx
├── utils/
│   ├── auth.js          # Session management
│   └── storage.js       # LocalStorage data persistence
├── App.jsx              # Main app with routing
├── main.jsx             # Entry point
└── index.css            # Global styles

Setup Instructions
1. Install dependencies:
   npm install

2. Start development server:
   npm run dev

3. Build for production:
   npm run build

4. Run tests:
   npm test

5. Run linting:
   npm run lint

Usage
- Access the application at http://localhost:5173
- Register a new account or use the hardcoded admin credentials:
  - Email: admin@writespace.com
  - Password: admin123
- Admin users can access /admin and /moderate routes
- Users can create, edit, and delete their own posts
- Role-based permissions control access to features

License
Private - All rights reserved.