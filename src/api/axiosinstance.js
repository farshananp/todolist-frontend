import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://todolist-server-9kjs.onrender.com"
});

export default axiosInstance;