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
  // ИЗМЕНЕНИЕ: Сначала берем свежую куку (которую поставил бэкенд после Google),
  // а только потом смотрим в sessionStorage
  const cookieToken = getCookie("csrftoken");
  const sessionToken = sessionStorage.getItem("csrf_token");
  
  if (cookieToken) return cookieToken;
  if (sessionToken) return sessionToken;
  return "";
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

    // ЛОГИРОВАНИЕ: Смотрим, какой запрос вызвал 401
    if (error.response?.status === 401) {
      console.warn(`[Axios] Получен 401 для запроса: ${originalRequest.url}. Пытаемся обновить токен...`);
      
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const csrfTokenForRefresh = getCsrfToken();
          console.log("[Axios] CSRF токен для рефреша:", csrfTokenForRefresh);

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

          console.log("[Axios] Рефреш успешен! Ответ:", refreshResponse.data);

          const newCsrfToken =
            refreshResponse.data?.csrf_token ||
            refreshResponse.data?.data?.csrf_token ||
            refreshResponse.data?.data?.data?.csrf_token;

          if (newCsrfToken) {
            sessionStorage.setItem("csrf_token", newCsrfToken);
          }

          return api(originalRequest);
        } catch (err: any) {
          console.error("[Axios] Ошибка при обновлении токена (Refresh Failed):");
          if (err.response) {
            console.error("-> Статус:", err.response.status);
            console.error("-> Данные:", err.response.data);
          } else {
            console.error("-> Текст ошибки:", err.message);
          }

          sessionStorage.removeItem("csrf_token");

          if (window.location.pathname !== "/login") {
            console.warn("[Axios] Перенаправление на /login из-за проваленного рефреша.");
            window.location.href = "/login";
          }

          return Promise.reject(err);
        }
      }
    }

    console.error(`[Axios] Ошибка ${error.response?.status} для ${originalRequest.url}:`, error.response?.data);
    return Promise.reject(error);
  }
);

export default api;