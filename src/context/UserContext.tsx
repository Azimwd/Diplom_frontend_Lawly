import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getMyProfile, getUserInfo, type UserInfo, type UserProfile } from "../api/chat";

interface UserContextType {
	user: UserInfo | null;
	setUser: (user: UserInfo | null) => void;
	profile: UserProfile | null;
	setProfile: (profile: UserProfile | null) => void;
	loading: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<UserInfo | null>(null);
	const [profile, setProfile] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(true);

	const fetchUser = async () => {
		const accessToken = Cookies.get("access_token");
		if (!accessToken) {
			setLoading(false);
			return;
		}
		const userData = await getUserInfo(accessToken);
		setUser(userData);
		if (userData) {
			const profileData = await getMyProfile(userData.id, accessToken);
			setProfile(profileData);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchUser();
	}, []);

	return (
		<UserContext.Provider value={{ user, loading, profile, setProfile, setUser }}>{children}</UserContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used inside UserProvider");
	}
	return context;
};
