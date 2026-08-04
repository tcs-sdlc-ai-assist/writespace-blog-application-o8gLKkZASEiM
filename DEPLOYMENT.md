# Deployment Guide

## Deployment Steps

### 1. Build the Project

```bash
npm run build
```

This generates a production-ready build in the `dist` directory.

### 2. Deploy to Vercel

#### Option A: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### Option B: GitHub Integration

1. Push your code to a GitHub repository
2. Import the repository in Vercel
3. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

#### Option C: Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Select your repository
4. Configure as above
5. Click "Deploy"

## Environment Variables

The following environment variables are required for production:

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API endpoint (if using external API) | No |
| `VITE_APP_NAME` | Application name for branding | No |
| `VITE_ENABLE_ANALYTICS` | Enable analytics (e.g., Google Analytics) | No |

Add these in the Vercel project settings under **Environment Variables**.

## CI/CD Configuration

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### Vercel Preview Deployments

Every pull request gets a preview deployment automatically. The preview URL will be available in the pull request.

## Hosting Configuration

### Vercel Settings

- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Node Version**: 18

### Post-Deployment Checklist

- [ ] Verify build succeeds in CI
- [ ] Check that all routes work (/, /login, /register, /dashboard, /admin, /moderate)
- [ ] Test authentication flow with hardcoded admin credentials
- [ ] Verify role-based access control works
- [ ] Confirm LocalStorage persistence works across sessions
- [ ] Test responsive design on mobile, tablet, desktop
- [ ] Verify dark mode works
- [ ] Check console for errors in production

## Troubleshooting

### Build Fails

- Ensure all dependencies are installed: `npm install`
- Check Node version matches package.json (Node 18+)
- Verify Vite config is correct

### Deployment Fails

- Verify Vercel project settings match build commands
- Check environment variables are set in Vercel
- Review deployment logs for specific errors

### Authentication Issues

- Hardcoded admin credentials work only in development
- For production, use a proper authentication provider (Auth0, Firebase, etc.)
- Ensure session storage is accessible across deployments

## Rollback

If a deployment causes issues, you can rollback in Vercel:

1. Go to Vercel Dashboard → Your Project
2. Click "Deployments"
3. Find the problematic deployment
4. Click "Redeploy" on a previous successful deployment

---

*Last updated: 2024-01-01*
*WriteSpace v1.0.0*
```