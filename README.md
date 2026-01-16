# Where's Waldo
A full-stack photo tagging application built for [The Odin Project](https://www.theodinproject.com/lessons/nodejs-where-s-waldo-a-photo-tagging-app).

[Live Demo]()

## Tech Stack
- Frontend: React, React Router, Material UI
- Backend: Node.js, Express
- Database: PostgreSQL

## Key Features
- **Accurate Coordinate Mapping**: Normalizes click coordinates across different screen sizes.
- **Server-Side Security**: Timer logic and coordinate validation are handled on the server to prevent cheating.
- **Leaderboard**: Ranking system for the top 30 players.

## Local Setup
This project is structured as a monorepo using npm workspaces.

1. Clone the repository.
2. Run `npm install` at the root.
3. Set up `.env` files in the server directory (refer to `.env.example`).
4. (Optional) Run `npm run populate -w server` to seed the database with initial leaderboard data.
5. Run `npm run dev` at the root to start both client and server.