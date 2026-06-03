import tg from "../../assets/Vector 14.png";

export default function Footer() {
	return (
		<footer className="min-h-[330px] bg-[#010007] relative z-[101]">
			{/* Верхняя синяя полоска */}
			<div className="w-full bg-[#0e1452] h-[30px]"></div>

			<div className="flex justify-center items-center py-10 md:h-[300px] md:py-0">
				<div className="flex flex-col md:flex-row justify-center items-center md:items-start max-w-[1125px] px-5 gap-10 md:gap-[120px] w-full">
					{/* LAWLY Info */}
					<div className="grow-0 text-white max-w-[340px] text-center md:text-left">
						<div className="flex flex-col gap-3 items-center md:items-start">
							<div className="flex">
								<h1 className="text-[29px] font-semibold uppercase">LAWLY</h1>
							</div>
							<h4 className="text-[15px] font-semibold text-[#BFBFBF]">
								The next-generation AI assistant ecosystem — available on both web and Telegram. Fast,
								secure, and designed for professionals who value precision.
							</h4>
							<button className="text-[#0D1B2A] bg-[#BFA14A] px-[35px] py-3 cursor-pointer rounded-[5px] w-fit font-bold mt-2">
								Try Lawly
							</button>
						</div>
					</div>

					{/* Explore */}
					<div className="grow-0 text-white text-center md:text-left">
						<div className="flex flex-col gap-3 w-full md:w-[160px]">
							<h1 className="text-[16px] font-bold">Explore</h1>
							<div className="flex flex-col text-[15px] uppercase gap-2 items-center md:items-start">
								<a
									href="#"
									className="border-b border-transparent hover:border-[#BFBFBF] w-fit text-[#BFBFBF] transition-all"
								>
									Home
								</a>
								<a
									href="#"
									className="border-b border-transparent hover:border-[#BFBFBF] w-fit text-[#BFBFBF] transition-all"
								>
									Features
								</a>
								<a
									href="#"
									className="border-b border-transparent hover:border-[#BFBFBF] w-fit text-[#BFBFBF] transition-all"
								>
									Telegram
								</a>
								<a
									href="#"
									className="border-b border-transparent hover:border-[#BFBFBF] w-fit text-[#BFBFBF] transition-all"
								>
									Why choose LAWLY
								</a>
								<a
									href="#"
									className="border-b border-transparent hover:border-[#BFBFBF] w-fit text-[#BFBFBF] transition-all"
								>
									How it works
								</a>
							</div>
						</div>
					</div>

					{/* Contact */}
					<div className="text-white text-center md:text-left">
						<div className="flex flex-col gap-6 items-center md:items-start">
							<div>
								<h1 className="text-[16px] font-bold">Contact</h1>
								<h4 className="text-[#BFBFBF] text-[15px]">Lawly@gmail.com</h4>
							</div>
							{/* Social */}
							<a href="#" className="hover:opacity-80 transition-opacity">
								<img src={tg} alt="tg" className="w-[19px] h-[28px]" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
