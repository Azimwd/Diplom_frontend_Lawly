import telegram_ad from "../../assets/telegram_ad.png";
import tg from "../../assets/Vector 14.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function TelegramAD() {
	const container = useRef(null);

	useGSAP(() => {
		const ctx = gsap.context(() => {
			gsap.from(".tg-image", {
				x: -200,
				duration: 0.6,
				opacity: 0,
				stagger: 0.15,
				ease: "power4.out",
				scrollTrigger: {
					trigger: ".tg-image",
					start: "center 70%",
					end: "center 30%",
					toggleActions: "play reverse play reverse",
					// markers: true,
				},
			});

			gsap.from(".tg-cards", {
				x: 500,
				opacity: 0,
				stagger: 0.15,
				ease: "power4.out",
				yoyo: true,
				scrollTrigger: {
					trigger: ".tg-cards",
					start: "center 70%",
					end: "center 50%",
					scrub: 1,
					toggleActions: "play reverse play reverse",
					// markers: true,
				},
			});

			gsap.from(".tg-button", {
				x: 500,
				opacity: 0,
				duration: 0.3,
				ease: "power4.out",
				scrollTrigger: {
					trigger: ".tg-button",
					start: "top 85%",
					end: "top 40%",
					toggleActions: "play reverse play reverse",
					// markers: true,
				},
			});
		}, container);

		return () => ctx.revert();
	}, []);

	return (
		<section ref={container} className="bg-[#001A41] pb-[38px] p-4 overflow-hidden ">
			<div className="flex flex-col justify-center items-center text-[#ffffff] font-['Cinzel'] font-bold">
				<h1 className="text-[24px] md:text-[48px] ">Meet Our Telegram Bot</h1>
				<h3 className="font-['Inter'] font-light text-[16px] md:text-[24px] mb-[30px]">
					All the power of Lawly, now in Telegram.
				</h3>
			</div>

			<div className="flex items-center justify-center">
				<div className="flex flex-col xl:flex-row justify-between items-center gap-10 xl:gap-[36px] w-full max-w-[1400px]">
					<div className="hidden col-span-2 bg-transparent md:flex flex-col justify-center items-center w-[670px]">
						<img src={telegram_ad} alt="ad-tg" className="tg-image object-cover select-none" />
					</div>

					<div className="col-span-1 flex flex-col space-y-6 max-w-[600px]">
						<div className="h-[90px] flex items-center justify-center px-7 md:px-0 max-w-[500px] md:max-w-[600px] md:mb-10 mb-10">
							<p className="text-[16px] md:text-[18px] text-white text-justify">
								<b className=" font-normal">
									Experience the full functionality of our platform directly through our official
									Telegram Bot.
								</b>
								<br />
								<b className=" font-normal">
									Consult, chat, and get instant legal support — without opening the website.
								</b>
							</p>
						</div>
						<div className="text-white p-6 flex-grow flex flex-col justify-center items-start h-[300px] mt-[150px] md:mt-0">
							<div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:justify-normal md:gap-6 min-w-[365px] md:w-[535px]">
								<div className="tg-cards bg-[#0C2147] rounded-[16px] h-[137px] ">
									<div className="p-2">
										<p className="text-[18px] pl-[5px]">Seamless Chat</p>
										<h2 className="items-end text-[16px] md:text-[18px] pl-[5px] mt-[14px] text-[#D6D6D6]">
											Communicate with our AI legal assistant directly in Telegram.
										</h2>
									</div>
								</div>
								<div className="tg-cards bg-[#0C2147] rounded-[16px] h-[137px] ">
									<div className="p-2">
										<p className="text-[18px] pl-[5px]">Seamless Chat</p>
										<h2 className="items-end text-[16px] md:text-[18px] pl-[5px] mt-[14px] text-[#D6D6D6]">
											Communicate with our AI legal assistant directly in Telegram.
										</h2>
									</div>
								</div>
								<div className="tg-cards bg-[#0C2147] rounded-[16px] h-[137px] ">
									<div className="p-2">
										<p className="text-[18px] pl-[5px]">Seamless Chat</p>
										<h2 className="items-end text-[16px] md:text-[18px] pl-[5px] mt-[14px] text-[#D6D6D6]">
											Communicate with our AI legal assistant directly in Telegram.
										</h2>
									</div>
								</div>
								<div className="tg-cards bg-[#0C2147] rounded-[16px] h-[137px] ">
									<div className="p-2">
										<p className="text-[18px] pl-[5px]">Seamless Chat</p>
										<h2 className="items-end text-[16px] md:text-[18px] pl-[5px] mt-[14px] text-[#D6D6D6]">
											Communicate with our AI legal assistant directly in Telegram.
										</h2>
									</div>
								</div>
							</div>
						</div>

						<div className="text-white  p-4 h-24 flex items-center justify-center md:inline mt-[120px] md:mt-0">
							<a
								href="#"
								className="tg-button bg-[#229ED9] hover:bg-[#1E90C2] px-2 py-2 rounded-[16px] justify-center w-full max-w-[360px] md:w-[275px] flex items-center gap-5 font-bold"
							>
								<img src={tg} alt="tg" className="w-[19px] h-[28px] ml-[4px]" />
								Open in telegram
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
