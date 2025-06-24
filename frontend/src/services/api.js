import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication services
export const signup = (userData) => {
  return apiClient.post('/auth/signup', userData);
};

export const login = async (credentials) => {
  const response = await apiClient.post('/auth/login', credentials);
  if (response.data.token) {
    localStorage.setItem('authToken', response.data.token);
    localStorage.setItem('username', response.data.username); // Store username
  }
  return response; // Return the full response for the component to handle
};

export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('username');
  // No API call is strictly necessary for JWT logout if it's stateless,
  // but you could add one if your backend invalidates tokens.
};

export const getCurrentUser = () => {
    // This checks if a token exists and optionally fetches user data
    // For simplicity, we'll rely on localStorage for now for auth status
    // but an API call to /auth/me could be used to verify token server-side
    const token = localStorage.getItem('authToken');
    const username = localStorage.getItem('username');
    if (token && username) {
        return { token, username }; // Or fetch from /auth/me
    }
    return null;
};


// Notes services
export const getNotes = () => {
  return apiClient.get('/notes');
};

export const createNote = (noteData) => {
  return apiClient.post('/notes', noteData);
};

export const getNoteById = (noteId) => {
  return apiClient.get(`/notes/${noteId}`);
};

export const updateNote = (noteId, noteData) => {
  return apiClient.put(`/notes/${noteId}`, noteData);
};

export const deleteNote = (noteId) => {
  return apiClient.delete(`/notes/${noteId}`);
};

export default apiClient; // Exporting the configured instance can also be useful







// This file provides API service functions for authentication and notes management using Axios.
// Sets up an Axios instance (apiClient) with a base URL from environment variables or defaults to http://localhost:5000/api.
// Configures a request interceptor to automatically add a JWT auth token from localStorage to the Authorization header for all requests.
// Authentication functions:
// signup(userData): Sends a POST request to /auth/signup to register a new user.
// login(credentials): Sends a POST request to /auth/login, stores the returned token and username in localStorage if successful, and returns the response.
// logout(): Removes the auth token and username from localStorage.
// getCurrentUser(): Checks localStorage for a token and username, returns them if present, otherwise returns null.
// Notes functions:
// getNotes(): Fetches all notes for the authenticated user.
// createNote(noteData): Creates a new note.
// getNoteById(noteId): Fetches a single note by its ID.
// updateNote(noteId, noteData): Updates an existing note by ID.
// deleteNote(noteId): Deletes a note by ID.
// Exports the configured Axios instance for potential direct use elsewhere.
// All API calls automatically include the user's auth token if available.