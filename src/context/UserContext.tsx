/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState } from "react";
import { getMyProfile, getUserInfo, type UserInfo, type UserProfile } from "../api/chat";

interface UserContextType {
	user: UserInfo | null;
	setUser: (user: UserInfo | null) => void;
	profile: UserProfile | null;
	setProfile: (profile: UserProfile | null) => void;
	loading: boolean;
	logout: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<UserInfo | null>(null);
	const [profile, setProfile] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(true);

	const fetchUser = async () => {
		if (localStorage.getItem("isAuth") !== "true") {
			setLoading(false);
			return;
		}

		try {
			const userData = await getUserInfo();
			setUser(userData);

			if (userData) {
				const profileData = await getMyProfile(userData.id);
				setProfile(profileData);
			}
		} catch (error) {
			console.warn("Ошибка при получении профиля. Сброс авторизации.");
			localStorage.removeItem("isAuth");
			setUser(null);
			setProfile(null);
		} finally {
			setLoading(false);
		}
	};

	const logout = () => {
		localStorage.removeItem("isAuth");
		sessionStorage.removeItem("csrf_token");
		setUser(null);
		setProfile(null);
		window.location.href = "/login";
	};

	useEffect(() => {
		fetchUser();
	}, []);

	return (
		<UserContext.Provider value={{ user, loading, profile, setProfile, setUser, logout }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(UserContext);

	if (!context) {
		throw new Error("useUser must be used inside UserProvider");
	}

	return context;
};
