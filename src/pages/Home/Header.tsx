import { NavLink } from "react-router-dom";
import { useState } from "react";

const LINKS = [
	{ href: "#", label: "Home" },
	{ href: "#", label: "Features" },
	{ href: "#", label: "About" },
	{ href: "#", label: "Contacts" },
];

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="w-full bg-[#fff]">
			<div
				className="max-w-[1700px] mx-auto 
				py-3 lg:py-4 
				px-4 sm:px-6 lg:px-10 xl:px-20 
				flex justify-between items-center gap-4"
			>
				{/* Logo & Desktop Nav */}
				<div className="flex items-center gap-4 lg:gap-6 xl:gap-10">
					<NavLink to="/" className="text-2xl">
						<span className="group font-bold font-['Inter'] text-[#1A237E]">
							<b className="group-hover:text-[#1A237E] transition-colors duration-300">LAW</b>
							<b className="group-hover:text-[#BFA14A] transition-colors duration-300">LY</b>
						</span>
					</NavLink>

					<ul className="hidden lg:flex items-center gap-6">
						{LINKS.map((link) => (
							<li key={link.label} className="relative group cursor-pointer">
								<a
									href={link.href}
									className="text-sm font-bold uppercase tracking-wider text-[#121212]"
								>
									{link.label}
								</a>
								<span className="absolute left-0 -bottom-1 w-0 h-[3px] rounded-full bg-[#BFA14A] transition-all duration-300 group-hover:w-full"></span>
							</li>
						))}
					</ul>
				</div>

				{/* Desktop Actions */}
				<div className="hidden md:flex items-center gap-4">
					<NavLink
						to="/login"
						className="px-5 py-2 border border-[#1A237E] text-[#1A237E] rounded-md font-bold hover:bg-gray-100 transition-all"
					>
						Sign In
					</NavLink>
					<NavLink
						to="/register"
						className="px-5 py-2 bg-[#1A237E] text-white rounded-md font-bold hover:bg-[#212ca1] transition-all"
					>
						Sign Up
					</NavLink>
				</div>

				{/* Mobile Burger Button */}
				<button className="md:hidden flex flex-col gap-1.5 z-50" onClick={() => setIsOpen(!isOpen)}>
					<span
						className={`w-6 h-0.5 bg-black transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`}
					></span>
					<span className={`w-6 h-0.5 bg-black transition-all ${isOpen ? "opacity-0" : ""}`}></span>
					<span
						className={`w-6 h-0.5 bg-black transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
					></span>
				</button>
			</div>

			{/* Mobile Menu Overlay */}
			<div
				className={`fixed inset-0 bg-white z-40 flex flex-col p-8 transition-transform duration-500 md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}
			>
				<div className="flex flex-col gap-6 mt-20 text-center">
					{LINKS.map((link) => (
						<a
							key={link.label}
							href={link.href}
							onClick={() => setIsOpen(false)}
							className="text-2xl font-bold border-b pb-2"
						>
							{link.label}
						</a>
					))}
					<div className="flex flex-col gap-4 pt-6">
						<NavLink to="/login" className="w-full py-3 border border-[#1A237E] text-[#1A237E] rounded-lg">
							Sign In
						</NavLink>
						<NavLink to="/register" className="w-full py-3 bg-[#1A237E] text-white rounded-lg">
							Sign Up
						</NavLink>
					</div>
				</div>
			</div>
		</nav>
	);
}
