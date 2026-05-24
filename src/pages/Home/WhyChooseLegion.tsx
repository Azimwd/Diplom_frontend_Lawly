import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export default function WhyChooseLegion() {
	const containerWCL = useRef(null);

	useGSAP(() => {
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: containerWCL.current,
					start: "top",
					end: "+=2000",
					scrub: 0.3,
					pin: true,
					// markers: true,
				},
			});

			tl.fromTo(
				".wcl",
				{
					yPercent: -70,
				},
				{
					yPercent: 10,
					ease: "none",
				},
				0,
			);

			tl.fromTo(
				".lne",
				{
					yPercent: -70,
				},
				{
					yPercent: 10,
					ease: "none",
				},
				0,
			);

			tl.fromTo(
				".desc",
				{
					opacity: 0,
					yPercent: 120,
				},
				{
					yPercent: 0,
					opacity: 1,
					ease: "none",
					stagger: 0.7,
				},
				0.2,
			);
		}, containerWCL);

		return () => ctx.revert();
	}, []);

	return (
		<section
			className="h-screen text-white overflow-x-hidden flex items-center justify-center bg-transparent"
			ref={containerWCL}
		>
			<div className="flex justify-start items-center">
				<div
					className="relative z-10 w-full max-w-[1400px] px-6 md:px-10 lg:px-16 
grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-center"
				>
					<div className="flex gap-4 md:gap-6 lg:gap-10 items-start">
						<div className="w-[3px] md:w-[4px] bg-gradient-to-b from-[#ffffff] via-[#4d68ff] to-[#001A41] self-stretch rounded-full shadow-[0_0_15px_rgba(255,77,109,0.3)] lne" />

						<h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter whitespace-pre-line  uppercase wcl select-none">
							Why choose Lawly?
						</h1>
					</div>

					<div className="flex flex-col justify-center items-center md:items-start select-none">
						<p className="desc text-lg md:text-xl lg:text-3xl text-gray-300 leading-relaxed max-w-lg font-light tracking-wide font-['Inter']">
							Trusted.
						</p>
						<p className="desc text-lg md:text-xl lg:text-3xl text-gray-300 leading-relaxed max-w-lg font-light tracking-wide font-['Inter']">
							Intelligent.
						</p>
						<p className="desc text-lg md:text-xl lg:text-3xl text-gray-300 leading-relaxed max-w-lg font-light tracking-wide font-['Inter']">
							Always at your side.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
