import { store } from "@/store/store";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const refreshAccessToken = async () => {
  try {
    await axiosInstance.post("/api/v1/users/refresh-token"); 
  } catch (error) {
    throw error;
  }
};

const login = async (data: { email: string; password: string }) =>
  axiosInstance.post("/api/v1/users/login", data);
const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => axiosInstance.post("/api/v1/users/register", data);

const logOut = async () => axiosInstance.post("/api/v1/users/logout");

const book = async () => axiosInstance.get("/api/v1/books");

const bookbyId = async (bookId: string) =>
  axiosInstance.get(`/api/v1/books/${bookId}`);

// Update createBook to accept FormData for file upload
const createBook = async (data: FormData) =>
  axiosInstance.post("/api/v1/books", data);
// Update updateBook to accept FormData for file upload
const updateBook = async (data: FormData) =>
  axiosInstance.put("/api/v1/books", data);

export {
  axiosInstance,
  login,
  register,
  logOut,
  book,
  createBook,
  bookbyId,
  updateBook,
};
