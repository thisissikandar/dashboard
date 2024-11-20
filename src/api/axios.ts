import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

const login = async (data: { email: string; password: string }) =>
  axiosInstance.post("/users/login", data);
const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => axiosInstance.post("/users/register", data);
const book = async () => axiosInstance.get("/books");

export { axiosInstance, login, register, book };
