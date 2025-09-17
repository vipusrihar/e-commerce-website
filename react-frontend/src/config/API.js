import axios from "axios"
 
const API_URL = "http://localhost:5000/api"


// Default timeout (5 seconds)
const DEFAULT_TIMEOUT = 5000;

// Create secured Axios instance 
export const securedApi = axios.create({
  baseURL: API_URL,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token dynamically before each request
securedApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});


// Optional: API for public endpoints (no auth required)
export const publicApi = axios.create({
  baseURL: API_URL,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});
