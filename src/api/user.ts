import api from "./axios";

export interface RegisterProps {
	email: String;
	password: String;
	confirmPassword: String;
	agreementAccepted: Boolean;
	privacyPolicyAccepted: Boolean;
}

export interface LoginProps {
	email: String;
	password: String;
}

export const registerUser = async (data: RegisterProps) => {
	const response = await api.post("/users/registrations/", data, {withCredentials: true});
	
	return response.data;
};

export const loginUser = async (data: LoginProps) => {
	const response = await api.post("/users/login/", 
		data, {withCredentials: true}
	);
	return response.data;
};

export const refreshToken = async (refresh: string) => {
	const response = await api.post("/users/token/refresh/", 
		refresh, {withCredentials: true});

	return response.data.token;
};
