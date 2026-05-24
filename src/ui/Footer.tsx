import tg from "../assets/Vector 14.png";

export default function Footer() {
	return (
		<footer className="h-[330px] bg-[#0d1b2a] relative z-101">
			<div className="w-full bg-[#142B3E] h-[30px]"></div>
			<div className="flex justify-center items-center h-[300px]">
				<div className="flex justify-center items-start max-w-[1125px] gap-[120px]">
					<div className="grow-0 text-white max-w-[340px]">
						<div className="flex flex-col gap-3">
							<div className="flex">
								<h1 className="text-[29px] font-semibold">LEGION</h1>
								<div className="h-[7px] w-[7px] bg-[#BFA14A] self-end mb-[12px] ml-[5px]"></div>
							</div>
							<h4 className="text-[15px] font-semibold text-[#BFBFBF]">
								The next-generation AI assistant ecosystem — available on both web and Telegram. Fast,
								secure, and designed for professionals who value precision.
							</h4>
							<button className="text-[#0D1B2A] bg-[#BFA14A] px-[35px] py-3 cursor-pointer rounded-[5px] w-fit">
								Try Legion
							</button>
						</div>
					</div>

					{/*  Explore */}
					<div className="grow-0 text-white">
						<div className="flex flex-col gap-3 w-[160px]">
							<h1 className="text-[16px]">Explore</h1>
							<div className="flex flex-col text-[15px]">
								{" "}
								<a href="#" className="border-b-1 w-fit text-[#BFBFBF] ">
									Home
								</a>
								<a href="#" className="border-b-1 w-fit text-[#BFBFBF] ">
									Features
								</a>
								<a href="#" className="border-b-1 w-fit text-[#BFBFBF] ">
									Telegram
								</a>
								<a href="#" className="border-b-1 w-fit text-[#BFBFBF] ">
									Why choose Legion
								</a>
								<a href="#" className="border-b-1 w-fit text-[#BFBFBF] ">
									How it works
								</a>
							</div>
						</div>
					</div>

					{/* Stay with us */}
					<div className="grow-1 text-white gap-6">
						<div className="flex flex-col gap-6">
							<div className="flex flex-col gap-3">
								<h1 className="text-[16px]">Stay with us</h1>
								<div className="flex gap-4">
									{" "}
									<input
										type="text"
										className="bg-[#FAFAFA] placeholder:text-[#888888]  w-[250px] px-6 py-2 rounded-[3px] focus:outline-none"
										placeholder="Enter your email"
									/>
									<button className="text-[#0D1B2A] bg-[#BFA14A] px-6 rounded-[3px] hover:bg-[#D4B35E]">
										Sign Up
									</button>
								</div>
							</div>
							{/* cntct */}
							<div>
								<h1 className="text-[16px]">Contact</h1>
								<h4 className="text-[#BFBFBF] text-[15px]">LegionCommander@gmail.com</h4>
							</div>
							{/* img */}
							<a href="#">
								<img src={tg} alt="tg" className="w-[19px] h-[28px]" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
