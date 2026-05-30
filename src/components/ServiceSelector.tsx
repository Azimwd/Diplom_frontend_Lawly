import { FileText, BookMarked, Calculator, UserSearch, ChartColumnBig } from "lucide-react";
import { translations, type Language } from "../utils/translations";
import { useUser } from "../context/UserContext";

interface ServiceSelectorProps {
	onDocCreated: () => void;
	switchToChat: () => void;
	onCalculating: () => void;
	onWinChance: () => void;
	onTopLawyer: () => void;
}

export default function ServiceSelector({
	onDocCreated,
	switchToChat,
	onCalculating,
	onWinChance,
	onTopLawyer,
}: ServiceSelectorProps) {
	const { profile } = useUser();
	const lang = (profile?.language as Language) || "ru";
	const t = translations[lang].Services;

	const services = [
		{
			id: "lawyer",
			icon: UserSearch,
			text: t.findtext,
			onClick: onTopLawyer,
		},
		{
			id: "win_chance",
			icon: ChartColumnBig,
			text: t.chancetext,
			onClick: onWinChance,
		},
		{
			id: "calculator",
			icon: Calculator,
			text: t.calctext,
			onClick: onCalculating,
		},
		{
			id: "document",
			icon: FileText,
			text: t.doctext,
			onClick: onDocCreated,
		},
		{
			id: "consultation",
			icon: BookMarked,
			text: t.consultext,
			onClick: switchToChat,
		},
	];

	return (
		<div className="grid grid-cols-2 md:flex md:flex-col gap-2 md:gap-1 w-full">
			{services.map((service) => {
				const Icon = service.icon;
				return (
					<button
						key={service.id}
						className="
							flex flex-col md:flex-row items-center justify-center md:justify-start 
							gap-2 md:gap-3 
							p-3 md:px-3 md:py-2 
							rounded-[12px] md:rounded-[8px] 
							bg-[#2A2A2A] md:bg-transparent 
							hover:bg-[#333333] md:hover:bg-[#2A2A2A] 
							transition-all duration-200 cursor-pointer 
							active:scale-95 md:active:scale-100
						"
						onClick={(e) => {
							e.stopPropagation();
							service.onClick();
						}}
					>
						{/* Иконка чуть больше на мобилке */}
						<Icon className="w-[20px] h-[20px] md:w-[16px] md:h-[16px] text-white opacity-90" />

						{/* Текст центрируется на мобилке и выравнивается по левому краю на ПК */}
						<span className="text-[12px] md:text-[12px] text-white text-center md:text-left leading-tight">
							{service.text}
						</span>
					</button>
				);
			})}
		</div>
	);
}
