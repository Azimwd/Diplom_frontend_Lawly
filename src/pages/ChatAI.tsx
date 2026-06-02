import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

export default function ChatAI() {
	const [refreshChats, setRefreshChats] = useState(0);
	const [isFading, setIsFading] = useState(false);
	const [animateColors, setAnimateColors] = useState(false); // Состояние для запуска цвета

	const [isVisible, setIsVisible] = useState(() => {
		return sessionStorage.getItem("showSplash") === "true";
	});

	useEffect(() => {
		if (isVisible) {
			sessionStorage.removeItem("showSplash");

			// Запускаем перекрашивание текста через 100мс после рендера экрана
			const colorTimer = setTimeout(() => {
				setAnimateColors(true);
			}, 100);

			const fadeTimer = setTimeout(() => {
				setIsFading(true);
			}, 1500);

			const removeTimer = setTimeout(() => {
				setIsVisible(false);
			}, 1800);

			return () => {
				clearTimeout(colorTimer);
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
					<h2 className="font-bold font-['Inter'] text-[50px] tracking-[-0.5px]">
						<b
							className={`transition-colors duration-700 ease-in-out ${
								animateColors ? "text-[#1A237E]" : "text-white"
							}`}
						>
							LAW
						</b>
						<b
							className={`transition-colors duration-700 ease-in-out delay-300 ${
								animateColors ? "text-[#BFA14A]" : "text-white"
							}`}
						>
							LY
						</b>
					</h2>
				</div>
			)}

			<div className="flex lg:flex h-[100vh] w-full">
				<Sidebar refreshChats={refreshChats} />
				<Chat onChatCreated={() => setRefreshChats((prev) => prev + 1)} />
			</div>
		</>
	);
}
