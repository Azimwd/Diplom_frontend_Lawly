import clsx from "clsx";
import { Ellipsis, SquarePen } from "lucide-react";
import "../styles/scroll.css";
import { useEffect, useState } from "react";
import { getListOfChat, type ChatSession } from "../api/chats";
import EditName from "./EditName";
import { useNavigate } from "react-router-dom";
import { translations, type Language } from "../utils/translations";
import { useUser } from "../context/UserContext";

interface SidebarProps {
	isOpen: boolean;
}

type PopoverState = {
	chatId: number;
	top: number;
	left: number;
} | null;

interface SidebarProps {
	isOpen: boolean;
	refreshChats: number;
	onChatSelect?: () => void;
}

export default function ListOfChats({ isOpen, refreshChats, onChatSelect }: SidebarProps) {
	const [chats, setChats] = useState<ChatSession[]>([]);
	const [popover, setPopover] = useState<PopoverState>(null);
	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();

	const { profile } = useUser();

	// ПРИОРИТЕТ ДЛЯ ЯЗЫКА: profile -> localStorage -> "ru"
	const savedLang = localStorage.getItem("language") as Language | null;
	const langKey = (profile?.language as Language) || savedLang || "ru";
	const t = translations[langKey].sidebar;

	useEffect(() => {
		const fetchChats = async () => {
			setLoading(true);
			const startTime = Date.now();
			const minSkeletonTime = 1000;

			try {
				const data = await getListOfChat();

				const elapsed = Date.now() - startTime;
				const remainingDelay = Math.max(0, minSkeletonTime - elapsed);

				setTimeout(() => {
					if (data) setChats(data);
					setLoading(false);
				}, remainingDelay);
			} catch (error) {
				console.error("Ошибка загрузки чатов:", error);
				setLoading(false);
			}
		};

		fetchChats();
	}, [refreshChats]);

	useEffect(() => {
		const handleClick = () => setPopover(null);

		if (popover) {
			window.addEventListener("click", handleClick);
		}

		return () => {
			window.removeEventListener("click", handleClick);
		};
	}, [popover]);

	return (
		<div className="mt-[45px] flex flex-col h-full max-h-[80vh] min-w-[200px] ml-[13px] mr-[11px]">
			<button
				onClick={() => {
					navigate("/chat");
				}}
				className={clsx(
					"flex items-center gap-3 p-1 rounded-md hover:bg-gray-200 dark:hover:bg-[#525252] transition-all duration-300 cursor-pointer h-[36px] w-[36px] px-1.5",
					isOpen ? "w-full max-w-[305px] justify-start" : "w-[36px]",
				)}
			>
				<SquarePen className="h-[22px] w-[22px] flex-shrink-0 ml-[1px]" strokeWidth={1.5} />
				<span
					className={clsx(
						"transition-opacity duration-100 whitespace-nowrap text-[14px]",
						isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
					)}
				>
					{t.newChat}
				</span>
			</button>

			<div
				className={clsx(
					"mt-6 mb-2 px-1 text-[12px] text-[#525252] uppercase font-bold transition-opacity",
					isOpen ? "visible" : "hidden",
				)}
			>
				{t.listofChat}
			</div>

			<div
				className={clsx(
					"flex-1 overflow-y-auto overflow-x-hidden custom-scroll space-y-2 listofChats",
					!isOpen && "hidden",
				)}
			>
				{loading &&
					Array.from({ length: 6 }).map((_, index) => (
						<div key={index} className="skeleton-anim flex items-center py-2 px-2 rounded-md">
							<div className="h-7 w-full bg-gray-300 dark:bg-[#2a2a2a] rounded-md" />
						</div>
					))}

				{!loading &&
					chats.map((chat) => (
						<div
							key={chat.id}
							onClick={() => {
								navigate(`/chat/${chat.id}`);
								onChatSelect?.();
							}}
							className={clsx(
								"group relative flex items-center justify-between py-2 px-2 rounded-md  hover:bg-gray-200 dark:hover:bg-[#424242] cursor-pointer text-[13px] w-full",
								isOpen && "hover:pr-9",
							)}
						>
							<div className="flex items-center overflow-hidden">
								<span
									className={clsx(
										"truncate transition-opacity duration-300",
										isOpen ? "visible" : "hidden",
									)}
								>
									{chat.title}
								</span>
							</div>

							{isOpen && (
								<button
									className="cursor-pointer absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
									onClick={(e) => {
										e.stopPropagation();

										const rect = e.currentTarget.getBoundingClientRect();

										setPopover({
											chatId: chat.id,
											top: rect.top - 10,
											left: rect.left + 25,
										});
									}}
								>
									<Ellipsis className="h-4 w-4" />
								</button>
							)}
						</div>
					))}
				{popover && (
					<EditName
						chatId={popover.chatId}
						top={popover.top}
						left={popover.left}
						onClose={() => setPopover(null)}
						onDelete={(id) => setChats((prev) => prev.filter((chat) => chat.id !== id))}
						onRename={(id, newTitle) =>
							setChats((prev) =>
								prev.map((chat) => (chat.id === id ? { ...chat, title: newTitle } : chat)),
							)
						}
					/>
				)}
			</div>
		</div>
	);
}
