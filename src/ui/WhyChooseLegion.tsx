import { BadgeCheck, HandCoins, Settings, ShieldUser, Zap } from "lucide-react";

export default function WhyChooseLegion() {
	return (
		<section className="text-white mt-[10px] overflow-x-hidden">
			<div className="flex flex-col justify-center items-center">
				<div className="items-center justify-center p-7 md:p-0 ">
					<h1 className="text-[25px] md:text-[48px] font-['Cinzel'] font-bold">Why choose legion</h1>

					{/* <h1 className="text-[25px] md:text-[48px] font-['Cinzel'] font-bold">Why choose legion</h1> */}
					<div className="">
						<h5 className="text-[16px]">Trusted. Intelligent. Always at your side.</h5>
						<br />
						<h5 className="text-[16px]">
							Legion combines advanced AI with expert legal insights to make legal support accessible,
							efficient, and secure — anytime, anywhere.
						</h5>
						<h5 className="text-[16px]"> We simplify complexity so you can focus on what truly matters.</h5>
					</div>

					<div className="hidden md:flex flex-col mt-[50px] gap-10">
						<div className="flex gap-10 items-center">
							<div className="relative w-[400px] bg-transparent from-[#11263f] to-[#0c1a2b] border border-[#ffffff] rounded-lg p-6 text-white h-[200px]">
								<div className="absolute -top-7 left-4 bg-[#173152] p-2 rounded-lg border border-[#ffffff] ">
									<Settings className="w-8 h-8" color="#ffffff" strokeWidth={1.5} />
								</div>

								<h2 className="text-2xl font-semibold mb-3 text-[#ffffff] mt-[15px] font-['Cinzel']">
									24/7 Availability
								</h2>
								<p className="text-sm text-[#e6e6e6] leading-relaxed">
									Legal help whenever you need it — our assistant never sleeps.
									<br />
									Get instant guidance and document analysis at any hour.
								</p>
							</div>
							<div className="relative w-[400px] bg-transparent from-[#11263f] to-[#0c1a2b] border border-[#ffffff] rounded-lg p-6 text-white h-[200px]">
								<div className="absolute -top-7 left-4 bg-[#173152] p-2 rounded-lg  border border-[#ffffff] ">
									<Zap className="w-8 h-8" color="#ffffff" strokeWidth={1.5} />
								</div>

								<h2 className="text-2xl font-semibold mb-3 text-[#ffffff] mt-[15px] font-['Cinzel']">
									Instant Answers
								</h2>
								<p className="text-sm text-gray-200 leading-relaxed">
									No more waiting for consultations.
									<br />
									Legion processes and responds within seconds, giving you clarity fast.
								</p>
							</div>
							<div className="relative w-[400px] bg-transparent from-[#11263f] to-[#0c1a2b] border border-[#ffffff] rounded-lg p-6 text-white h-[200px]">
								<div className="absolute -top-7 left-4 bg-[#173152] p-2 rounded-lg  border border-[#ffffff] ">
									<HandCoins className="w-8 h-8" color="#ffffff" strokeWidth={1.5} />
								</div>

								<h2 className="text-2xl font-semibold mb-3 text-[#ffffff] mt-[15px] font-['Cinzel']">
									Time & Cost Efficiency
								</h2>
								<p className="text-sm text-gray-200 leading-relaxed">
									Cut legal expenses without sacrificing quality.
									<br />
									AI automation saves hours and reduces unnecessary costs.
								</p>
							</div>
						</div>
						<div className="flex justify-center items-center">
							<div className="flex gap-10 items-center">
								<div className="relative w-[400px] bg-transparent from-[#11263f] to-[#0c1a2b] border border-[#ffffff] rounded-lg p-6 text-white h-[200px]">
									<div className="absolute -top-7 left-4 bg-[#173152] p-2 rounded-lg border border-[#ffffff] ">
										<ShieldUser className="w-8 h-8" color="#ffffff" strokeWidth={1.5} />
									</div>

									<h2 className="text-2xl font-semibold mb-3 text-[#ffffff] mt-[15px] font-['Cinzel']">
										Data Security
									</h2>
									<p className="text-sm text-gray-200 leading-relaxed">
										Your privacy comes first.
										<br />
										All conversations and documents are encrypted and protected by enterprise-grade
										security.
									</p>
								</div>
								<div className="relative w-[400px] bg-transparent from-[#11263f] to-[#0c1a2b] border border-[#ffffff] rounded-lg p-6 text-white h-[200px]">
									<div className="absolute -top-7 left-4 bg-[#173152] p-2 rounded-lg  border border-[#ffffff] ">
										<BadgeCheck className="w-8 h-8" color="#ffffff" strokeWidth={1.5} />
									</div>

									<h2 className="text-2xl font-semibold mb-3 text-[#ffffff] mt-[15px] font-['Cinzel'] ">
										Verified by Experts
									</h2>
									<p className="text-sm text-gray-200 leading-relaxed">
										Every feature is built in collaboration with licensed legal professionals,
										ensuring accuracy and reliability you can trust.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* <Carousel /> */}
			</div>
		</section>
	);
}
