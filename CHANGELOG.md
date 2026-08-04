# Changelog

All notable changes to WriteSpace will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-01

### Added
- Initial release of WriteSpace blogging platform
- User authentication with role-based access control (admin, moderator, user, guest)
- Blog post creation, editing, and deletion
- Real-time collaboration features
- Version control for blog posts
- Team workspaces with role-based permissions
- Admin dashboard for managing posts and users
- Landing page with feature highlights
- Responsive design with Tailwind CSS
- LocalStorage persistence for posts, users, and sessions
- Protected routes with role-based access control
- Login and registration pages with validation
- Read blog posts with edit/delete permissions
- User management interface for admins

### Changed
- Updated to React 18
- Updated to Vite 5
- Updated to Tailwind CSS 3
- Improved responsive design
- Enhanced error handling and loading states

### Fixed
- Fixed authentication token persistence
- Fixed role-based access control edge cases
- Fixed post deletion functionality
- Fixed user deletion for admins

### Setup
- Added npm scripts for development, build, test, lint, preview
- Configured Vite with React plugin
- Set up Jest for testing
- Configured ESLint with React plugin
- Added PostCSS configuration for Tailwind
- Created project structure with components, pages, utils folders
- Added hardcoded admin credentials for testing
- Added documentation in README.md
```