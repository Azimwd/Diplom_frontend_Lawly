/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function LawyerSlider({ lawyers }: { lawyers: any[] }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	if (!lawyers || lawyers.length === 0) return null;

	const item = lawyers[currentIndex];
	console.log("Текущий юрист в слайдере:", item);

	const name = item.lawyer || item.name || "Неизвестный юрист";
	const rating = item.win_rate || item.rating;
	const specialization = item.specialization || "Юрист";
	const experience = item.experience;
	const price = item.price;
	const city = item.city;
	const description = item.description;

	return (
		<div className="mt-4 flex flex-col w-full max-w-[650px] bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-[#333] text-gray-900 dark:text-white shadow-sm overflow-hidden">
			<button
				onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
				disabled={currentIndex === 0}
				className="flex justify-center items-center py-2 hover:bg-gray-50 dark:hover:bg-[#252525] disabled:opacity-0 transition-all border-b border-gray-200 dark:border-[#333] cursor-pointer disabled:cursor-default"
			>
				<ChevronUp className="w-5 h-5 text-gray-400 dark:text-gray-500" />
			</button>

			<div className="px-4 py-3 flex justify-between items-center bg-gray-50 dark:bg-[#212121] border-b border-gray-100 dark:border-transparent">
				<span className="text-[14px] font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200">
					Топ специалистов
				</span>
				<span className="text-[12px] text-gray-600 dark:text-gray-400 bg-gray-200/60 dark:bg-[#2a2a2a] px-2 py-1 rounded-md">
					{currentIndex + 1} из {lawyers.length}
				</span>
			</div>

			<div className="p-5 flex flex-col gap-4 min-h-[300px] bg-white dark:bg-[#1e1e1e]">
				<div className="flex justify-between items-start gap-4">
					<div>
						<h4 className="text-[18px] font-bold leading-tight text-gray-950 dark:text-white">{name}</h4>
						<p className="text-[#1E4FE0] dark:text-blue-400 text-[14px] font-medium mt-1">
							{specialization}
						</p>
					</div>

					<div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
						{item.partial_wins && (
							<div className="bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 px-2 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap">
								part_win_ {item.partial_wins}
							</div>
						)}
						{rating !== undefined && (
							<div className="bg-blue-600 dark:bg-[#1E4FE0] text-white px-3 py-1 rounded-lg text-[14px] font-bold shadow-lg shadow-blue-500/10 dark:shadow-blue-900/20 whitespace-nowrap">
								winrate_
								{item.win_rate ? `${item.win_rate}%` : ` ${rating}`}
							</div>
						)}
					</div>
				</div>

				<div className="grid grid-cols-2 gap-2">
					<div className="bg-gray-50 dark:bg-[#252525] p-2 rounded-lg border border-gray-200 dark:border-[#333]">
						<p className="text-[11px] text-gray-500 dark:text-gray-400 uppercase font-medium">Опыт / Дел</p>
						<p className="text-[13px] text-gray-800 dark:text-gray-200">
							{experience ? `${experience} лет` : item.total ? `${item.total} дел` : "—"}
						</p>
					</div>
					<div className="bg-gray-50 dark:bg-[#252525] p-2 rounded-lg border border-gray-200 dark:border-[#333]">
						<p className="text-[11px] text-gray-500 dark:text-gray-400 uppercase font-medium">Результат</p>
						<p className="text-[13px] text-gray-800 dark:text-gray-200">
							{price ? `От ${price} ₸` : item.wins !== undefined ? `${item.wins} побед` : "По запросу"}
						</p>
					</div>
					<div className="bg-gray-50 dark:bg-[#252525] p-2 rounded-lg border border-gray-200 dark:border-[#333] col-span-2">
						<p className="text-[11px] text-gray-500 dark:text-gray-400 uppercase font-medium">Локация</p>
						<p className="text-[13px] text-gray-800 dark:text-gray-200">{city || "Республика Казахстан"}</p>
					</div>
				</div>
			</div>

			<button
				onClick={() => setCurrentIndex((prev) => Math.min(lawyers.length - 1, prev + 1))}
				disabled={currentIndex === lawyers.length - 1}
				className="flex justify-center items-center py-2 hover:bg-gray-50 dark:hover:bg-[#252525] disabled:opacity-0 transition-all border-t border-gray-200 dark:border-[#333] cursor-pointer disabled:cursor-default"
			>
				<ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500" />
			</button>
		</div>
	);
}
