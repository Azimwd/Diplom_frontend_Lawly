import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";

interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface ApiErrorResponse {
  statusCode?: number;
  success?: boolean;
  data?: unknown;
  message?: string;
  detail?: string;
}

const api = axios.create({
  baseURL: "https://lawly.up.railway.app",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const method = config.method?.toLowerCase();

  if (["post", "put", "patch", "delete"].includes(method || "")) {
    const csrfToken = sessionStorage.getItem("csrf_token");

    if (csrfToken) {
      config.headers["X-CSRFToken"] = csrfToken;
    }
  }

  return config;
});

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as RetryAxiosRequestConfig | undefined;
    const message = error.response?.data?.message || error.response?.data?.detail || "";

    const isAuthEndpoint =
      originalRequest?.url?.includes("/users/login/") ||
      originalRequest?.url?.includes("/users/token/refresh/") ||
      originalRequest?.url?.includes("/users/registrations/");

    const isCsrfError =
      message.toLowerCase().includes("csrf") ||
      message.toLowerCase().includes("CSRF".toLowerCase());

    if (isCsrfError) {
      console.error("CSRF error. Refresh will not help:", error.response?.data);
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true;

      try {
        if (!isRefreshing) {
          isRefreshing = true;

          refreshPromise = axios
            .post(
              "https://lawly.up.railway.app/users/token/refresh/",
              {},
              {
                withCredentials: true,
                headers: {
                  "X-CSRFToken": sessionStorage.getItem("csrf_token") || "",
                },
              }
            )
            .then((res) => {
              const newCsrfToken =
                res.data?.data?.csrf_token ||
                res.data?.data?.data?.csrf_token;

              if (newCsrfToken) {
                sessionStorage.setItem("csrf_token", newCsrfToken);
              }
            })
            .finally(() => {
              isRefreshing = false;
              refreshPromise = null;
            });
        }

        await refreshPromise;

        return api(originalRequest);
      } catch (err: unknown) {
        sessionStorage.removeItem("csrf_token");

        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;