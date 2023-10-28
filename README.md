# Google Docs Clone

## Overview

This project is a Google Docs clone that allows users to create, edit, and collaborate on documents in real-time. It's built with Node.js as the backend, Next.js for the client-side, and utilizes various technologies for authentication, authorization, and real-time communication.

## Features

### Authentication and Authorization

- The project uses Passport.js and Express Session for authentication and authorization.
- Users can sign up, log in, and log out securely.
- Authentication is required to access and edit documents, ensuring document privacy and security.

### Real-time Collaboration

- Socket.io is used for real-time communication between users within documents.
- Multiple users can collaborate on a document simultaneously, with changes instantly reflected for all users in the same document.

### Document CRUD Operations

- Users can create new documents, edit existing ones, and delete documents.
- Documents are stored in a database and associated with specific users.
- CRUD operations are protected with authentication to ensure document ownership.

### Server-Side Rendering (SSR)

- Next.js is used for the client-side and server-side rendering.
- SSR provides faster page loads and better SEO performance for the application.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository
2. Navigate to the project folder: `cd your-repo`
3. Install dependencies: `npm install`
4. Create a `.env` file in the backend directory with the following configurations:

   **.env (Backend)**

   - `MONGO_URI`
   - `SESSION_SECRET`
   - `PORT`
   - `CLIENT_URL`

   5. Create a `.env.local` file in the Next.js (frontend) directory with the following configurations:

   **.env.local (Next.js)**

   - `NEXT_PUBLIC_FRONTEND_URL`
   - `NEXT_PUBLIC_BACKEND_URL`

5. Start the development server: `npm run dev`
