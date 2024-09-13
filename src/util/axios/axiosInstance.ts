import axios from "axios";

// Create an Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: "https://jiosaavn-api-red.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
