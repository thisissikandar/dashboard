import { setToken } from "@/store/features/auth/authSlice";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      try {
        await refreshAccessToken();
        return axiosInstance(originalRequest);
      } catch (refreshError: any) {
        console.error("Error refreshing access token:", refreshError);
        if (refreshError.response && refreshError.response.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.pathname = "/auth/login";
        }
        throw refreshError;
      }
    }
    return Promise.reject(error);
  }
);

const refreshAccessToken = async () => {
  try {
    const response = await axiosInstance.post("/users/refresh-token");
    const accessToken = response.data.message.accessToken;
    const refreshToken = response.data.message.refreshToken;
    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
};

const login = async (data: { email: string; password: string }) =>
  axiosInstance.post("/users/login", data);
const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => axiosInstance.post("/users/register", data);
const logOut = async () => axiosInstance.post("/users/logout");
const book = async () => axiosInstance.get("/books");
const createBook = async (data: {
  title: string;
  genre: string;
  coverImage: string;
  file: string;
  author: string;
  description: string;
}) => axiosInstance.post("/books", data);

export { axiosInstance, login, register, logOut, book, createBook };
