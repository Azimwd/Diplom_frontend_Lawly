import api from "./axios";

export interface RegisterProps {
  email: string;
  password: string;
  confirmPassword: string;
  agreementAccepted: boolean;
  privacyPolicyAccepted: boolean;
}

export interface LoginProps {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterProps) => {
  const response = await api.post("/users/registrations/", data);
  return response.data;
};

export const loginUser = async (data: LoginProps) => {
  const response = await api.post("/users/login/", data);

  const csrfToken =
    response.data?.data?.csrf_token ||
    response.data?.data?.data?.csrf_token;

  if (csrfToken) {
    sessionStorage.setItem("csrf_token", csrfToken);
  }

  return response.data;
};

export const refreshToken = async () => {
  const response = await api.post("/users/token/refresh/", {});
  return response.data;
};