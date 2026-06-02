# 💫 Radio Enchufe Virtual - Client 💫

[![React Version](https://img.shields.io/badge/React-18.2+-61DAFB.svg?logo=react)](https://react.dev/)
[![Node.js Version](https://img.shields.io/badge/Node.js-v18.14.2-green.svg)](https://nodejs.org/en/download/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)
[![Webpack](https://img.shields.io/badge/Bundler-Webpack%205-8DD6F9.svg?logo=webpack)](https://webpack.js.org/)

> A modern, interactive React frontend for managing and streaming a virtual radio station with real-time chat, user profiles, and social features.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Detailed Setup](#detailed-setup)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Development Workflow](#development-workflow)
- [Building for Production](#building-for-production)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Support & Contact](#support--contact)

---

## Overview

**Radio Enchufe Virtual** is a full-featured React frontend for a modern virtual radio streaming platform. It provides a rich user experience with:

- 🎙️ **Radio Player**: Real-time audio streaming with playback controls
- 👥 **User Management**: Registration, login, authentication, and profile management
- 💬 **Real-time Chat**: WebSocket-powered instant messaging with other users
- 📝 **Posts & Content**: Browse, create, and interact with radio updates
- 🤝 **Social Features**: Follow users, like content, user recommendations
- 🎨 **Modern UI**: Clean, responsive design with styled-components
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🔐 **Secure Authentication**: JWT-based authentication with protected routes
- ⚡ **Optimized Performance**: Code splitting, lazy loading, and efficient bundling

The frontend is built with **React 18**, **TypeScript**, **Webpack**, and communicates with the [Radio API](https://github.com/enchufevirtual/radio-api) backend.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **UI Framework** | React 18.2+ |
| **Language** | TypeScript 5.0+ |
| **Bundler** | Webpack 5 |
| **Build Tool** | Babel 7 |
| **Styling** | Styled-Components 5.3+ |
| **State Management** | Context API + useReducer |
| **Routing** | React Router v6 |
| **Real-time** | Socket.io-client 4.6+ |
| **HTTP Client** | Axios 1.3+ |
| **Package Manager** | npm 9+ |
| **Avatar Library** | MultiAvatar, Gravatar |
| **Icons** | React Icons 4.8+ |
| **Emoji Picker** | Emoji Mart 5.5+ |

---

## Prerequisites

Before you begin, ensure you have the following installed:

### Required

- **Node.js** (v18.14.2 or higher)
  - [Download Node.js](https://nodejs.org/en/download/)
  - Verify: `node -v && npm -v`

- **Git**
  - [Download Git](https://git-scm.com/downloads)
  - Verify: `git --version`

- **Backend API** (Radio API must be running)
  - [Backend Repository](https://github.com/enchufevirtual/radio-api)
  - **Important**: The frontend requires the backend to be running to function properly
  - Backend should be running on `http://localhost:4000` by default

### Recommended

- **Code Editor**: VS Code with TypeScript support
  - Recommended extensions: ESLint, Prettier, Styled-components
  
---

## Quick Start

Get the frontend running in less than 5 minutes:

```bash
# 1. Clone the repository
git clone git@github.com:enchufevirtual/radio-client.git
cd radio-client

# 2. Install dependencies
npm install

# 3. Set up environment variables (see Configuration section)
cp .env.example .env
# Edit .env with your backend URL

# 4. Ensure backend is running on http://localhost:4000
# See: https://github.com/enchufevirtual/radio-api

# 5. Start development server
npm start
```

The frontend will open automatically at `http://localhost:3000`

---

## Detailed Setup

### Step 1: Clone Repository

```bash
git clone git@github.com:enchufevirtual/radio-client.git
cd radio-client
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs all required packages including React, TypeScript, Webpack, and development tools.

**Expected output:**
```
added XXX packages, and audited XXX packages in Xs
```

### Step 3: Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Backend API URL with the API route prefix
# Used by axios for REST API calls
API_URL=http://localhost:4000/api/radio/v1

# Backend server URL (without API route prefix)
# Used by Socket.io for real-time features (chat, notifications)
BACKEND_URL=http://localhost:4000

# MultiAvatar API endpoint for generating user avatars
# Get free API at: https://multiavatar.com/register
API_AVATAR=https://api.multiavatar.com

# MultiAvatar API Key
# Get your key from: https://multiavatar.com/register
API_KEY=your_api_key_here

# Fallback Zeno.fm stream URL
# Can be overridden by backend API response
URL_STREAM=https://stream.zeno.fm/hnwgw0jr0gatv
```

### Step 4: Start the Backend (Important!)

The frontend **requires** the backend to be running. Before starting the frontend, ensure the API is running:

```bash
# In a separate terminal, navigate to the backend directory
cd ../radio-api

# Start the backend
npm run dev

# You should see: "Listen in the port: http://localhost:4000"
```

**Keep the backend terminal open** while developing the frontend.

### Step 5: Start the Development Server

```bash
# In the radio-client directory
npm start
```

The frontend will automatically open in your browser at `http://localhost:3000`.

**Success indicators:**
- ✅ Browser opens automatically
- ✅ No errors in the console
- ✅ Radio player and chat components visible
- ✅ Can navigate between pages
- ✅ Real-time chat works (if backend is running)

---

## Configuration

### Environment Variables

All configuration is managed through the `.env` file:

| Variable | Required | Description |
|----------|----------|-------------|
| `API_URL` | Yes | Backend API URL with route prefix (e.g., `http://localhost:4000/api/radio/v1`) |
| `BACKEND_URL` | Yes | Backend server URL without route prefix (e.g., `http://localhost:4000`) - Used for Socket.io |
| `API_AVATAR` | No | MultiAvatar API endpoint (default: `https://api.multiavatar.com`) |
| `API_KEY` | No | MultiAvatar API key (get from multiavatar.com/register) |
| `URL_STREAM` | No | Fallback Zeno.fm stream URL (can be overridden by backend) |

### Port Configuration

By default, the frontend runs on **port 3000**.

**If port 3000 is already in use:**

Option 1 - Use a different port:
```bash
PORT=3001 npm start
```

Option 2 - Edit webpack.config.js:
```javascript
devServer: {
  port: 3001,  // Change this
  // ...
}
```

Option 3 - Kill the process using port 3000:
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### API Connection

The frontend connects to the backend using:

1. **HTTP/Axios** for REST API calls
2. **WebSocket/Socket.io** for real-time features (chat, notifications)

Verify connection in browser console:

```javascript
// In browser console (F12)
console.log(process.env.API_URL)  // Should show: http://localhost:4000/api/radio/v1
console.log(process.env.BACKEND_URL)  // Should show: http://localhost:4000
```

---

## Project Structure

```
radio-client/
├── src/
│   ├── index.tsx                         # React entry point
│   ├── app/
│   │   └── index.tsx                     # Main App component with routes
│   │
│   ├── components/                       # Reusable React components
│   │   ├── nav/                          # Navigation bar
│   │   ├── radio/                        # Radio player widget
│   │   ├── chat/                         # Chat interface
│   │   ├── logo/                         # Logo component
│   │   ├── protectedRoute/               # Route protection wrapper
│   │   ├── settings/                     # Settings sub-components
│   │   ├── profile/                      # Profile sub-components
│   │   ├── posts/                        # Post-related components
│   │   └── loadings/                     # Loading spinners
│   │
│   ├── context/                          # Global state management
│   │   ├── GlobalProvider.tsx            # Central state provider
│   │   ├── AuthProvider.tsx              # Authentication context
│   │   ├── SocketProvider.tsx            # WebSocket context
│   │   ├── PostProvider.tsx              # Posts state
│   │   ├── globalReducer.ts              # State reducer logic
│   │   ├── types.ts                      # TypeScript interfaces
│   │   ├── constants.ts                  # Action type constants
│   │   └── GlobalContext.ts              # Context objects
│   │
│   ├── hooks/                            # Custom React hooks
│   │   ├── useAuth.ts                    # Authentication hook
│   │   ├── useGlobal.ts                  # Global state hook
│   │   ├── useUser.ts                    # User profile fetching
│   │   ├── usePost.ts                    # Post fetching
│   │   ├── useFieldValidation.ts         # Form validation UI hook
│   │   └── ...                           # Other custom hooks
│   │
│   ├── layout/                           # Layout wrappers
│   │   ├── AuthLayout.tsx                # Auth pages layout
│   │   └── UserLayout.tsx                # User pages layout
│   │
│   ├── pages/                            # Route page components
│   │   ├── Home/                         # Home page
│   │   ├── Profile/                      # User profile page
│   │   ├── Settings/                     # Settings pages
│   │   ├── Login/                        # Login page
│   │   ├── Register/                     # Registration page
│   │   ├── Admin/                        # Admin dashboard
│   │   └── NotFound/                     # 404 page
│   │
│   ├── routes/                           # Route definitions
│   │   └── auth.routes.ts                # Public route configurations
│   │
│   ├── helpers/                          # Utility functions
│   │   ├── auth.ts                       # Auth utilities
│   │   ├── formatDate.ts                 # Date formatting
│   │   ├── getErrorMessage.ts            # Error handling
│   │   ├── generateId.ts                 # ID generation
│   │   └── ...
│   │
│   ├── styles/                           # Global styles
│   │   ├── GlobalStyle.ts                # Global CSS-in-JS
│   │   └── ...
│   │
│   ├── config/                           # Application config
│   │   └── axios.ts                      # Axios HTTP client setup
│   │
│   └── public/                           # Static assets
│       ├── index.html                    # HTML entry point
│       ├── assets/                       # Images, fonts, etc.
│       └── favicon.ico
│
├── types/                                # TypeScript type definitions
│   ├── assets.d.ts                       # Asset type definitions
│   └── types.d.ts                        # Global type definitions
│
├── webpack.config.js                     # Webpack bundler configuration
├── .babelrc                              # Babel transpiler config
├── tsconfig.json                         # TypeScript configuration
├── .env.example                          # Environment template
├── .env                                  # Environment variables (gitignored)
├── package.json                          # Dependencies & scripts
└── README.md                             # This file
```

### Architecture Overview

**State Management:**
- Context API + useReducer for centralized state
- Separate providers for Auth, Global, Socket, and Posts
- Easy-to-understand flow with action constants

**Routing:**
- Public routes: `/login`, `/register` (Auth pages)
- Protected routes: `/`, `/settings/*`, `/:username` (User pages)
- Route protection via `ProtectedRoute` component
- `ProtectedRoute` checks JWT token before allowing access

**Real-time Features:**
- Socket.io for WebSocket connection
- Real-time chat messaging
- Live notifications

**Styling:**
- Styled-components for CSS-in-JS
- Component-scoped styling
- No CSS file conflicts
- Easy theming support

---

## Available Scripts

### Development

```bash
npm start
```

- Starts Webpack dev server with hot module replacement
- Opens browser automatically at `http://localhost:3000`
- Real-time code changes without full reload
- TypeScript compilation on save
- Error overlay in browser

### Building for Production

```bash
npm run build
```

- Creates optimized production bundle in `dist/` folder
- Minifies and tree-shakes unused code
- Generates source maps for debugging
- ~60-70% smaller than development bundle

### Development Build (without server)

```bash
npm run dev
```

- One-time TypeScript compilation
- Generates `dist/` folder for manual testing
- Useful for debugging build issues

---

## Development Workflow

### Adding a New Page

1. **Create component in `pages/`:**
   ```typescript
   // src/pages/NewPage/index.tsx
   import React from 'react'
   
   export const NewPage: React.FC = () => {
     return <div>New Page Content</div>
   }
   ```

2. **Add route in `app/index.tsx`:**
   ```typescript
   import { NewPage } from '../pages/NewPage'
   
   <Routes>
     <Route path="/newpage" element={<NewPage />} />
   </Routes>
   ```

### Adding a New Component

1. **Create folder in `components/`:**
   ```bash
   mkdir src/components/MyComponent
   ```

2. **Create files:**
   ```typescript
   // src/components/MyComponent/index.tsx
   import styled from 'styled-components'
   
   const Container = styled.div`
     padding: 1rem;
   `
   
   export const MyComponent: React.FC = () => {
     return <Container>Component Content</Container>
   }
   ```

### Using Global State

```typescript
import { useGlobal } from '../hooks/useGlobal'

const MyComponent: React.FC = () => {
  const { state, dispatch } = useGlobal()
  
  return (
    <div>
      <p>Global value: {state.someValue}</p>
      <button onClick={() => dispatch({ type: 'ACTION_TYPE' })}>
        Update State
      </button>
    </div>
  )
}
```

### Using Authentication

```typescript
import { useAuth } from '../hooks/useAuth'

const MyComponent: React.FC = () => {
  const { user, token, isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    return <p>Please log in</p>
  }
  
  return <p>Welcome, {user?.username}!</p>
}
```

### Making API Calls

```typescript
import axios from '../config/axios'

const fetchData = async () => {
  try {
    const response = await axios.get('/api/posts')
    console.log(response.data)
  } catch (error) {
    console.error('Error:', error)
  }
}
```

---

## Building for Production

### Before Deploying

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Test production build locally:**
   ```bash
   # Install serve globally (optional)
   npm install -g serve
   
   # Serve production build
   serve -s dist
   ```

3. **Verify in browser:**
   - Open `http://localhost:3000` (or served port)
   - Check console for errors
   - Test critical features

### Production Deployment

**Environment variables for production:**

```env
API_URL=https://yourdomain.com/api/radio/v1
BACKEND_URL=https://yourdomain.com
API_AVATAR=https://api.multiavatar.com
API_KEY=your_production_api_key
URL_STREAM=https://stream.zeno.fm/your_stream_id
```

**Deployment options:**

- **Vercel** (recommended for React)
- **Netlify**
- **AWS S3 + CloudFront**
- **GitHub Pages**
- **Traditional server** (Apache, Nginx)

The `dist/` folder contains all files needed for production deployment.

---

## Troubleshooting

### Common Issues

**Problem**: Backend connection fails
```
Error: Failed to connect to http://localhost:4000
```

**Solution:**
```bash
# 1. Verify backend is running
curl http://localhost:4000

# 2. Check API_URL and BACKEND_URL in .env
cat .env | grep -E 'API_URL|BACKEND_URL'

# 3. If backend is running on different port, update .env
API_URL=http://localhost:5000/api/radio/v1
BACKEND_URL=http://localhost:5000
```

---

**Problem**: Port 3000 already in use
```
Error: listen EADDRINUSE :::3000
```

**Solution:**
```bash
# Option 1: Use different port
PORT=3001 npm start

# Option 2: Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

---

**Problem**: TypeScript compilation errors
```
error TS2322: Type 'X' is not assignable to type 'Y'
```

**Solution:**
```bash
# 1. Check tsconfig.json is correct
cat tsconfig.json

# 2. Verify type definitions are installed
npm list @types/react

# 3. Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

**Problem**: Hot module replacement not working
```
[HMR] Connected
[HMR] Update failed: SyntaxError: Unexpected token
```

**Solution:**
```bash
# 1. Clear webpack cache
rm -rf dist/ node_modules/.cache

# 2. Restart dev server
npm start

# 3. If persists, hard refresh browser (Ctrl+Shift+R)
```

---

**Problem**: Chat or real-time features not working
```
WebSocket connection failed
```

**Solution:**
```bash
# 1. Verify backend Socket.io is running
# 2. Check REACT_APP_SOCKET_URL in .env
# 3. Verify backend and frontend URLs match
# 4. Check browser console for WebSocket errors
# 5. Ensure backend CORS allows frontend origin
```

---

**Problem**: Build fails with memory error
```
FATAL ERROR: JavaScript heap out of memory
```

**Solution:**
```bash
# Increase Node memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

---

## Code Quality

### Linting & Formatting

The project uses ESLint and Prettier for code consistency:

```bash
# Check code style (if configured)
npm run lint

# Format code (if configured)
npm run format
```

### TypeScript

All code should be written in TypeScript with strict mode enabled:

```typescript
// ✅ Good: Type annotations
const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
  console.log('Clicked')
}

// ❌ Avoid: Any types
const handleClick = (event: any) => {
  console.log('Clicked')
}
```

---

## Performance Optimization

### Code Splitting

Components are automatically code-split by Webpack:

```typescript
// Lazy load heavy components
const HeavyComponent = React.lazy(() => import('../components/Heavy'))

// Wrap with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <HeavyComponent />
</Suspense>
```

### Image Optimization

- Use WebP format when possible
- Compress images before uploading
- Use responsive images with srcset

### Bundle Size

Monitor bundle size:

```bash
# Webpack bundle analyzer can be added
npm install --save-dev webpack-bundle-analyzer
```

---

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit with clear messages: `git commit -m 'Add amazing feature'`
5. Push to your fork: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Guidelines

- Follow the existing code style
- Write TypeScript with strict types
- Add comments for complex logic
- Update this README for new features
- Test your changes in development
- Ensure backend is compatible with your changes

---

## Support & Contact

- 📧 **Email**: chendoec@gmail.com
- 🌐 **Social Media**: [@enchufevirtual](https://twitter.com/enchufevirtual)
- 📱 **GitHub**: [enchufevirtual](https://github.com/enchufevirtual)
- 💬 **Issues**: Open an issue on GitHub for bugs or feature requests

---

## Related Projects

- 🔗 [Radio API Backend](https://github.com/enchufevirtual/radio-api) - REST API and WebSocket server
- 🔗 [Project Architecture](../ARCHITECTURE.md) - System design overview

---

## License

This project is licensed under the **ISC License** - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ by the Enchufe Virtual Team**

*This project represents knowledge acquired through experience. It improves over time with your contributions. Be free, be happy!* 🎉
