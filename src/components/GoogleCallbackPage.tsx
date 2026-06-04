import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/axios";

const GoogleCallbackPage = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	useEffect(() => {
		const socialSession = searchParams.get("social_session");

		if (!socialSession) {
			navigate("/login", { replace: true });
			return;
		}

		const exchangeGoogleSession = async () => {
			try {
				const response = await api.post("/users/google/exchange/", {
					social_session: socialSession,
				});

				const csrfToken = response.data?.data?.csrf_token;

				if (csrfToken) {
					sessionStorage.setItem("csrf_token", csrfToken);
				}

				localStorage.setItem("isAuth", "true");

				window.location.href = "/chat";
			} catch (error) {
				console.error("Ошибка при обмене токена Google:", error);
				localStorage.removeItem("isAuth");
				navigate("/login", { replace: true });
			}
		};

		exchangeGoogleSession();
	}, [searchParams, navigate]);

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-white">
			<div className="w-14 h-14 border-4 border-gray-400 border-t-[#1E4FE0] rounded-full animate-spin mb-4"></div>
			<h2 className="text-[#1E1E2F] text-[24px] font-bold">Google authorization...</h2>
		</div>
	);
};

export default GoogleCallbackPage;
