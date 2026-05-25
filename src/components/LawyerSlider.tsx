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
		<div className="mt-4 flex flex-col w-full max-w-[650px] bg-transparent  w-hidden text-white">
			{/* КНОПКА ВВЕРХ */}
			<button
				onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
				disabled={currentIndex === 0}
				className="flex justify-center items-center py-2 hover:bg-[#252525] disabled:opacity-0 transition-all border-b border-[#333] cursor-pointer disabled:cursor-default rounded-t-xl"
			>
				<ChevronUp className="w-5 h-5 text-gray-400" />
			</button>

			{/* ХЕДЕР КАРТОЧКИ */}
			<div className="px-4 py-3 flex justify-between items-center bg-[#212121]">
				<span className="text-[14px] font-bold uppercase tracking-wider">Топ специалистов</span>
				<span className="text-[12px] text-gray-400 bg-[#2a2a2a] px-2 py-1 rounded-md">
					{currentIndex + 1} из {lawyers.length}
				</span>
			</div>

			{/* КОНТЕНТ */}
			<div className="p-5 flex flex-col gap-4 min-h-[300px]">
				{/* Имя и Рейтинг/Винрейт */}
				<div className="flex justify-between items-start">
					<div>
						<h4 className="text-[18px] font-bold leading-tight">{name}</h4>
						<p className="text-[#1E4FE0] text-[14px] font-medium mt-1">{specialization}</p>
					</div>
					{rating !== undefined && (
						<div className="bg-[#1E4FE0] text-white px-3 py-1 rounded-lg text-[14px] font-bold shadow-lg shadow-blue-900/20 whitespace-nowrap">
							winrate_
							{item.win_rate ? `${item.win_rate}%` : ` ${rating}`}
						</div>
					)}
				</div>

				{/* Характеристики */}
				<div className="grid grid-cols-2 gap-2">
					<div className="bg-[#252525] p-2 rounded-lg border border-[#333]">
						<p className="text-[11px] text-gray-500 uppercase">Опыт / Дел</p>
						<p className="text-[13px] text-gray-200">
							{experience ? `${experience} лет` : item.total ? `${item.total} дел` : "—"}
						</p>
					</div>
					<div className="bg-[#252525] p-2 rounded-lg border border-[#333]">
						<p className="text-[11px] text-gray-500 uppercase">Результат</p>
						<p className="text-[13px] text-gray-200">
							{price ? `От ${price} ₸` : item.wins !== undefined ? `${item.wins} побед` : "По запросу"}
						</p>
					</div>
					<div className="bg-[#252525] p-2 rounded-lg border border-[#333] col-span-2">
						<p className="text-[11px] text-gray-500 uppercase">Локация</p>
						<p className="text-[13px] text-gray-200">{city || "Республика Казахстан"}</p>
					</div>
				</div>

				{/* Описание */}
				<div className="flex flex-col gap-1 justify-start items-start">
					<p className="text-[11px] text-gray-500 uppercase">Информация</p>
					<div className="max-h-[100px] overflow-y-auto pr-2 ">
						<p className="text-[14px] text-gray-300 leading-relaxed">
							{description ||
								(item.wins !== undefined
									? `Юрист имеет ${item.wins} успешных исходов из ${item.total} рассмотренных дел по данной категории.`
									: "Информация подготавливается...")}
						</p>
					</div>
				</div>
			</div>

			{/* КНОПКА ВНИЗ */}
			<button
				onClick={() => setCurrentIndex((prev) => Math.min(lawyers.length - 1, prev + 1))}
				disabled={currentIndex === lawyers.length - 1}
				className="flex justify-center items-center py-2 hover:bg-[#252525] disabled:opacity-0 transition-all border-t border-[#333] cursor-pointer disabled:cursor-default rounded-b-xl"
			>
				<ChevronDown className="w-5 h-5 text-gray-400" />
			</button>
		</div>
	);
}
