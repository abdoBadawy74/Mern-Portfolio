# MERN Antigravity Portfolio

A futuristic, bilingual (Arabic/English) portfolio built with the MERN stack featuring an "antigravity" design with floating elements and smooth animations.

## Tech Stack

### Frontend (Client)
- **Vite** - Fast build tool
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Router v6** - Client-side routing
- **react-i18next** - Internationalization (RTL/LTR)

### Backend (Server)
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Project Structure

```
/
├── client/           # Vite React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/
│   │   └── i18n/
│   └── ...
├── server/           # Express backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── config/
└── package.json      # Root scripts
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)

### Installation

1. Clone and install dependencies:
```bash
cd client && npm install
cd ../server && npm install
cd .. && npm install
```

2. Configure environment:
- Create `server/.env` (see `server/.env.example`)

3. Start both client and server:
```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### Available Scripts

```bash
npm run dev              # Run both client and server concurrently
npm run dev:client       # Run only frontend
npm run dev:server       # Run only backend
npm run build:client     # Build frontend for production
```

## Features

✅ Bilingual support (Arabic RTL / English LTR)
✅ Dark/Light theme toggle
✅ Antigravity floating animations
✅ RESTful API with JWT authentication
✅ Responsive design
✅ Admin dashboard (WIP)

## API Endpoints

- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project (Admin)
- `PUT /api/projects/:id` - Update project (Admin)
- `DELETE /api/projects/:id` - Delete project (Admin)
- `GET /api/services` - Get all services
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

## Author

**Abdulrahman Badawy**
- Frontend Developer
- React/Next.js | Node js/ts
