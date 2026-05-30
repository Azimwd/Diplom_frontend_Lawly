// Chat.tsx
import { useUser } from "../context/UserContext";
import React, { useEffect, useRef, useState } from "react";
import Dialog from "./Dialog";
import "../styles/scrollArea.css";
import "../styles/dialogScroll.css";
import { ArrowUp, Plus, SquareStop } from "lucide-react";
import { generateDocument, getChatMessages } from "../api/chats";
import { useParams, useNavigate } from "react-router-dom";
import ServiceSelector from "./ServiceSelector";
import { useChatActions } from "./hook/useChatActions";
import type { Message } from "./hook/types";
import { translations, type Language } from "../utils/translations";

interface ChatProps {
	onChatCreated: () => void;
}

// ... интерфейсы оставляем без изменений ...
interface ChatHistoryMessage {
	role: "user" | "ai" | "assistant" | string;
	content: string;
}
interface DocumentItem {
	template_name: string;
	title: string;
}
interface DocumentField {
	key: string;
	label: string;
	hint: string;
	required: boolean;
}
interface Lawyer {
	id?: number;
	name: string;
	specialization?: string;
	rating?: number;
	price?: number;
	experience?: number;
	city?: string;
	description?: string;
}
interface ParsedAiMessage {
	type?: string;
	answer?: string;
	reply?: string;
	text?: string;
	documents?: DocumentItem[];
	fields?: DocumentField[];
	document_title?: string;
	documentTitle?: string;
	template_name?: string;
	templateName?: string;
	win_rate?: number;
	loss_rate?: number;
	article?: string;
	file_url?: string;
	lawyers?: Lawyer[];
}

export default function Chat({ onChatCreated }: ChatProps) {
	const [mode, setMode] = useState<"chat" | "service" | "calculator" | "winChance" | "topLawyer">("chat");
	const [prompt, setPrompt] = useState("");
	const [isMoved, setIsMoved] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);
	const [loadingMessages, setLoadingMessages] = useState(false);
	const [isAiLoading, setIsAiLoading] = useState(false);
	const [isTrialExpired, setIsTrialExpired] = useState(false);
	const [visibleServices, setVisibleServices] = useState(false);
	const [, setIsDocCreating] = useState(false);
	const [isStopped, setIsStopped] = useState(false);
	const [servicePlaceholder, setServicePlaceholder] = useState("");

	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const servicesRef = useRef<HTMLDivElement | null>(null);
	const aiMessageIndexRef = useRef<number | null>(null);
	const justCreatedChatRef = useRef(false);

	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { profile } = useUser();

	const lang = (profile?.language as Language) || "ru";
	const t = translations[lang].chat;

	// ... логика useEffect и обработчики (handleCalculator и т.д.) остаются прежними ...
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
				setVisibleServices(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		const loadHistory = async () => {
			if (!id) {
				setMessages([]);
				setIsMoved(false);
				return;
			}
			if (justCreatedChatRef.current) {
				justCreatedChatRef.current = false;
				return;
			}
			setMessages((prev) => [...prev, { role: "ai", text: t.loadingDoc, type: "loading" }]);
			setLoadingMessages(true);
			const startTime = Date.now();
			try {
				const session = (await getChatMessages(id)) as ChatHistoryMessage[];
				const formattedMessages = session
					.map((msg: ChatHistoryMessage): Message | null => {
						if (msg.role === "user") return { role: "user", text: msg.content };
						try {
							const parsed = JSON.parse(msg.content) as ParsedAiMessage;
							if (parsed?.type === "document_values") return null;
							if (parsed && typeof parsed === "object" && parsed.type) {
								return {
									role: "ai",
									text: parsed.answer || parsed.reply || parsed.text || "",
									type: parsed.type,
									documents: parsed.documents,
									fields: parsed.fields,
									documentTitle: parsed.document_title || parsed.documentTitle,
									templateName: parsed.template_name || parsed.templateName,
									winRate: parsed.win_rate,
									lossRate: parsed.loss_rate,
									article: parsed.article,
									fileUrl: parsed.file_url,
									lawyers: parsed.lawyers,
								};
							}
						} catch (error: unknown) {
							console.warn("Message content is not JSON:", error);
						}
						return { role: "ai", text: msg.content };
					})
					.filter((msg): msg is Message => msg !== null);
				setMessages(formattedMessages.reverse());
				setIsMoved(true);
			} catch (error) {
				console.error("Ошибка загрузки истории:", error);
			} finally {
				const elapsed = Date.now() - startTime;
				setTimeout(() => setLoadingMessages(false), Math.max(1000 - elapsed, 0));
			}
		};
		loadHistory();
	}, [id, t.loadingDoc]);

	useEffect(() => {
		const el = textareaRef.current;
		if (!el) return;
		el.style.height = "20px";
		el.style.height = Math.min(el.scrollHeight, 100) + "px";
	}, [prompt]);

	const { submitPrompt, submitWinChance, submitSD, submitCalculator, submitTopLawyer } = useChatActions({
		id,
		prompt,
		isAiLoading,
		isStopped,
		setPrompt,
		setMessages,
		setIsAiLoading,
		setIsMoved,
		setServicePlaceholder,
		setJustCreatedChat: (val) => {
			justCreatedChatRef.current = val;
		},
		setMode,
		setIsDocCreating,
		onChatCreated,
		aiMessageIndexRef,
		setIsTrialExpired,
	});

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			const actions = {
				service: submitSD,
				calculator: submitCalculator,
				winChance: submitWinChance,
				topLawyer: submitTopLawyer,
				chat: submitPrompt,
			};
			actions[mode]();
		}
	};

	const handleCalculator = () => {
		setMode("calculator");
		setServicePlaceholder(t.modes.calculator);
		setVisibleServices(false);
		setIsMoved(true);
		setServicePlaceholder("Режим калькулятора...");
	};
	const handleWinChance = () => {
		setMode("winChance");
		setServicePlaceholder(t.modes.calculator);
		setVisibleServices(false);
		setIsMoved(true);
		setServicePlaceholder("Режим анализа шанса...");
	};
	const handleDocCreationStart = () => {
		setMode("service");
		setServicePlaceholder(t.modes.calculator);
		setIsDocCreating(true);
		setVisibleServices(false);
		setIsStopped(false);
		setServicePlaceholder("Режим создания документа...");
	};
	const handleTopLawyer = () => {
		setMode("topLawyer");
		setServicePlaceholder(t.modes.calculator);
		setVisibleServices(false);
		setIsMoved(true);
		setServicePlaceholder("Режим поиска юристов...");
	};
	const switchToChat = () => {
		setMode("chat");
		setServicePlaceholder("");
		setIsAiLoading(false);
		setIsStopped(true);
		setVisibleServices(false);
		setIsDocCreating(false);
		setMessages((prev) => {
			if (aiMessageIndexRef.current === null) return prev;
			const updated = [...prev];
			updated.splice(aiMessageIndexRef.current, 1);
			return updated;
		});
		aiMessageIndexRef.current = null;
	};

	return (
		<div className="relative flex flex-col items-center h-[100dvh] w-full bg-gray-50 dark:bg-[#0D0D0D] overflow-hidden">
			{/* Верхняя часть с сообщениями */}
			<div className="flex-1 overflow-y-auto mt-2 pt-6 pb-[180px] dialog-scroll w-full max-w-5xl px-4">
				<Dialog
					messages={messages}
					loading={loadingMessages}
					isTyping={isAiLoading}
					isStoped={isStopped}
					onChooseDoc={(doc) => {
						setMessages((prev) =>
							prev.map((msg) =>
								msg.type === "documents_list" ? { ...msg, type: "text", documents: undefined } : msg,
							),
						);
						setPrompt(`Создай ${doc.title}`);
						textareaRef.current?.focus();
					}}
					onSubmitForm={async (formData, templateName) => {
						if (!id || !templateName) return;
						setMessages((prev) => [
							...prev,
							{ role: "ai", text: "Генерирую ваш документ...", type: "loading" },
						]);
						try {
							const res = await generateDocument(id, templateName, formData, profile?.language || "ru");
							if (res?.data?.type === "document_generated") {
								const baseUrl = "https://etha-hypercatalectic-rueben.ngrok-free.dev";
								setMessages((prev) => {
									const filtered = prev.filter((m) => m.type !== "loading");
									return [
										...filtered,
										{
											role: "ai",
											text: res.data.reply,
											type: "document_generated",
											documentTitle: res.data.document_title,
											fileUrl: baseUrl + res.data.file_url,
										},
									];
								});
								setIsDocCreating(false);
							}
						} catch (error) {
							console.error(error);
						}
					}}
				/>
			</div>

			{/* Контейнер ввода */}
			<div
				className={`fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-[45rem] transition-all duration-500 z-50
					${!isMoved ? "top-1/2 -translate-y-1/2 bottom-auto" : "bottom-8"}`}
			>
				<div className="bg-white dark:bg-[#1A1A1A] rounded-[24px] shadow-xl dark:shadow-none border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden">
					{/* Баннер триала */}
					{isTrialExpired && (
						<div className="w-full bg-red-50 dark:bg-red-950/20 border-b border-red-100 dark:border-red-900/30 px-6 py-2 flex items-center justify-between">
							<div className="flex items-center gap-2">
								<span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
								<span className="text-[12px] text-red-600 dark:text-red-400 font-medium">
									{t.trialExpired}
								</span>
							</div>
							<button
								onClick={() => navigate("/subscription")}
								className="text-[11px] text-red-700 dark:text-red-400 font-bold hover:underline"
							>
								{t.upgrade}
							</button>
						</div>
					)}

					<div className="px-5 pt-4">
						<textarea
							ref={textareaRef}
							value={prompt}
							onChange={(e) => setPrompt(e.target.value)}
							onKeyDown={handleKeyDown}
							disabled={isAiLoading}
							placeholder={t.placeholder}
							className="custom-scrollArea w-full bg-transparent border-none outline-none 
							text-gray-900 dark:text-gray-100 text-[15px] placeholder-gray-400 dark:placeholder-gray-500
							resize-none max-h-[200px] min-h-[40px]"
						/>
					</div>

					<div className="flex items-center justify-between px-4 py-3 bg-gray-50/50 dark:bg-transparent">
						<div className="flex items-center gap-3 relative flex-1">
							{/* Кнопка Плюс */}
							<button
								onClick={() => setVisibleServices((prev) => !prev)}
								className="h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-white/10 dark:hover:bg-white/20 text-gray-700 dark:text-gray-200 transition-colors cursor-pointer"
							>
								<Plus size={18} />
							</button>

							{/* Статус режима */}
							{servicePlaceholder && (
								<span className="text-[13px] text-blue-600 dark:text-blue-400 font-medium animate-pulse truncate max-w-[200px]">
									{servicePlaceholder}
								</span>
							)}

							{/* Выпадающее меню сервисов */}
							{visibleServices && (
								<div
									ref={servicesRef}
									className="absolute bottom-12 left-0 w-56 bg-white dark:bg-[#1F1F1F] border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl p-1.5 z-[60]"
								>
									<ServiceSelector
										onDocCreated={handleDocCreationStart}
										switchToChat={switchToChat}
										onCalculating={handleCalculator}
										onWinChance={handleWinChance}
										onTopLawyer={handleTopLawyer}
									/>
								</div>
							)}
						</div>

						{/* Кнопка Отправить / Стоп */}
						<button
							onClick={() => {
								if (isAiLoading) return switchToChat();
								const actions = {
									service: submitSD,
									calculator: submitCalculator,
									winChance: submitWinChance,
									topLawyer: submitTopLawyer,
									chat: submitPrompt,
								};
								actions[mode]();
							}}
							className={`flex items-center justify-center h-9 px-4 rounded-xl font-medium transition-all cursor-pointer
								${
									isAiLoading
										? "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20"
										: "bg-gray-900 dark:bg-gray-100 hover:bg-black dark:hover:bg-white text-white dark:text-black shadow-lg"
								}`}
						>
							{isAiLoading ? (
								<div className="flex items-center gap-2">
									<SquareStop size={16} fill="currentColor" />
									<span className="text-sm">Стоп</span>
								</div>
							) : (
								<div className="flex items-center gap-2">
									<ArrowUp size={16} strokeWidth={2.5} />
									<span className="text-sm">Отправить</span>
								</div>
							)}
						</button>
					</div>
				</div>
				<p className="text-center text-[11px] text-gray-400 mt-3 dark:text-gray-500">
					ИИ может совершать ошибки. Проверяйте важную информацию.
				</p>
			</div>
		</div>
	);
}
