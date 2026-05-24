import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

interface ParallaxProps {
	img: string;
	keyProp?: string;
}

export default function UseScroll({ img }: ParallaxProps) {
	const sectionRef = useRef<HTMLElement | null>(null);
	const [progress, setProgress] = useState(0);
	const [mobileFade, setMobileFade] = useState(1);

	const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

	useEffect(() => {
		if (isMobile) return;
		const el = sectionRef.current;
		if (!el) return;

		const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

		const onScroll = () => {
			const sectionTop = el.offsetTop;
			const sectionHeight = el.offsetHeight;
			const winH = window.innerHeight;
			const sc = window.scrollY;

			const p = (sc - sectionTop) / (sectionHeight - winH);
			setProgress(clamp(p, 0, 1));
		};

		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, [isMobile]);

	useEffect(() => {
		if (!isMobile) return;

		const onScroll = () => {
			const sc = window.scrollY;
			const fade = 1 - sc / 200; // Чем меньше 200 — тем быстрее затухает
			setMobileFade(Math.max(0, Math.min(1, fade)));
		};

		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", onScroll);
		};
	}, [isMobile]);

	const fadeSpeed = isMobile ? 3.5 : 1.2;
	const translateVh = 40 + (-10 - 33) * progress;
	const scale = 0.96 + (1.0 - 0.96) * progress;
	const textOpacity = 1 - progress * fadeSpeed;
	const clampedOpacity = Math.max(0, Math.min(1, textOpacity));

	return (
		<section ref={sectionRef} className="relative min-h-[50vh] md:min-h-[200vh] ">
			<div className="sticky top-0 h-[820px] md:h-screen flex flex-col items-center justify-normal md:justify-center text-center font-['Cinzel'] px-4 z-15 md:z-19">
				<div
					className=" transition-opacity duration-300 mt-0 md:mt-[115px] ease-out flex flex-col items-center justify-center"
					style={{ opacity: isMobile ? mobileFade : clampedOpacity }}
				>
					<h2 className="text-[32px] sm:text-[42px] md:text-[48px] max-w-[1180px] font-bold leading-[1.2] mb-4 mt-[170px]">
						Your intelligent legal partner — Reliable Guidance for every step of your journey
					</h2>

					<h3 className="max-w-[590px] text-[16px] opacity-80 mb-6">
						AI-powered legal assistance — fast, reliable, and always at your side.
					</h3>

					<NavLink
						to="/chat"
						className="flex justify-center items-center w-[184px] h-[45px] cursor-pointer bg-[#1A237E] text-center rounded-[5px] text-white transition-all duration-200 hover:bg-[#212ca1] p-6 font-['Inter']font-normal text-16px"
					>
						Try Legion
					</NavLink>
				</div>

				{/* image with parallax effect */}
				<div className="hidden md:block">
					<div
						className="relative z-20 w-full flex flex-col items-center justify-center top-[58px] will-change-transform "
						style={{
							transform: `translateY(${translateVh}vh) scale(${scale})`,
						}}
					>
						<div>
							<h2 className="text-[48px] font-bold text-[#001A41]">AI legal assistant features</h2>
							<img
								src={img}
								alt="preview"
								className="max-w-[1180px] w-full max-h-[575px] h-[575px] object-cover rounded-[10px]  img-sosi"
								draggable={false}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="md:hidden flex flex-col items-center relative z-100 font-['Cinzel']">
				<h2 className="text-[21px] font-bold text-[#001A41]">AI legal assistant features</h2>
				<img
					src={img}
					alt="preview"
					className="w-full max-w-[500px] max-h-[400px] h-[400px] rounded-t-[10px] object-cover"
					draggable={false}
				/>
			</div>
		</section>
	);
}
