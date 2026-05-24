import React from "react";

interface MenuItemProps {
	icon: React.ReactNode;
	text: string;
	badge?: string;
	rightElement?: React.ReactNode;
}
export default function MenuItem({ icon, text, badge, rightElement }: MenuItemProps) {
	return (
		<button className="flex items-center justify-between w-full px-2.5 py-2 rounded-[6px] hover:bg-[#424242] transition-colors text-left group text-gray-200 hover:text-white cursor-pointer">
			<div className="flex items-center">
				<span className="text-gray-400 group-hover:text-gray-200 transition-colors mr-3">{icon}</span>
				<span className="text-[14px]">{text}</span>
			</div>

			<div className="flex items-center">
				{badge && (
					<span className="bg-blue-600/20 text-blue-400 text-[10px] font-semibold px-1.5 py-0.5 rounded border border-blue-500/30">
						{badge}
					</span>
				)}
				{rightElement}
			</div>
		</button>
	);
}
