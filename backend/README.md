# Notes App - Backend

This directory contains the backend server for the Notes App, built with Node.js, Express, and MongoDB.

## Prerequisites

- Node.js (v14 or later recommended)
- npm (usually comes with Node.js)
- MongoDB (either a local instance or a cloud-hosted solution like MongoDB Atlas)

## Setup Instructions

1.  **Clone the Repository (if you haven't already):**
    ```bash
    git clone <repository_url>
    cd <repository_name>/notes-app/backend
    ```

2.  **Install Dependencies:**
    Navigate to the `notes-app/backend` directory and run:
    ```bash
    npm install
    ```

3.  **Set Up Environment Variables:**
    Create a `.env` file in the `notes-app/backend` directory by copying the example or creating it manually.
    ```
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_very_strong_and_secret_jwt_key
    CLIENT_URL=http://localhost:3000
    ```
    -   `PORT`: The port on which the backend server will run (defaults to 5000).
    -   `MONGODB_URI`: Your MongoDB connection string (e.g., `mongodb://localhost:27017/notesapp_db` or your Atlas URI).
    -   `JWT_SECRET`: A strong, unique secret key for signing JSON Web Tokens. **Change this to a secure random string.**
    -   `CLIENT_URL`: The URL of your frontend application, used for CORS configuration. Defaults to `http://localhost:3000` if your React app runs on port 3000.

4.  **Ensure MongoDB is Running:**
    If you are using a local MongoDB instance, make sure it is running.

## Running the Server

1.  **Development Mode (with auto-restarting using nodemon):**
    ```bash
    npm run dev
    ```
    The server will typically start on `http://localhost:5000` (or the port specified in your `.env` file).

2.  **Production Mode:**
    ```bash
    npm start
    ```

## API Endpoints

The main API routes are:

-   **Authentication (`/api/auth`):**
    -   `POST /signup`: Register a new user.
    -   `POST /login`: Log in an existing user.
    -   `GET /me`: Get the profile of the currently logged-in user (requires token).
-   **Notes (`/api/notes` - protected):**
    -   `GET /`: Get all notes for the logged-in user.
    -   `POST /`: Create a new note.
    -   `GET /:id`: Get a specific note by ID.
    -   `PUT /:id`: Update a specific note by ID.
    -   `DELETE /:id`: Delete a specific note by ID.

Refer to the source code in `routes/` and `controllers/` for more details on request/response structures.
---
