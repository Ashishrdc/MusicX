import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_JIOSAAVN_API_BASE_URL;

// Create an Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
