import api from "./axios";
import axios from "axios";

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

const logApiError = (label: string, error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error(label, error.response?.data || error.message);
    return;
  }

  console.error(label, error);
};

export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    const response = await api.get<UserInfoResponse>("/users/user-info/",
      { _skipRedirect: true } as any
    );
    return response.data.data;
  } catch (error: unknown) {
    logApiError("Ошибка при получении данных пользователя:", error);
    return null;
  }
};

export const getMyProfile = async (
  profileId: number
): Promise<UserProfile | null> => {
  try {
    const response = await api.get<UserProfileResponse>(`/profile/${profileId}/`);
    return response.data.data;
  } catch (error: unknown) {
    logApiError("Ошибка при получении профиля:", error);
    return null;
  }
};

export const updateProfile = async (
  profileId: number,
  data: UserProfileUpdate
): Promise<UserProfile | null> => {
  try {
    const formData = new FormData();

    formData.append("first_name", data.first_name || "");
    formData.append("last_name", data.last_name || "");
    formData.append("phoneNumber", data.phoneNumber || "");

    if (data.avatar instanceof File) {
      formData.append("avatar", data.avatar);
    }

    const response = await api.patch<UserProfileResponse>(
      `/profile/${profileId}/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.data;
  } catch (error: unknown) {
    logApiError("Детальный ответ бэкенда:", error);
    return null;
  }
};