import axios from "axios";

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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/users/token/refresh/") &&
      !originalRequest.url?.includes("/users/login/")
    ) {
      originalRequest._retry = true;

      try {
        await axios.post(
          "https://lawly.up.railway.app/users/token/refresh/",
          {},
          {
            withCredentials: true,
            headers: {
              "X-CSRFToken": sessionStorage.getItem("csrf_token") || "",
            },
          }
        );

        return api(originalRequest);
      } catch (err) {
        sessionStorage.removeItem("csrf_token");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;