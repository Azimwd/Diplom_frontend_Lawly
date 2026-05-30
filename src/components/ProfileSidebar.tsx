/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useUser } from "../context/UserContext";
import Settings from "./Settings";
import Portal from "./Portal";
import { UserIcon } from "lucide-react";
import { translations, type Language } from "../utils/translations";

interface ProfileProps {
	isOpen: boolean;
}

function ProfileSidebar({ isOpen }: ProfileProps) {
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const { user, loading, profile } = useUser();

	const lang = (profile?.language as Language) || "ru";
	const t = translations[lang].settings;

	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const [coords, setCoords] = useState({ top: 0, left: 0 });

	const getInitials = () => {
		const firstName = profile?.first_name || "";
		const lastName = profile?.last_name || "";

		const firstLetter = firstName.length > 0 ? firstName[0] : "";
		const lastLetter = lastName.length > 0 ? lastName[0] : "";

		return (firstLetter + lastLetter).toUpperCase();
	};

	const initials = getInitials();

	useEffect(() => {
		if (isPopoverOpen && buttonRef.current) {
			const rect = buttonRef.current.getBoundingClientRect();
			setCoords({
				top: rect.top - 8,
				left: rect.left - 8,
			});
		}
	}, [isPopoverOpen]);

	if (loading) return null;

	return (
		<section
			className={`
				relative mt-auto h-[60px] flex items-center justify-start
				p-2 border-[#333] bg-white dark:bg-[#1A1A1A] text-white
				transition-all duration-200
				${isOpen ? "w-full max-w-[340px]" : "w-[59px]"}
			`}
		>
			<button
				ref={buttonRef}
				onClick={(e) => {
					e.stopPropagation();
					setIsPopoverOpen((prev: any) => !prev);
				}}
				className={`
					flex items-center hover:bg-[#98caff] dark:hover:bg-[#424242]
					rounded-[6px] cursor-pointer px-2 py-1
					transition-all duration-200 justify-start
					${isOpen ? "w-full" : "w-[40px] py-2"}
				`}
			>
				<div className="h-[24px] w-[24px] rounded-full bg-[#4A4A4A] flex items-center justify-center flex-shrink-0 overflow-hidden border border-[#555]">
					{profile?.avatar ? (
						<img
							src={profile?.avatar}
							key={profile.avatar}
							crossOrigin="anonymous"
							alt="Avatar"
							className="h-full w-full object-cover flex-shrink-0"
						/>
					) : initials ? (
						<span className="font-medium text-black dark:text-white text-[10px] rounded-full select-none">
							{initials}
						</span>
					) : (
						<UserIcon size={20} className="text-gray-400" />
					)}
				</div>

				{isOpen && (
					<div className="flex items-start flex-col ml-3 overflow-hidden">
						<div className="text-[12px] truncate text-black dark:text-white">
							{profile?.first_name || profile?.last_name
								? `${profile.first_name || ""} ${profile.last_name || ""}`.trim()
								: `${t.notSet}`}
						</div>
						<div className="text-[12px] text-gray-400 truncate">{user?.email}</div>
					</div>
				)}
			</button>
			{isPopoverOpen && (
				<Portal>
					<>
						<div className="fixed inset-0 z-40" onClick={() => setIsPopoverOpen(false)} />

						<div
							className="
								items-center
								fixed z-50
								w-[260px]
								p-2
							"
							style={{
								top: coords.top,
								left: coords.left,
								transform: "translateY(-100%)",
							}}
						>
							<Settings />
						</div>
					</>
				</Portal>
			)}
		</section>
	);
}

export default ProfileSidebar;
