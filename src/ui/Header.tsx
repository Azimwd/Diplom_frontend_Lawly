import CustomSelect from "./CustomSelectLg";
import { NavLink } from "react-router-dom";
import logo from "../assets/diplom icon black.svg";
import { useState } from "react";

const LINKS = [
	{
		href: "#",
		label: "Home",
	},
	{
		href: "#",
		label: "Features",
	},
	{
		href: "#",
		label: "Features",
	},
	{
		href: "#",
		label: "Features",
	},
	{
		href: "#",
		label: "Contacts",
	},
];

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className="z-50">
			<div className="mx-auto min-h-[72px] px-[20px] md:px-[70px] w-auto md:w-full bg-transparent text-black flex justify-between items-center ">
				<div className="flex item-center gap-[39px]">
					<NavLink to="/">
						<img
							src={logo}
							className="w-[40px] h-[40px] md:w-[35px] md:h-[35px] lg:w-[35px] lg:h-[35px] "
						/>
					</NavLink>
					<nav className="hidden md:block">
						<ul className="flex items-center gap-[32px]">
							{LINKS.map((link) => (
								<li key={link.href} className="relative group px-2 py-1 cursor-pointer">
									<a
										href={link.href}
										className="relative inline-block text-[16px] font-normal transition-all hover:font-medium"
									>
										<span aria-hidden="true" className="block font-medium invisible">
											{link.label}
										</span>
										<span className="absolute left-0 top-0 w-full h-full">{link.label}</span>
									</a>
									<span className="absolute left-0 bottom-0 w-0 h-[4px] rounded-[5px] bg-[#BFA14A] transition-all duration-200 group-hover:w-full"></span>
								</li>
							))}
						</ul>
					</nav>
				</div>
				<div className="hidden md:block">
					<div className="flex space-x-4 items-center ">
						<CustomSelect />
						<NavLink
							to="/login"
							className="border-[1px] text-[#1A237E]  cursor-pointer rounded-[5px] border-[#1A237E] w-[104px] h-[45px] flex items-center justify-center hover:bg-[#e7e7e7]"
						>
							Sign In
						</NavLink>
						<NavLink
							to="/register"
							className="text-white w-[104px] h-[45px] bg-[#1A237E] cursor-pointer rounded-[5px] flex items-center justify-center transition-all duration-200 hover:bg-[#212ca1]"
						>
							Sign Up
						</NavLink>
					</div>
				</div>
				<div className="md:hidden">
					<button className="md:hidden flex flex-col gap-[4px]" onClick={() => setIsOpen(!isOpen)}>
						<span
							className={`w-6 h-[2px] bg-black transition-all ${
								isOpen ? "rotate-45 translate-y-[6px]" : ""
							}`}
						></span>
						<span className={`w-6 h-[2px] bg-black transition-all ${isOpen ? "opacity-0" : ""}`}></span>
						<span
							className={`w-6 h-[2px] bg-black transition-all ${
								isOpen ? "-rotate-45 -translate-y-[6px]" : ""
							}`}
						></span>
					</button>
				</div>
			</div>
			{isOpen && (
				<div className="md:hidden px-[70px] pb-4 flex flex-col gap-4 text-[18px]">
					{LINKS.map((link) => (
						<a key={link.label} href={link.href} className="py-2 border-b border-gray-200">
							{link.label}
						</a>
					))}

					<div className="flex flex-col gap-3 mt-2">
						<CustomSelect />
						<NavLink
							to="/login"
							className="border border-[#1A237E] text-[#1A237E] rounded-[5px] py-2 text-center"
						>
							Sign In
						</NavLink>
						<NavLink
							to="/register"
							className="border border-[#1A237E] bg-[#1A237E] text-white rounded-[5px] py-2 text-center"
						>
							Sign Up
						</NavLink>
					</div>
				</div>
			)}
		</header>
	);
}
