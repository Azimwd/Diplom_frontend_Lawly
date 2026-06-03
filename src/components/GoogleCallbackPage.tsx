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

				navigate("/chat", { replace: true });
			} catch (error) {
				console.error(error);
				navigate("/login", { replace: true });
			}
		};

		exchangeGoogleSession();
	}, [searchParams, navigate]);

	return <div>Google authorization...</div>;
};

export default GoogleCallbackPage;
