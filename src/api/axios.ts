import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";

interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
}

function getCsrfToken(): string {
  return sessionStorage.getItem("csrf_token") || getCookie("csrftoken") || "";
}

const api = axios.create({
  baseURL: "https://lawly.up.railway.app",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const method = config.method?.toLowerCase();

  if (["post", "put", "patch", "delete"].includes(method || "")) {
    const csrfToken = getCsrfToken();

    if (csrfToken) {
      config.headers["X-CSRFToken"] = csrfToken;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryAxiosRequestConfig | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isRefreshRequest = originalRequest.url?.includes("/users/token/refresh/");
    const isLoginRequest = originalRequest.url?.includes("/users/login/");
    const isRegisterRequest = originalRequest.url?.includes("/users/registrations/");

    if (isRefreshRequest || isLoginRequest || isRegisterRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const csrfTokenForRefresh = getCsrfToken();

        const refreshResponse = await axios.post(
          "https://lawly.up.railway.app/users/token/refresh/",
          {},
          {
            withCredentials: true,
            headers: {
              "X-CSRFToken": csrfTokenForRefresh,
            },
          }
        );

        const newCsrfToken =
          refreshResponse.data?.csrf_token ||
          refreshResponse.data?.data?.csrf_token ||
          refreshResponse.data?.data?.data?.csrf_token;

        if (newCsrfToken) {
          sessionStorage.setItem("csrf_token", newCsrfToken);
        }

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