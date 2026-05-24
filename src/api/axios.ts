import axios from "axios";
import Cookies from "js-cookie";
import { refreshToken } from "./user";

const api = axios.create({
	baseURL: "https://lawly.up.railway.app",
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

// http://localhost:8000

api.interceptors.request.use((config) => {
	const csrfToken = Cookies.get("csrftoken");
	const accessToken = Cookies.get("access_token");

	if (csrfToken) {
		config.headers["X-CSRFToken"] = csrfToken;
	}

	if (accessToken) {
		config.headers["Authorization"] = `Bearer ${accessToken}`;
	}

	return config;
});

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			console.log("Access token истёк. Пробуем refresh...");

			originalRequest._retry = true;

			try {
				const refresh = Cookies.get("refreshToken");

				if (!refresh) {
					console.log("Refresh token отсутствует");
					Cookies.remove("access_token");
					Cookies.remove("refreshToken");
					window.location.href = "/login";
					return Promise.reject(error);
				}

				const newAccess = await refreshToken(refresh);

				Cookies.set("accessToken", newAccess);

				originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;

				return api(originalRequest);
			} catch (err) {

				Cookies.remove("accessToken");
				Cookies.remove("refreshToken");
				window.location.href = "/login";
				return Promise.reject(err);
			}
		}

		return Promise.reject(error);
	},
);

export default api;
