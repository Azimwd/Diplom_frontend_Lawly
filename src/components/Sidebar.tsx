import { useState, useEffect } from "react";
import logoIcon from "../assets/logo-white.svg";
import clsx from "clsx";
import { PanelRightOpen } from "lucide-react";
import ListOfChats from "./ListOfChats";
import ProfileSidebar from "./ProfileSidebar";
import { useUser } from "../context/UserContext";
import { translations, type Language } from "../utils/translations";

interface SidebarProps {
	refreshChats: number;
}

export default function Sidebar({ refreshChats }: SidebarProps) {
	const [isOpen, setIsOpen] = useState(true);
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);

	const { profile } = useUser();
	const langKey = (profile?.language as Language) || "ru";
	const t = translations[langKey].sidebar;

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	const toggleSidebar = () => {
		if (isOpen) {
			setIsOpen(false);
			setIsCollapsed(false);
			setTimeout(() => {
				setIsCollapsed(true);
			}, 300);
		} else {
			setIsCollapsed(false);
			setIsOpen(true);
		}
	};

	// MOBILE
	if (isMobile) {
		return (
			<>
				{!mobileOpen && (
					<button
						onClick={() => setMobileOpen(true)}
						className="fixed top-3 left-3 z-50 h-[36px] w-[36px] bg-[#1A1A1A] hover:bg-[#424242] rounded-[6px] flex items-center justify-center cursor-pointer"
					>
						<PanelRightOpen strokeWidth={1.5} className="h-[22px] w-[22px] text-white rotate-180" />
					</button>
				)}

				{/* Backdrop */}
				{mobileOpen && <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setMobileOpen(false)} />}

				{/* Сайдбар */}
				<aside
					className={clsx(
						"fixed top-0 left-0 z-50 h-full bg-[#1A1A1A] text-white transition-transform duration-300 w-[280px]",
						mobileOpen ? "translate-x-0" : "-translate-x-full",
					)}
				>
					<div className="flex flex-col justify-between w-full h-full overflow-hidden">
						<div className="flex items-center px-3 h-[60px]">
							<div className="relative h-[36px] min-w-[36px] ml-[2px] rounded-[6px] flex items-center justify-center">
								<span className="font-['Inter'] font-bold select-none mt-2">LAWLY</span>
							</div>

							<button
								onClick={() => setMobileOpen(false)}
								className="h-[36px] min-w-[36px] bg-transparent hover:bg-[#424242] rounded-[6px] flex items-center justify-center cursor-pointer ml-auto"
							>
								<PanelRightOpen strokeWidth={1.5} className="h-[22px] w-[22px] text-white" />
							</button>
						</div>

						<div className="flex-1 overflow-hidden">
							<ListOfChats
								isOpen={true}
								refreshChats={refreshChats}
								onChatSelect={() => setMobileOpen(false)}
							/>
						</div>

						<ProfileSidebar isOpen={true} />
					</div>
				</aside>
			</>
		);
	}

	// DESKTOP
	return (
		<aside
			className={clsx(
				"flex h-full bg-[#1A1A1A] text-white transition-[width] duration-200 overflow-x-hidden",
				isOpen ? "w-full md:w-[320px] sm:w-[200px]" : "w-[65px]",
			)}
		>
			<div className="flex flex-col justify-between  w-full h-full overflow-hidden transition-all  min-w-[14vw]">
				<div className={clsx("flex items-center px-3 h-[60px] transition-all duration-300 group")}>
					<button
						onClick={!isOpen ? toggleSidebar : undefined}
						title={!isOpen ? t.openSidebar : ""}
						className={clsx(
							"relative h-[36px] min-w-[36px] ml-[2px] rounded-[6px] flex items-center justify-center group transition-colors duration-300 ",
							isCollapsed ? "hover:bg-[#424242] cursor-e-resize" : "hover:bg-[#525252] cursor-pointer",
						)}
					>
						<img
							src={logoIcon}
							alt="logo"
							className={clsx(
								"h-[22px] w-[22px] transition-opacity duration-200",
								isCollapsed ? "opacity-100 group-hover:opacity-0 " : "opacity-100",
							)}
						/>
						<PanelRightOpen
							strokeWidth={1.5}
							className={clsx(
								"absolute h-[22px] w-[22px] text-white transition-opacity duration-200 ",
								isCollapsed ? "opacity-0 group-hover:opacity-100 rotate-180" : "opacity-0",
							)}
						/>
					</button>

					{isOpen && (
						<button
							onClick={toggleSidebar}
							title={t.closeSidebar}
							className="h-[36px] min-w-[36px] bg-transparent hover:bg-[#424242] rounded-[6px] flex items-center justify-center cursor-e-resize ml-auto"
						>
							<PanelRightOpen strokeWidth={1.5} className="h-[22px] w-[22px] text-white" />
						</button>
					)}
				</div>
				<div
					className={clsx(
						"flex-1",
						!isOpen ? "overflow-auto-y justify-center items-center" : "overflow-hidden",
					)}
				>
					<ListOfChats isOpen={isOpen} refreshChats={refreshChats} />
				</div>

				<ProfileSidebar isOpen={isOpen} />
			</div>
		</aside>
	);
}
