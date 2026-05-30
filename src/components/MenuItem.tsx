import React from "react";

interface MenuItemProps {
	icon: React.ReactNode;
	text: string;
	badge?: string;
	rightElement?: React.ReactNode;
}

export default function MenuItem({ icon, text, badge, rightElement }: MenuItemProps) {
	return (
		<button className="flex items-center justify-between w-full px-2.5 py-2 rounded-[6px] transition-colors text-left group cursor-pointer text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#424242]">
			<div className="flex items-center">
				<span className="text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors mr-3">
					{icon}
				</span>
				<span className="text-[14px]">{text}</span>
			</div>

			<div className="flex items-center">
				{badge && (
					<span className="bg-blue-100 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 text-[10px] font-semibold px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-500/30">
						{badge}
					</span>
				)}
				{rightElement}
			</div>
		</button>
	);
}
