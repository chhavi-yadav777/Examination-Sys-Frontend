import axios from "axios";

const configuredBaseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
const normalizedBaseURL = configuredBaseURL.replace(/\/+$/, "");
const baseURL = normalizedBaseURL.endsWith("/api")
  ? normalizedBaseURL
  : `${normalizedBaseURL}/api`;

const api = axios.create({
  baseURL,
});

export default api;
