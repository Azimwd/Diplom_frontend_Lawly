import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home/Home";
import ChatAI from "./pages/ChatAI";
import Subscription from "./pages/Subscription";
import SubscriptionConfirmed from "./pages/SubscriptionConfirmed";
import SubscriptionFailed from "./pages/SubscriptionFailed";

import ChatWindow from "./test/ChatWindow";
import "./App.css";
import { UserProvider, useUser } from "./context/UserContext";
import { useEffect } from "react";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import GoogleCallbackPage from "./components/GoogleCallbackPage";

// Мгновенная установка темы из localStorage до рендеринга React
const savedTheme = localStorage.getItem("theme") || "dark";
if (savedTheme === "dark") {
	document.documentElement.classList.add("dark");
} else {
	document.documentElement.classList.remove("dark");
}

function ThemeManager() {
	const { profile } = useUser();

	useEffect(() => {
		const localTheme = localStorage.getItem("theme");
		const theme = localTheme || profile?.theme || "dark";

		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}

		if (profile?.theme && !localTheme) {
			localStorage.setItem("theme", profile.theme);
		}
	}, [profile?.theme]);

	return null;
}

function App() {
	return (
		<UserProvider>
			<ThemeManager />

			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<SignIn />} />
					<Route path="/register" element={<SignUp />} />
					<Route path="/login/forgot-password" element={<ForgotPasswordPage />} />
					<Route path="/chat/:id?" element={<ChatAI />} />
					<Route path="/test" element={<ChatWindow />} />
					<Route path="/subscription" element={<Subscription />} />
					<Route path="/payment/success" element={<SubscriptionConfirmed />} />
					<Route path="/payment/fail" element={<SubscriptionFailed />} />
					<Route path="/auth/google/callback" element={<GoogleCallbackPage />} />
				</Routes>
			</BrowserRouter>
		</UserProvider>
	);
}

export default App;
