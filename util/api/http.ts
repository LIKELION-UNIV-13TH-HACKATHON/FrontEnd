import axios, { AxiosInstance } from "axios";
import { getToken } from "../kakaologin/token";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
export const http: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15_000,
});

http.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
