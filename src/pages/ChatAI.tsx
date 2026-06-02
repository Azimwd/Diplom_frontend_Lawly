import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

export default function ChatAI() {
	const [refreshChats, setRefreshChats] = useState(0);
	const [isFading, setIsFading] = useState(false);

	// Проверяем флаг прямо при создании компонента (синхронно), чтобы не было "моргания" приложения
	const [isVisible, setIsVisible] = useState(() => {
		return sessionStorage.getItem("showSplash") === "true";
	});

	useEffect(() => {
		if (isVisible) {
			// СРАЗУ удаляем флаг. Теперь при обновлении страницы (F5) анимации не будет
			sessionStorage.removeItem("showSplash");

			const fadeTimer = setTimeout(() => {
				setIsFading(true);
			}, 1500);

			const removeTimer = setTimeout(() => {
				setIsVisible(false);
			}, 1800);

			return () => {
				clearTimeout(fadeTimer);
				clearTimeout(removeTimer);
			};
		}
	}, [isVisible]);

	return (
		<>
			{isVisible && (
				<div
					className={`fixed inset-0 z-50 flex flex-col h-[100vh] w-full items-center justify-center bg-black transition-opacity duration-300 ease-in-out ${
						isFading ? "opacity-0" : "opacity-100"
					}`}
				>
					<h2 className="text-[#ffffff] text-[50px] font-bold tracking-[-0.5px]">LAWLY</h2>
				</div>
			)}

			<div className="flex lg:flex h-[100vh] w-full">
				<Sidebar refreshChats={refreshChats} />
				<Chat onChatCreated={() => setRefreshChats((prev) => prev + 1)} />
			</div>
		</>
	);
}
