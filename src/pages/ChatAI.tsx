import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

export default function ChatAI() {
	const [refreshChats, setRefreshChats] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Проверяем, показывали ли мы уже загрузку в этой сессии
		const hasLoadedBefore = sessionStorage.getItem("chatLoaded");

		if (!hasLoadedBefore) {
			// Если нет - ждем 2 секунды, затем показываем чат
			const timer = setTimeout(() => {
				setIsLoading(false);
				sessionStorage.setItem("chatLoaded", "true");
			}, 2000);
			return () => clearTimeout(timer);
		} else {
			// Если уже показывали (например, при обновлении страницы), грузим сразу
			setIsLoading(false);
		}
	}, []);

	if (isLoading) {
		return (
			<div className="flex flex-col h-[100vh] w-full items-center justify-center bg-black">
				<h2 className="text-[#ffffff] text-[50px] font-bold tracking-[-0.5px] ">LAWLY</h2>
			</div>
		);
	}

	// Основной интерфейс
	return (
		<div className="flex lg:flex h-[100vh] w-full">
			<Sidebar refreshChats={refreshChats} />
			<Chat onChatCreated={() => setRefreshChats((prev) => prev + 1)} />
		</div>
	);
}
