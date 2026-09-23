// src/services/api.js
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  // Sends the adminToken cookie along with requests (needed for the
  // admin-protected POST routes, e.g. creating a service).
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Normalize errors so callers can just do: catch (error) { error.message }
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again.";

    return Promise.reject(new Error(message));
  }
);

export default api;