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
	const eventSourceRef = useRef<EventSource | null>(null);
	const aiMessageIndexRef = useRef<number | null>(null);
	const justCreatedChatRef = useRef(false);

	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { profile } = useUser();

	const lang = (profile?.language as Language) || "ru";
	const t = translations[lang].chat;

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

			setMessages((prev) => [
				...prev,
				{
					role: "ai",
					text: t.loadingDoc,
					type: "loading",
				},
			]);
			setLoadingMessages(true);
			const startTime = Date.now();

			try {
				const session = (await getChatMessages(id)) as ChatHistoryMessage[];

				const formattedMessages = session
					.map((msg: ChatHistoryMessage): Message | null => {
						if (msg.role === "user") {
							return { role: "user", text: msg.content };
						}

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
				const minSkeletonTime = 1000;
				const delay = Math.max(minSkeletonTime - elapsed, 0);
				setTimeout(() => setLoadingMessages(false), delay);
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
		setServicePlaceholder("Режим калькулятора активирован...");
	};

	const handleWinChance = () => {
		setMode("winChance");
		setServicePlaceholder(t.modes.calculator);
		setVisibleServices(false);
		setIsMoved(true);
		setServicePlaceholder("Режим анализа шанса побед активирован...");
	};

	const handleDocCreationStart = () => {
		setMode("service");
		setServicePlaceholder(t.modes.calculator);
		setIsDocCreating(true);
		setVisibleServices(false);
		setIsStopped(false);
		setServicePlaceholder("Режим создания документа активирован...");
	};

	const handleTopLawyer = () => {
		setMode("topLawyer");
		setServicePlaceholder(t.modes.calculator);
		setVisibleServices(false);
		setIsMoved(true);
		setServicePlaceholder("Режим поиска топ юристов активирован...");
	};

	const switchToChat = () => {
		eventSourceRef.current?.close();
		setMode("chat");
		setServicePlaceholder(t.modes.calculator);
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
		setServicePlaceholder("");
	};

	return (
		<div className="relative flex flex-col items-center h-[100dvh] w-full bg-[#f6f6f6] dark:bg-[#0D0D0D] text-[#FFFFFF] overflow-hidden">
			<div className="flex items-center justify-center bg-[#f6f6f6] dark:bg-[#0D0D0D] text-[#FFFFFF] w-full transition-all duration-500">
				<div className="flex-1 overflow-y-auto mt-10 pt-6 pb-[150px] dialog-scroll w-full ">
					<Dialog
						messages={messages}
						loading={loadingMessages}
						isTyping={isAiLoading}
						isStoped={isStopped}
						onChooseDoc={(doc) => {
							setMessages((prev) =>
								prev.map((msg) =>
									msg.type === "documents_list"
										? { ...msg, type: "text", documents: undefined }
										: msg,
								),
							);
							setPrompt(`Создай ${doc.title}`);
							textareaRef.current?.focus();
						}}
						onSubmitForm={async (formData, templateName) => {
							if (!id || !templateName) return;

							setMessages((prev) => [
								...prev,
								{
									role: "ai",
									text: "Генерирую ваш документ, пожалуйста подождите...",
									type: "loading",
								},
							]);

							const userLanguage = profile?.language || "ru";

							try {
								const res = await generateDocument(id, templateName, formData, userLanguage);
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
												documentTitle: res.data.document_title || "Сгенерированный документ",
												fileUrl: baseUrl + res.data.file_url,
											},
										];
									});
									setIsDocCreating(false);
								}
							} catch (error) {
								console.error("Ошибка при генерации:", error);
							}
						}}
					/>
				</div>

				<div
					className={`rounded-[20px] max-w-[24rem] md:max-w-[45rem] w-full 
						absolute justify-between transition-all duration-350 bg-[#fff] dark:bg-[#1A1A1A] border-1 border-[#8294ca] dark:border-0
						${isMoved ? "mt-[750px] md:mt-[700px]" : "mt-0"}`}
				>
					{isTrialExpired && (
						<div className="w-full bg-[#242424] border-t border-x border-[#2A2A2A] rounded-t-[20px] px-[30px] py-[10px] flex items-center justify-between transition-colors duration-200">
							<div className="flex items-center gap-2">
								<span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
								<span className="text-[12px] text-red-500 animate-pulse font-medium tracking-wide">
									{t.trialExpired}
								</span>
							</div>
							<button
								onClick={() => navigate("/subscription")}
								className="text-[11px] text-gray-400 hover:text-white underline transition cursor-pointer animate-pulse"
							>
								{t.upgrade}
							</button>
						</div>
					)}
					<div>
						<textarea
							ref={textareaRef}
							value={prompt}
							onChange={(e) => setPrompt(e.target.value)}
							onKeyDown={handleKeyDown}
							disabled={isAiLoading}
							placeholder={t.placeholder}
							className="custom-scrollArea 
							border-none rounded-[20px] outline-none 
							placeholder:text-[#2f2f2f] dark:placeholder:text-[#f0f0f0] text-black dark:text-white text-[15px] 
							resize-none overflow-y-auto 
							max-h-[250px] w-full 
							pr-[15px] mt-[20px] bg-transparent  "
						/>
					</div>

					<div className="flex">
						<div className="px-[30px] py-[20px] flex justify-between items-center gap-2 w-full relative">
							<button
								onClick={() => setVisibleServices((prev) => !prev)}
								type="button"
								className="h-[30px] w-[30px] flex justify-center items-center rounded-[7px] bg-[#242424] hover:bg-[#555555] dark:bg-[#f0f0f0] cursor-pointer dark:hover:bg-[#c0c0c0] transition-colors"
							>
								<Plus strokeWidth={1.5} className="w-[18px] h-[18px] text-white dark:text-black" />
							</button>

							{servicePlaceholder && (
								<span className="text-[15px] text-gray-400 whitespace-nowrap animate-pulse select-none flex-1 truncate ml-2">
									{servicePlaceholder}
								</span>
							)}

							{visibleServices && (
								<div
									ref={servicesRef}
									className="absolute bottom-[60px] w-[195px] bg-[#1F1F1F] border border-[#2A2A2A] rounded-[12px] shadow-lg p-2 z-10"
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
								className={`flex justify-center items-center h-[30px] ml-auto w-[80px] rounded-[7px] cursor-pointer gap-1 transition-colors
								${isAiLoading ? "bg-red-500 hover:bg-red-700 text-white" : "bg-[#242424] hover:bg-[#555555] dark:bg-[#f0f0f0] dark:hover:bg-[#dbdbdb] dark:text-black text-white"}`}
							>
								{isAiLoading ? (
									<>
										<SquareStop className="w-[15px] h-[15px]" />
										<span className="text-[14px]">Stop</span>
									</>
								) : (
									<>
										<ArrowUp className="w-[15px] h-[15px]" />
										<span className="text-[14px]">Send</span>
									</>
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
