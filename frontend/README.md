# Notes App - Full Stack Project

This project is a **Notes Making App** built with a React frontend and a Node.js/Express/MongoDB backend. It allows users to sign up, log in, and manage their personal notes securely.
---

## Project Structure

```
notes-app/
  backend/    # Node.js, Express, MongoDB API
  frontend/   # React app (Create React App)
```

---

## Backend Overview (`backend/`)

- **Tech Stack:** Node.js, Express, MongoDB (Mongoose), JWT for authentication.
- **Features:**
  - User registration and login with hashed passwords.
  - JWT-based authentication for protected routes.
  - CRUD operations for notes, each note linked to a user.
  - CORS enabled for frontend-backend communication.

### Key Files

- `server.js`: Entry point, sets up Express, connects to MongoDB, configures CORS, and mounts routes.
- `models/User.js`: Mongoose schema for users, with password hashing and comparison.
- `models/Note.js`: Mongoose schema for notes, linked to users.
- `controllers/authController.js`: Handles signup, login, and user profile retrieval.
- `controllers/notesController.js`: Handles CRUD for notes, ensuring only the owner can access/modify.
- `middleware/authMiddleware.js`: Protects routes by verifying JWT and attaching user to requests.
- `routes/auth.js`: Auth endpoints (`/signup`, `/login`, `/me`).
- `routes/notes.js`: Notes endpoints (all protected).

### Environment Variables

Create a `.env` file in `backend/` with:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_jwt_secret
CLIENT_URL=http://localhost:3000
```

---

## Frontend Overview (`frontend/`)

- **Tech Stack:** React (with hooks), Axios, React Router.
- **Features:**
  - User authentication (signup, login, logout).
  - Protected routes (notes page only accessible when logged in).
  - Create, edit, and delete notes.
  - Responsive and simple UI.

### Key Files

- `src/App.js`: Main app, sets up routing and protected routes.
- `src/services/api.js`: Axios instance and API functions for auth and notes.
- `src/pages/LoginPage.js`, `SignupPage.js`: Auth forms and logic.
- `src/pages/NotesPage.js`: Main notes dashboard, fetches and displays notes, handles note CRUD.
- `src/components/NoteForm.js`, `NoteItem.js`, `Navbar.js`: UI components for notes and navigation.
- `src/contexts/AuthContext.js`: (Optional) React context for auth state.

### Environment Variables

Create a `.env` file in `frontend/` with:

```
REACT_APP_API_URL=http://localhost:5000/api
```

Change the URL if your backend runs elsewhere.

---

## How Authentication Works

- On signup or login, the backend returns a JWT token and username.
- The frontend stores these in `localStorage`.
- For protected API requests, the frontend sends the token in the `Authorization` header.
- The backend verifies the token and attaches the user to the request.

---

## Running the App

### 1. Start the Backend

```bash
cd notes-app/backend
npm install
npm run dev
```

### 2. Start the Frontend

```bash
cd notes-app/frontend
npm install
npm start
```

- The React app runs on [http://localhost:3000](http://localhost:3000).
- The backend runs on [http://localhost:5000](http://localhost:5000).

---

## API Endpoints

### Auth (`/api/auth`)

- `POST /signup` — Register new user.
- `POST /login` — Login and receive JWT.
- `GET /me` — Get current user profile (requires token).

### Notes (`/api/notes`)

- All endpoints require a valid JWT.
- `GET /` — Get all notes for the logged-in user.
- `POST /` — Create a new note.
- `GET /:id` — Get a specific note.
- `PUT /:id` — Update a note.
- `DELETE /:id` — Delete a note.

---

## Security Notes

- Passwords are hashed with bcrypt before storage.
- JWT tokens are used for stateless authentication.
- Notes are always scoped to the logged-in user; users cannot access others' notes.

---

## Customization

- Change the MongoDB URI and JWT secret in your `.env` files.
- Update UI styles in `frontend/src/App.css` and component files.
- Add more features (tags, search, etc.) as needed!

---

## License

This project is for educational purposes. You may use and modify it

# Notes App Frontend (React)

This is the **frontend** for the Notes Making App, built with React. It provides a user interface for authentication and managing personal notes, communicating with the backend API.

---

## Project Structure

```
frontend/
  src/
    components/    # Reusable UI components (NoteForm, NoteItem, Navbar)
    contexts/      # (Optional) React Context for authentication state
    pages/         # Main pages (LoginPage, SignupPage, NotesPage)
    services/      # API logic (api.js)
    App.js         # Main app, routing, and layout
    index.js       # Entry point
```

---

## Pages

### 1. `LoginPage.js`

- **Purpose:** Allows users to log in with their credentials.
- **Flow:**
  - User enters email and password.
  - On submit, calls the login API.
  - If successful, stores JWT token and user info in `localStorage` (or context) and redirects to NotesPage.

### 2. `SignupPage.js`

- **Purpose:** Allows new users to register.
- **Flow:**
  - User enters username, email, and password.
  - On submit, calls the signup API.
  - If successful, logs in the user automatically and redirects to NotesPage.

### 3. `NotesPage.js`

- **Purpose:** Main dashboard for managing notes.
- **Flow:**
  - On load, fetches all notes for the logged-in user.
  - Displays notes in a list (using `NoteItem`).
  - Allows creating new notes (using `NoteForm`).
  - Supports editing and deleting notes.

---

## Components

### 1. `Navbar.js`

- **Purpose:** Displays navigation links and logout button.
- **Behavior:** Shows different links based on authentication state.

### 2. `NoteForm.js`

- **Purpose:** Form for creating or editing a note.
- **Behavior:** Used for both adding new notes and editing existing ones.

### 3. `NoteItem.js`

- **Purpose:** Displays a single note with options to edit or delete.

---

## Authentication Flow

- **Signup/Login:**
  - User submits credentials via `SignupPage` or `LoginPage`.
  - On success, backend returns a JWT token and user info.
  - Frontend stores the token (usually in `localStorage`).
- **Protected Routes:**
  - `NotesPage` is only accessible if a valid token exists.
  - If not authenticated, user is redirected to login.
- **API Requests:**
  - All note-related API requests include the JWT token in the `Authorization` header.
  - If the token is invalid/expired, user is logged out and redirected to login.

---

## API Service (`src/services/api.js`)

- **Purpose:** Centralizes all API calls using Axios.
- **Features:**
  - Handles authentication (login, signup, get current user).
  - Handles CRUD operations for notes.
  - Automatically attaches JWT token to protected requests.

---

## Auth Context (`src/contexts/AuthContext.js`) _(Optional)_

- **Purpose:** Provides global authentication state and helper functions.
- **Usage:** Allows any component to access user info and authentication status.

---

## Project Flow

1. **User visits the app:**

   - If not logged in, sees Login or Signup page.
   - If logged in, redirected to NotesPage.

2. **User logs in or signs up:**

   - Credentials sent to backend.
   - On success, token and user info stored.
   - User redirected to NotesPage.

3. **User manages notes:**

   - Can create, edit, or delete notes.
   - All actions update the backend and refresh the notes list.

4. **User logs out:**
   - Token and user info removed from storage.
   - Redirected to Login page.

---

## Summary

- **Pages:** LoginPage, SignupPage, NotesPage.
- **Components:** Navbar, NoteForm, NoteItem.
- **Authentication:** JWT-based, token stored in localStorage, protected routes.
- **API:** All requests handled via `api.js` with token attached.
- **Flow:** Authenticated users can manage their own notes; unauthenticated users must log in or sign up.

---
