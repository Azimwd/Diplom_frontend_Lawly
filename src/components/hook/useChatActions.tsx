import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { postChat, sendMessage, createDocument, articleWinChance, attorneyPrice, topLawyers } from "../../api/chats";
import type { Message } from "./types";

interface UseChatActionsProps {
	id: string | undefined;
	prompt: string;
	isAiLoading: boolean;
	isStopped: boolean;
	setPrompt: (val: string) => void;
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
	setIsAiLoading: (val: boolean) => void;
	setIsMoved: (val: boolean) => void;
	setServicePlaceholder: (val: string) => void;
	setJustCreatedChat: (val: boolean) => void;
	setMode: (val: "chat" | "service" | "calculator" | "winChance" | "topLawyer") => void;
	setIsDocCreating: (val: boolean) => void;
	onChatCreated: () => void;
	aiMessageIndexRef: React.MutableRefObject<number | null>;
}

export const useChatActions = ({
	id,
	prompt,
	isAiLoading,
	isStopped,
	setPrompt,
	setMessages,
	setIsAiLoading,
	setIsMoved,
	setServicePlaceholder,
	setJustCreatedChat,
	setMode,
	setIsDocCreating,
	onChatCreated,
	aiMessageIndexRef,
}: UseChatActionsProps) => {
	const navigate = useNavigate();
	const { profile } = useUser();

	const ensureChatId = async (currentPrompt: string) => {
		if (!id) {
			const title = currentPrompt.split(" ").slice(0, 5).join(" ");
			const newChat = await postChat(title);
			const newId = newChat.id.toString();
			setJustCreatedChat(true);
			onChatCreated();
			navigate(`/chat/${newId}`, { replace: true });
			return newId;
		}
		return id;
	};

	const prepareSending = (userText: string) => {
		if (userText.trim().length === 0 || isAiLoading) return false;
		setIsMoved(true);
		setPrompt("");

		setMessages((prev) => {
			const updated: Message[] = [
				...prev,
				{ role: "user", text: userText },
				{ role: "ai", text: "Загрузка...", type: "loading" },
			];
			aiMessageIndexRef.current = updated.length - 1;
			return updated;
		});
		setIsAiLoading(true);
		return true;
	};

	const submitPrompt = async () => {
		const currentPrompt = prompt;
		if (!prepareSending(currentPrompt)) return;

		const userLanguage = profile?.language || "ru";

		try {
			const activeId = await ensureChatId(currentPrompt);
			const res = await sendMessage(activeId, currentPrompt, userLanguage);
			const answer = res?.data?.answer;

			updateAiMessage({ text: answer || "На данный момент Lawly не доступна.", type: "text" });
		} catch (error) {
			console.error(error);
			updateAiMessage({ text: "Ошибка при отправке.", type: "error" });
		} finally {
			setIsAiLoading(false);
		}
	};

	const submitWinChance = async () => {
		const currentPrompt = prompt;
		setServicePlaceholder("Анализируем шанс победы...");
		if (!prepareSending(currentPrompt)) return;

		const userLanguage = profile?.language || "ru";

		try {
			const activeId = await ensureChatId(currentPrompt);
			const res = await articleWinChance(activeId, currentPrompt, userLanguage);
			const parsed = typeof res?.data?.content === "string" ? JSON.parse(res.data.content) : res?.data?.content;

			updateAiMessage({
				text: parsed?.answer || "На данный момент Lawly не доступна.",
				type: parsed?.type,
				winRate: parsed?.win_rate,
				lossRate: parsed?.loss_rate,
				article: parsed?.article,
			});
		} catch (error) {
			console.error(error);
			updateAiMessage({ text: "На данный момент Lawly не доступна.", type: "error" });
		} finally {
			setIsAiLoading(false);
			setServicePlaceholder("");
		}
	};

	const submitSD = async () => {
		if (prompt.trim().length === 0 || isAiLoading || isStopped) return;

		const currentPrompt = prompt;
		setServicePlaceholder("Создается документ...");
		setPrompt("");
		setIsMoved(true);

		const userLanguage = profile?.language || "ru";

		setMessages((prev) => [...prev, { role: "user", text: currentPrompt }]);

		try {
			const activeId = await ensureChatId(currentPrompt);
			const res = await createDocument(activeId, "ask", currentPrompt, userLanguage);
			setIsAiLoading(false);

			if (res.data?.type === "documents_list") {
				setMessages((prev) => [
					...prev,
					{ role: "ai", text: res.data.reply, type: res.data.type, documents: res.data.documents },
				]);
				setMode("service");
				setIsDocCreating(true);
			} else if (res.data?.type === "document_fields") {
				setMessages((prev) => [
					...prev,
					{
						role: "ai",
						text: res.data.reply,
						type: res.data.type,
						fields: res.data.fields,
						documentTitle: res.data.document_title,
						templateName: res.data.template_name,
					},
				]);
				setMode("service");
				setIsDocCreating(false);
			} else if (res?.data?.type === "document_generated") {
				const baseUrl = "https://etha-hypercatalectic-rueben.ngrok-free.dev";
				setMessages((prev) => [
					...prev,
					{
						role: "ai",
						text: res.data.reply,
						type: "document_generated",
						documentTitle: res.data.document_title || "Документ",
						fileUrl: baseUrl + res.data.file_url,
					},
				]);
			}
		} catch (error) {
			console.log("Ошибка SD: ", error);
		} finally {
			setServicePlaceholder("");
		}
	};

	const submitCalculator = async () => {
		const currentPrompt = prompt;
		setServicePlaceholder("Расчет выполняется...");
		if (!prepareSending(currentPrompt)) return;

		const userLanguage = profile?.language || "ru";

		try {
			const activeId = await ensureChatId(currentPrompt);
			const res = await attorneyPrice(activeId, currentPrompt, userLanguage);
			updateAiMessage({ text: res?.data?.answer || "На данный момент Lawly не доступна.", type: "calculator" });
		} catch {
			updateAiMessage({ text: "Ошибка расчета.", type: "error" });
		} finally {
			setIsAiLoading(false);
			setServicePlaceholder("");
		}
	};

	const submitTopLawyer = async () => {
		const currentPrompt = prompt;
		setServicePlaceholder("Идет поиск топ юристов...");
		if (!prepareSending(currentPrompt)) return;

		const userLanguage = profile?.language || "ru";

		try {
			const activeId = await ensureChatId(currentPrompt);
			const res = await topLawyers(activeId, currentPrompt, 5, userLanguage);

			const parsed = typeof res?.data?.content === "string" ? JSON.parse(res.data.content) : res?.data;

			updateAiMessage({
				text: parsed?.answer || parsed?.reply || res?.data?.answer || "Результаты поиска:",
				type: parsed?.type || "top_lawyers",
				lawyers: parsed?.lawyers || [],
			});
		} catch {
			updateAiMessage({ text: "На данный момент Lawly не доступна.", type: "error" });
		} finally {
			setIsAiLoading(false);
			setServicePlaceholder("");
		}
	};

	const updateAiMessage = (data: Partial<Message>) => {
		setMessages((prev) => {
			if (aiMessageIndexRef.current === null) return prev;
			const updated = [...prev];
			updated[aiMessageIndexRef.current] = {
				...updated[aiMessageIndexRef.current],
				...data,
			};
			return updated;
		});
	};

	return {
		submitPrompt,
		submitWinChance,
		submitSD,
		submitCalculator,
		submitTopLawyer,
	};
};
