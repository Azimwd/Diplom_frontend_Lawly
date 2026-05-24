import api from "./axios";

export interface UserInfo {
	id: number;
	email: string;
	role: string;
}
interface UserInfoResponse {
	statusCode: number;
	success: boolean;
	data: UserInfo;
	message: string;
}

export interface UserProfile {
	id: number;
	first_name: string;
	last_name: string;
	avatar: string | null;
	phoneNumber: string;
	language?: string; 
    theme?: string;
}

export interface UserProfileUpdate {
	first_name?: string;
	last_name?: string;
	avatar?: File | null;
	phoneNumber?: string;
}

interface UserProfileResponse {
	statusCode: number;
	success: boolean;
	data: UserProfile;
	message: string;
}

export const getUserInfo = async (accessToken: string | undefined) => {
	try {
		if (!accessToken) {
			console.log("Access token not provided for user info");
			return null;
		}

		// const csrfToken = Cookies.get("csrftoken");

		const response = await api.get<UserInfoResponse>("/users/user-info/", {
			headers: {},
			withCredentials: true,
		});

		// console.log("CSRF Token:", csrfToken);
		// console.log("User Info:", response.data.data);

		return response.data.data;
	} catch (error: any) {
		console.error("Ошибка при получении данных пользователя:", error.response?.data || error.message);
		return null;
	}
};

export const getMyProfile = async (profileId: number, accessToken?: string | undefined) => {
	try {
		if (!accessToken) return null;

		const response = await api.get<UserProfileResponse>(`/profile/${profileId}/`, {
			headers: {},
			withCredentials: true,
		});

		return response.data.data;
	} catch (error: any) {
		console.error("Ошибка при получении профиля:", error.response?.data || error.message);
		return null;
	}
};

export const updateProfile = async (profileId: number, data: UserProfileUpdate, accessToken?: string) => {
	try {
		if (!accessToken) return null;

		const formData = new FormData();

		formData.append("first_name", data.first_name || "");
		formData.append("last_name", data.last_name || "");
		formData.append("phoneNumber", data.phoneNumber || "");

		if (data.avatar instanceof File) {
			formData.append("avatar", data.avatar);
		}

		const response = await api.patch<UserProfileResponse>(`/profile/${profileId}/`, formData, {
			headers: {
				"Content-Type": undefined,
			},
			withCredentials: true,
		});

		return response.data.data;
	} catch (error: any) {
		console.error("Детальный ответ бэкенда: ", error.response?.data);
		return null;
	}
};
