import axios from "axios";

// Create an Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: "https://saavn.dev",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
