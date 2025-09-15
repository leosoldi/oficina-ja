import axios from "axios";

//const BACKEND_URL = "https://oficinaja.com.br";
const BACKEND_URL = "http://192.168.1.47:3336";
console.log(BACKEND_URL)
export const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
