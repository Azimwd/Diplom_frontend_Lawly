import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { FileSearch, Zap, ShieldCheck, BadgeDollarSign, FileCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
	{
		title: "Doc Analysis",
		icon: FileSearch,
		description:
			"Lawly help whenever you need it — our assistant never sleeps. Get instant guidance and document analysis at any hour.",
		colors: {
			shadow: "hover:shadow-[0_0_100px_rgba(59,130,246,0)]",
			border: "hover:border-white/50",
			blob: "bg-blue-500/40",
			icon: "group-hover:text-blue-400 group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]",
			gradient: "from-blue-600/20",
		},
	},
	{
		title: "Instant Answers",
		icon: Zap,
		description:
			"No more waiting for consultations. Legion processes and responds within seconds, giving you clarity fast.",
		colors: {
			shadow: "hover:shadow-[0_0_0px_rgba(234,179,8,0)]", // Желтый
			border: "hover:border-white/50",
			blob: "bg-yellow-500/40",
			icon: "group-hover:text-yellow-400 group-hover:drop-shadow-[0_0_15px_rgba(234,179,8,0.8)]",
			gradient: "from-yellow-600/20",
		},
	},
	{
		title: "Time & Cost Efficiency",
		icon: BadgeDollarSign,
		description:
			"Cut legal expenses without sacrificing quality. AI automation saves hours and reduces unnecessary costs.",
		colors: {
			shadow: "hover:shadow-[0_0_0px_rgba(34,197,94,0)]", // Зеленый
			border: "hover:border-white/50",
			blob: "bg-green-500/40",
			icon: "group-hover:text-green-400 group-hover:drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]",
			gradient: "from-green-600/20",
		},
	},
	{
		title: "Data Security",
		icon: ShieldCheck,
		description:
			"Your privacy comes first. All conversations and documents are encrypted and protected by enterprise-grade security.",
		colors: {
			shadow: "hover:shadow-[0_0_0px_rgba(168,85,247,0)]", // Фиолетовый
			border: "hover:border-white/50",
			blob: "bg-purple-500/40",
			icon: "group-hover:text-purple-400 group-hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]",
			gradient: "from-purple-600/20",
		},
	},
	{
		title: "Verified by Experts",
		icon: FileCheck,
		description:
			"Every feature is built in collaboration with licensed legal professionals, ensuring accuracy and reliability you can trust.",
		colors: {
			shadow: "hover:shadow-[0_0_0px_rgba(6,182,212,0)]", // Бирюзовый
			border: "hover:border-white/50",
			blob: "bg-cyan-500/40",
			icon: "group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]",
			gradient: "from-cyan-600/20",
		},
	},
];

export default function Carousel() {
	const containerAdv = useRef<HTMLElement | null>(null);
	const hdRef = useRef<HTMLDivElement | null>(null);

	useGSAP(
		() => {
			const hd = hdRef.current;
			if (!hd) return;

			const items = gsap.utils.toArray<HTMLElement>(".hd_item");

			// Функция для получения актуальных размеров
			const getValues = () => {
				const itemWidth = items[0].offsetWidth;
				const containerWidth = window.innerWidth;
				const gap = parseFloat(getComputedStyle(hd).columnGap) || 0;

				// Центрирование: паддинг равен половине свободного места экрана за вычетом половины карточки
				const padding = (containerWidth - itemWidth) / 2;

				// Расстояние, на которое нужно сдвинуть ленту
				// (Ширина карточки + отступ) * (количество карточек - 1)
				const totalMovement = (itemWidth + gap) * (items.length - 1);

				return { padding, totalMovement, itemWidth };
			};

			// Устанавливаем начальные паддинги для центрирования первой и последней карточки
			const { padding } = getValues();
			gsap.set(hd, { paddingLeft: padding, paddingRight: padding });

			const tl = gsap.to(hd, {
				x: () => -getValues().totalMovement, // Используем функцию, чтобы GSAP пересчитывал значение
				ease: "none",
				scrollTrigger: {
					trigger: containerAdv.current,
					pin: true,
					scrub: 0.1,
					invalidateOnRefresh: true, // Важно для респонсива
					snap: {
						snapTo: 1 / (items.length - 1),
						duration: { min: 0.1, max: 0.3 },
						delay: 0,
					},
					end: () => "+=" + getValues().totalMovement,
				},
			});

			return () => {
				tl.kill();
			};
		},
		{ scope: containerAdv },
	);

	return (
		<section className="min-h-screen flex items-center overflow-hidden bg-[#000] select-none" ref={containerAdv}>
			<div className="flex gap-12 lg:gap-20 xl:gap-50 hd w-max" ref={hdRef}>
				{features.map((item, i) => {
					const Icon = item.icon;

					return (
						<div
							key={i}
							className={`hd_item shrink-0 group relative bg-[#050505] 
								border border-white/10 p-10 
								h-[380px] max-w-[350px] md:max-w-[550px] lg:w-[550px] 
								flex flex-col justify-end items-start transition-all duration-500  overflow-hidden rounded-[18px] 
								cursor-pointer ${item.colors.shadow} ${item.colors.border} gap-60`}
						>
							{/* иконка */}
							<div
								className={`absolute top-10 left-10 text-white/70 group-hover:scale-110 transition-all duration-500 `}
							>
								<Icon size={40} strokeWidth={1.2} />
							</div>

							{/* контент */}
							<div className="relative z-10 w-full">
								<h3 className="text-white text-2xl font-bold mb-4 uppercase">{item.title}</h3>

								<div className="h-[2px] w-0 bg-white mb-6 transition-all duration-500 group-hover:w-full" />

								<p className="text-white/60 leading-relaxed text-lg group-hover:text-white/90 transition-colors duration-300">
									{item.description}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
