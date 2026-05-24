import telegram_ad from "../assets/telegram_ad.png";
import tg from "../assets/Vector 14.png";

export default function TelegramAD() {
	return (
		<section className="bg-[#001A41] pb-[38px] pt-[100px] md:pt-0 p-4">
			<div className="flex flex-col justify-center items-center text-[#ffffff] font-['Cinzel'] font-bold">
				<h1 className="text-[28px] md:text-[48px] mt-[38px]">Meet Our Telegram Bot</h1>
				<h3 className="font-['Inter'] font-light text-[24px] mb-[30px]">
					All the power of Legion, now in Telegram.
				</h3>
			</div>

			<div className="flex items-center justify-center">
				<div className="flex justify-between items-center gap-[36px]">
					<div className="hidden col-span-2 bg-transparent md:flex flex-col justify-center items-center w-[670px]">
						<img src={telegram_ad} alt="ad-tg" className="object-cover" />
					</div>

					<div className="col-span-1 flex flex-col space-y-6 max-w-[600px]">
						<div className="h-[90px] flex items-center justify-center max-w-[600px]">
							<p className="text-[18px] text-white">
								Experience the full functionality of our platform directly through our official Telegram
								Bot.
								<br />
								Consult, chat, and get instant legal support — without opening the website.
							</p>
						</div>
						<div className="text-white p-6 flex-grow flex flex-col justify-center items-center h-[300px] mt-[150px] md:mt-0">
							<div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:justify-normal md:gap-6 w-[365px] md:w-[535px]">
								<div className="bg-[#0C2147] rounded-[16px] h-[137px]">
									<div className="p-2">
										<p className="text-[18px] pl-[5px]">Seamless Chat</p>
										<h2 className="items-end text-[18px] pl-[5px] mt-[14px] text-[#D6D6D6]">
											Communicate with our AI legal assistant directly in Telegram.
										</h2>
									</div>
								</div>
								<div className="bg-[#0C2147] rounded-[16px] h-[137px]">
									<div className="p-2">
										<p className="text-[18px] pl-[5px]">Seamless Chat</p>
										<h2 className="items-end text-[18px] pl-[5px] mt-[14px] text-[#D6D6D6]">
											Communicate with our AI legal assistant directly in Telegram.
										</h2>
									</div>
								</div>
								<div className="bg-[#0C2147] rounded-[16px] h-[137px]">
									<div className="p-2">
										<p className="text-[18px] pl-[5px]">Seamless Chat</p>
										<h2 className="items-end text-[18px] pl-[5px] mt-[14px] text-[#D6D6D6]">
											Communicate with our AI legal assistant directly in Telegram.
										</h2>
									</div>
								</div>
								<div className="bg-[#0C2147] rounded-[16px] h-[137px]">
									<div className="p-2">
										<p className="text-[18px] pl-[5px]">Seamless Chat</p>
										<h2 className="items-end text-[18px] pl-[5px] mt-[14px] text-[#D6D6D6]">
											Communicate with our AI legal assistant directly in Telegram.
										</h2>
									</div>
								</div>
							</div>
						</div>

						<div className="text-white  p-4 h-24 flex items-center justify-center md:inline mt-[120px] md:mt-0">
							<a
								href="#"
								className="bg-[#229ED9] hover:bg-[#1E90C2] duration-200 px-2 py-2 rounded-[8px] justify-center w-[365px] md:w-[200px] flex items-center gap-5 font-bold"
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
