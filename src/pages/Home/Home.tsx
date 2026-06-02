import Lenis from "lenis";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { NavLink } from "react-router-dom";
import chatScr from "../../screens/image.png";
import activeselect from "../../assets/check.png";
import selector from "../../assets/chevron.png";
import TelegramAD from "./TelegramAD";
import WhyChooseLegion from "./WhyChooseLegion";
import Carousel from "./Carousel";
import Howitworks from "./Howitworks";
import Footer from "./Footer";

gsap.registerPlugin(ScrollTrigger);

const titles = [
	{
		label: "Assistant",
		screen: chatScr,
		description:
			"Your personal AI legal assistant. It helps clarify legal terms, analyze queries, and suggest possible solutions based on current laws.",
	},
	{
		label: "Document",
		screen: chatScr,
		description:
			"Upload contracts, agreements, and other legal documents for automatic analysis, risk detection, and clause improvement suggestions.",
	},
	{
		label: "Matching",
		screen: chatScr,
		description:
			"Get matched with qualified lawyers or legal experts based on your issue type, region, and specialization.",
	},
	{
		label: "Calculator",
		screen: chatScr,
		description:
			"Use smart legal calculators to estimate penalties, compensations, fines, or alimony based on case details.",
	},
	{
		label: "Search",
		screen: chatScr,
		description:
			"AI-powered legal search engine. Instantly find relevant laws, precedents, and document templates for your case.",
	},
];

export default function Home() {
	const [active, setActive] = useState("Assistant");
	const [dropdown, setDropdown] = useState(false);
	const featureContainerRef = useRef(null);

	const activeItem = titles.find((item) => item.label === active);
	const activeImage = activeItem ? activeItem.screen : chatScr;

	useEffect(() => {
		const lenis = new Lenis({
			lerp: 0.1,
			wheelMultiplier: 1,
			touchMultiplier: 1,
			smoothWheel: true,
			syncTouch: true,
		});

		lenis.on("scroll", ScrollTrigger.update);

		const update = (time: number) => {
			lenis.raf(time * 1000);
		};
		gsap.ticker.add(update);
		gsap.ticker.lagSmoothing(0);

		const handleAnchorClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const anchor = target.closest('a[href^="#"]');
			if (anchor) {
				e.preventDefault();
				const id = anchor.getAttribute("href");
				if (id && id !== "#") {
					lenis.scrollTo(id);
				}
			}
		};

		document.addEventListener("click", handleAnchorClick);

		return () => {
			lenis.destroy();
			gsap.ticker.remove(update);
			document.removeEventListener("click", handleAnchorClick);
		};
	}, []);

	useGSAP(
		() => {
			const isMobile = window.innerWidth < 768;

			gsap.from(featureContainerRef.current, {
				y: isMobile ? 50 : 150,
				opacity: 0,
				duration: 0.8,
				ease: "power3.out",
				scrollTrigger: {
					trigger: featureContainerRef.current,
					start: "top 50%",
					end: "top 50%",
					scrub: isMobile ? false : 1,
					toggleActions: "play none none reverse",
				},
			});
		},
		{ scope: featureContainerRef },
	);

	return (
		<div className="relative w-full overflow-x-hidden ">
			{/*  */}

			<header className="z-50 relative">
				<Header />
			</header>

			<section className="min-h-[50vh] md:min-h-screen flex flex-col items-center pt-[12vh] md:pt-[15vh] px-4 bg-gradient-to-b from-white via-gray-300 to-gray-500 overflow-hidden">
				<div className="flex flex-col justify-center items-center gap-5 mb-10 md:mb-24 text-center max-w-6xl w-full text-[#121212]">
					<h1 className="font-['Cinzel'] text-[32px] leading-tight md:text-[48px] font-bold px-2 ">
						Your intelligent legal partner — Reliable <br className="hidden md:block" /> Guidance for every
						step
					</h1>
					<p className="font-['Cinzel'] text-[14px] md:text-[16px] font-medium opacity-80">
						AI-powered legal assistance — fast, reliable, and always at your side.
					</p>
					<NavLink
						to="/chat"
						className="flex justify-center items-center w-[184px] h-[45px] bg-[#1A237E] rounded-[5px] text-white font-bold transition-all hover:bg-[#212ca1]"
					>
						TRY <span className="ml-1 group-hover:text-[#BFA14A]">LAWLY</span>
					</NavLink>
				</div>

				<div ref={featureContainerRef} className="flex flex-col items-center w-full max-w-[1250px]">
					<div className="flex flex-col items-center relative z-10 font-['Cinzel'] w-full">
						<h2 id="img" className="text-[18px] md:text-[48px] font-bold text-[#001A41] text-center">
							AI legal assistant features
						</h2>

						<div
							className="flex flex-col items-center justify-center px-4 pt-4 md:px-8 md:pt-8 rounded-t-[10px] w-full min-h-[250px] md:min-h-[575px]
                            shadow-[0_0_150px_rgba(99,120,241,0.35)]
                            bg-gradient-to-b from-blue-400/10 to-transparent bg-blue-600/20 backdrop-blur-[50px] border border-white/[0.12]"
						>
							<img
								src={activeImage}
								alt={active}
								className="max-w-[2000px] min-h-[300px] md:min-h-[575px] w-full h-full  rounded-t-[10px] object-cover shadow-2xl transition-opacity duration-300"
								draggable={false}
							/>
						</div>
					</div>
				</div>
			</section>

			{/* СЕКЦИЯ 2: Темный блок с навигацией по функциям (на всю ширину экрана) */}
			<section className="relative z-30 bg-[#001A41] w-full flex flex-col justify-center items-center gap-4 md:gap-5 py-8 md:py-10 px-4">
				{/* Десктопное меню */}
				<div className="max-w-[980px] hidden md:flex justify-between items-center border border-[#BFA14A] px-6 py-3 rounded-[26px] gap-[14px]">
					<div className="flex gap-[24px]">
						{titles.map((item, index) => (
							<button
								key={index}
								type="button"
								onClick={() => setActive(item.label)}
								className={`flex text-sm font-semibold px-[17px] py-1 rounded-[37px] transition-all duration-300 
								${
									active === item.label
										? "bg-[#BFA14A] text-[#0A1B3D] border border-[#BFA14A] cursor-pointer"
										: "text-white hover:text-[#BFA14A] hover:border-[#BFA14A] border border-transparent cursor-pointer"
								}
								${active !== item.label && item.label === "Search" ? "border border-[#BFA14A] cursor-pointer" : ""}`}
							>
								{item.label}
							</button>
						))}
					</div>
				</div>

				<div className="md:hidden relative w-full flex justify-center px-4">
					<div className="relative w-full max-w-[250px]">
						<button
							type="button"
							onClick={() => setDropdown((prev) => !prev)}
							className="bg-[#001A41] text-white border border-[#BFA14A] rounded-[28px] px-4 py-2 w-full text-center flex items-center justify-center "
						>
							<span className="ml-4 ">{active}</span>
							<img
								src={selector}
								alt="icon"
								className={`ml-2 transition-transform duration-300 w-4 ${
									dropdown ? "rotate-180" : "rotate-0"
								}`}
							/>
						</button>

						{dropdown && (
							<div className="absolute top-[110%] left-0 w-full bg-[#001A41] border border-[#BFA14A] rounded-[22px] shadow-lg z-900">
								{titles.map((item, i) => (
									<button
										key={i}
										onClick={() => {
											setActive(item.label);
											setDropdown(false);
										}}
										className={`w-full text-left px-4 py-2 transition-colors flex items-center justify-between
										${active === item.label ? "text-[#BFA14A]" : "text-white hover:text-[#BFA14A]"}`}
									>
										{item.label}
										{active === item.label && (
											<img src={activeselect} alt="icon" className="ml-2 w-4 h-4" />
										)}
									</button>
								))}
							</div>
						)}
					</div>
				</div>

				{/* Описание активного таба */}
				<div className="text-white text-[16px] max-w-[750px] w-full text-center px-4 min-h-[45px] mt-4 pb-25">
					{titles.map((item, index) => (
						<p key={index} className={`${active === item.label ? "block animate-fade-in" : "hidden"}`}>
							{item.description}
						</p>
					))}
				</div>
			</section>

			{/* СЕКЦИЯ 3: Реклама телеграм бота */}
			<section id="tg" className="relative z-30 bg-[#001A41] md:h-screen pt-10">
				<TelegramAD />
			</section>

			{/* СЕКЦИЯ 4: Показываем достойнства нашего ИИ */}
			<section
				id="dv"
				className="relative z-30 bg-gradient-to-b from-[#001A41] via-[#000c1d] to-[#000000] min-h-[200vh] pt-20 "
			>
				<WhyChooseLegion />
				<div className="flex justify-center items-center w-full">
					<p className=" text-lg md:text-2xl lg:text-2xl text-gray-300 leading-relaxed w-[85vw] md:w-[50vw] font-light tracking-wide font-['Inter'] text-center select-none">
						LAWLY combines advanced AI with expert legal insights to make legal support accessible,
						efficient, and secure — anytime, anywhere. <br /> We simplify complexity so you can focus on
						what truly matters.{" "}
					</p>
				</div>
			</section>

			{/* СЕКЦИЯ 5: Также достойнства но подробнее */}
			<section className="relative z-30 bg-[#000] min-h-screen pt-20 ">
				<Carousel />
			</section>

			{/* СЕКЦИЯ 6:  */}
			<section
				id="hiw"
				className="relative z-30 bg-gradient-to-b from-[#000000]  to-[#001A41] min-h-screen pt-20 "
			>
				<Howitworks />
			</section>

			{/* Футер */}
			<footer className="relative z-30  ">
				<Footer />
			</footer>

			{/*  */}
		</div>
	);
}
