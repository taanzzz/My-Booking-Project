import axios from "axios";


const axiosSecure = axios.create({
  baseURL: "https://hotel-db-server.vercel.app/", 
});

axiosSecure.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosSecure;
