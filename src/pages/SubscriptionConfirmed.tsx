import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SubscriptionConfirmed = () => {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4 font-sans relative overflow-hidden">
			{/* Декоративные фоновые элементы (свечение) */}
			<div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#5c5cff] opacity-10 rounded-full blur-[100px] pointer-events-none"></div>
			<div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#001A41] opacity-10 rounded-full blur-[100px] pointer-events-none"></div>

			<div className="bg-white rounded-[32px] p-10 max-w-md w-full shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-gray-100 relative z-10 flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
				{/* Иконка успеха */}
				<div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-8 relative">
					<div className="absolute inset-0 bg-green-400 opacity-20 rounded-full animate-ping"></div>
					<CheckCircle2 size={48} strokeWidth={2.5} className="relative z-10" />
				</div>

				{/* Текст */}
				<h1 className="text-3xl font-bold text-[#001A41] mb-4">Оплата прошла успешно!</h1>
				<p className="text-gray-500 mb-8 text-[15px] leading-relaxed">
					Ваша подписка успешно активирована. Теперь вам доступны все премиум-функции, расширенные модели и
					увеличенная память.
				</p>

				{/* Блок с деталями подписки */}
				<div className="bg-[#f8f9fc] rounded-[20px] w-full p-6 mb-10 border border-gray-100/50 text-left">
					<div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200/60">
						<span className="text-sm font-medium text-gray-500">Статус</span>
						<span className="text-sm font-bold text-green-500 uppercase tracking-wider bg-green-100 px-3 py-1 rounded-md">
							Оплачено
						</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="text-sm font-medium text-gray-500">Ваш новый план</span>
						<span className="text-sm font-bold text-[#001A41] flex items-center gap-1.5">
							<Sparkles size={16} className="text-[#5c5cff]" />
							Premium AI
						</span>
					</div>
				</div>

				{/* Кнопка возврата */}
				<button
					onClick={() => navigate("/chat")}
					className="w-full bg-[#5c5cff] hover:bg-[#4a4aff] text-white py-4 px-6 rounded-full font-bold text-sm transition-all shadow-lg shadow-[#5c5cff]/25 hover:shadow-[#5c5cff]/40 flex items-center justify-center gap-2 group"
				>
					Перейти в чат
					<ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
				</button>

				<p className="mt-6 text-[11px] text-gray-400 text-center">
					Чек и детали транзакции отправлены на вашу электронную почту.
				</p>
			</div>
		</div>
	);
};

export default SubscriptionConfirmed;
