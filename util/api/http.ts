// util/api/http.ts
import axios, { AxiosInstance } from "axios";
import type { InternalAxiosRequestConfig, AxiosHeaders } from "axios";
import { getToken } from "../kakaologin/token";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export const http: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 60_000,
});

http.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const headers = config.headers as AxiosHeaders;

  // 토큰 추가
  const token = await getToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const data = config.data as any;

  // React Native FormData 감지
  const isClassicFD =
    typeof FormData !== "undefined" && data instanceof FormData;
  const isRNFD = data && typeof data === "object" && Array.isArray(data._parts);
  const isFormData = isClassicFD || isRNFD;

  if (isFormData) {
    // 🔥 핵심: FormData 처리
    headers.delete("Content-Type");
    config.transformRequest = [(data) => data];
    console.log("🚀 FormData detected - Content-Type removed");
  } else {
    headers.set("Content-Type", "application/json");
  }

  return config;
});

// 응답 인터셉터 (에러 디버깅용)
http.interceptors.response.use(
  (response) => {
    console.log("✅ HTTP Success:", response.status, response.config.url);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
