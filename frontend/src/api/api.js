/**
 * @fileoverview Axios client instance configured for Django REST API communication.
 * Handles session cookies and base routing.
 */

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/',
  withCredentials: true, // Enables session cookie handling across origins
});

export default api;