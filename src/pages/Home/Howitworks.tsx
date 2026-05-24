import clsx from "clsx";
import { useState, useRef } from "react";
import chatScr from "../../screens/image.png";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Howitworks() {
	const tabs = [
		{
			title: "Ask question",
			description:
				"Describe your case or upload a legal document (PDF, DOCX, image). Supported formats: text, scanned documents, and photos.",
			img: chatScr,
		},
		{
			title: "AI Generate",
			description: "Our system analyzes the legal context of your request.",
			img: chatScr,
		},
		{
			title: "Expert Match",
			description: "Receive clear legal guidance tailored to your situation.",
			img: chatScr,
		},
		{
			title: "Take Action",
			description: "Download formatted legal drafts.",
			img: chatScr,
		},
	];

	const [activeIndex, setActiveIndex] = useState(0);
	const [displayIndex, setDisplayIndex] = useState(0);
	const imgRef = useRef(null);
	const { contextSafe } = useGSAP();

	const handleTabClick = contextSafe((index: number) => {
		if (index === activeIndex) return;

		setActiveIndex(index);
		gsap.killTweensOf(imgRef.current);

		gsap.to(imgRef.current, {
			y: 50,
			opacity: 0,
			duration: 0.3,
			ease: "power2.in",
			onComplete: () => {
				setDisplayIndex(index);
				gsap.to(imgRef.current, {
					y: 0,
					opacity: 1,
					duration: 0.4,
					ease: "power2.out",
				});
			},
		});
	});

	return (
		<section className="flex min-h-screen py-12 md:py-20">
			<div className="flex flex-col items-center w-full px-4 md:px-10">
				{/* Заголовок */}
				<div className="flex flex-col justify-center items-center max-w-[900px]">
					<h1 className="font-['Cinzel'] text-[32px] md:text-[48px] font-bold text-[#ffffff] text-center">
						How it works
					</h1>
					<div className="mt-4 flex flex-col gap-2">
						<h5 className="text-[#FFFFFF] text-[16px] md:text-[20px] text-center leading-snug">
							Our AI-driven assistant helps you navigate legal issues with clarity and confidence.
						</h5>
						<h5 className="text-[#ffffff] text-[16px] md:text-[20px] text-center leading-snug opacity-80">
							Simply ask a question or upload a document — we’ll analyze it, highlight key points, and
							guide you to the best next step.
						</h5>
					</div>
				</div>

				{/* Контентная часть */}
				<div className="flex flex-col lg:flex-row mt-10 md:mt-[50px] font-['Inter'] w-full max-w-[1400px] gap-8 lg:gap-10 items-stretch justify-center overflow-hidden">
					{/* Список табов */}
					<div className="flex flex-col w-full lg:w-[400px] xl:w-[450px] shrink-0">
						{tabs.map((tab, index) => (
							<div
								key={index}
								onClick={() => handleTabClick(index)}
								className={clsx(
									"cursor-pointer w-full p-5 rounded-[12px] mb-4 duration-300 transition-all flex flex-col justify-center",
									activeIndex === index
										? "bg-[#1A237E] text-white shadow-lg"
										: "bg-[#EDEFF2] text-[#001A41] hover:bg-[#DDE0E6]",
								)}
							>
								<p className="text-[18px] md:text-[22px] font-bold">{tab.title}</p>
								{activeIndex === index && (
									<p className="text-[#D5D5D5] text-[15px] md:text-[18px] mt-3 animate-in fade-in duration-500">
										{tab.description}
									</p>
								)}
							</div>
						))}
					</div>

					{/* Контейнер для Изображения (обеспечивает одинаковый размер) */}
					<div className="flex-1 flex justify-center items-start w-full h-full max-w-full">
						<div className="relative w-full h-[300px] md:h-[500px] lg:h-[600px] xl:h-[650px] overflow-hidden rounded-[12px] border-white/20 border shadow-2xl">
							<img
								ref={imgRef}
								src={tabs[displayIndex].img}
								alt={tabs[displayIndex].title}
								className="absolute inset-0 w-full h-full object-cover"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
