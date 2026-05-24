import api from "./axios";

export interface ChatSession {
	id: number;
	title: string;
	created_at: string;
	updated_at: string;
}

interface ChatsData {
	count: number;
	current_page: number;
	total_pages: number;
	has_next: boolean;
	has_previous: boolean;
	next: string | null;
	previous: string | null;
	results: ChatSession[];
}

export interface ChatsResponse {
	statusCode: number;
	success: boolean;
	data: ChatsData;
	message: string;
}


export const getListOfChat = async (): Promise<ChatSession[] | null> => {
	try {
		const response = await api.get<ChatsResponse>(`/chats/sessions/`, {
			withCredentials: true,
			xsrfCookieName: "csrftoken",
				xsrfHeaderName: "X-CSRFToken",
		});

		return response.data.data.results;
	} catch (error: any) {
		console.log("catched error: ", error);
		return null;
	}
};

export const deleteChat = async (id: number) => {
	try {
		await api.delete(`/chats/sessions/${id}/`, {withCredentials: true, xsrfCookieName: "csrftoken",
			xsrfHeaderName: "X-CSRFToken",});
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const editChatName = async (id: number, title: string) => {
	try {
		await api.patch(`/chats/sessions/${id}/`, { title }, {withCredentials: true, xsrfCookieName: "csrftoken",
			xsrfHeaderName: "X-CSRFToken",});
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

// Консультация
export const sendMessage = async (
	chatId: string,
	question: string,
	language: string
  ) => {
	try {
	  const response = await api.post(
		`/ai_modules/sessions/${chatId}/ask/`,
		{ 
			question,
			language
		},
		{
		  withCredentials: true,
		  xsrfCookieName: "csrftoken",
				xsrfHeaderName: "X-CSRFToken",
		}
	  );
  
	  return response.data;
	} catch (error: any) {
	  const status = error.response?.status;

	  if (status === 502) {
		console.error("Backend unavailable:", error);
		console.log(error)
  
		return {
		  success: false,
		  message: "Сервер временно недоступен",
		};
	  }
  
	  console.error("Send message error:", error);
  
	  return {
		success: false,
		message: "Произошла ошибка",
	  };
	}
};

// Запрос на список и на проверку заполненой формы
export const createDocument = async (chatId: string, action: string, question: string, language:string) => {
	try {
		const response = await api.post(
			`/ai-documents/sessions/${chatId}/documents/`,
			{
				action,
				question,
				language
			},
			{
				withCredentials: true,
				xsrfCookieName: "csrftoken",
				xsrfHeaderName: "X-CSRFToken",
			},
		);

		return response.data;
	} catch (error: any) {
		console.log("Action error", error);
	}
};

// Генерация документа
export const generateDocument = async (chatId: string, templateName: string, values: Record<string, string>,language:string) => {
	try {
		const response = await api.post(
			`/ai-documents/sessions/${chatId}/documents/`,
			{
				action: "generate",
				template_name: templateName,
				values: values,
				language
			},
			{
				withCredentials: true,
				xsrfCookieName: "csrftoken",
				xsrfHeaderName: "X-CSRFToken",
			},
		);

		return response.data;
	} catch (error) {
		console.log("Generate error: ", error);
	}
};

// Калькулятор
export const attorneyPrice = async (chatId: string, question: string, language:string) => {
	try {
		const response = await api.post(
			`/ai_modules/sessions/${chatId}/attorney-price/`,
			{
				question,
				language
			},
			{ 
				withCredentials: true,
				xsrfCookieName: "csrftoken",
				xsrfHeaderName: "X-CSRFToken",
			},
		);

		return response.data;
	} catch (error) {
		console.log("Error: ", error);
	}
};

// Шанс побед
export const articleWinChance = async (chatId: string, question: string, language: string) => {
	try {
		const response = await api.post(
			`/ai_modules/sessions/${chatId}/article-win-chance/`,
			{
				question,
				language
			},
			{ 
				withCredentials: true,
				xsrfCookieName: "csrftoken",
				xsrfHeaderName: "X-CSRFToken",
			},
		);
		return response.data;
	} catch (error) {
		console.log("Error: ", error);
	}
};

// Поиск юристов
export const topLawyers = async (chatId: string, question: string, top_l: number, language:string) => {
	try {
		const response = await api.post(
			`/ai_modules/sessions/${chatId}/top-lawyers/`,
			{
				question,
				top_l,
				language
			},
			{
				withCredentials: true,xsrfCookieName: "csrftoken",
				xsrfHeaderName: "X-CSRFToken",
			},
		);

		return response.data;
	} catch (error) {
		console.log("Error: ", error);
	}
};

// Создание чата
export const postChat = async (title: string) => {
	try {
		const response = await api.post(`/chats/sessions/create/`, {
			title
		},
		{
			withCredentials: true,
			xsrfCookieName: "csrftoken",
				xsrfHeaderName: "X-CSRFToken",
		}
	);

		return response.data.data;
	} catch (error: any) {
		console.log("catched error: ", error);
		return null;
	}
};

// Делаем запрос гет чтобы получить данные с чата айди
export const getChatMessages = async (chatId: string) => {
	try {
		const response = await api.get(`/chats/sessions/${chatId}/`,
			{
				withCredentials: true,xsrfCookieName: "csrftoken",
				xsrfHeaderName: "X-CSRFToken",
			}
		);
		console.log(response.data.data.results.data.messages);
		return response.data.data.results.data.messages;
	} catch (error) {
		console.error("Ошибка при получении сообщений:", error);
		return [];
	}
};
