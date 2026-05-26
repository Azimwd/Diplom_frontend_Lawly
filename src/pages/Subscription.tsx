import {
	Sparkles,
	MessageSquare,
	Zap,
	Cpu,
	BrainCircuit,
	Layers,
	X,
	Calendar1,
	CalendarDays,
	Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createInvoice, invoiceUrl, type PlanType } from "../api/subscription";

const Subscription = () => {
	const plans = [
		{
			name: "Free",
			price: "0",
			tagline: "Посмотрите, на что способен ИИ",
			buttonText: "Ваш текущий план",
			buttonVariant: "secondary",
			period: "месяц",
			features: [
				{ icon: <Sparkles size={18} />, text: "Базовая модель" },
				{ icon: <MessageSquare size={18} />, text: "Ограниченное количество сообщений и загрузок" },
				{ icon: <Zap size={18} />, text: "Ограниченная память" },
			],
			isPaid: false,
		},
		{
			name: "Plus",
			price: "9 990",
			code: "1m",
			tagline: "Откройте все возможности",
			buttonText: "Перейти на Plus",
			buttonVariant: "primary",
			badge: "популярный",
			period: "месяц",
			features: [
				{ icon: <Cpu size={18} />, text: "Расширенные модели" },
				{ icon: <MessageSquare size={18} />, text: "Еще больше сообщений и загрузок" },
				{ icon: <BrainCircuit size={18} />, text: "Продвинутая генерация документов" },
				{ icon: <Zap size={18} />, text: "Расширенная память для чатов" },
				{ icon: <Layers size={18} />, text: "Проекты и пользовательские GPT" },
				{ icon: <Calendar size={18} />, text: "1 месяц" },
			],
			isPaid: true,
		},
		{
			name: "Pro",
			price: "49 990",
			code: "6m",
			tagline: "Откройте все возможности",
			buttonText: "Перейти на Pro",
			buttonVariant: "primary",
			period: "полгода",
			features: [
				{ icon: <Cpu size={18} />, text: "Расширенные модели" },
				{ icon: <MessageSquare size={18} />, text: "Еще больше сообщений и загрузок" },
				{ icon: <BrainCircuit size={18} />, text: "Продвинутая генерация документов" },
				{ icon: <Zap size={18} />, text: "Расширенная память для чатов" },
				{ icon: <Layers size={18} />, text: "Проекты и пользовательские GPT" },
				{ icon: <CalendarDays size={18} />, text: "6 месяц" },
			],
			isPaid: true,
		},
		{
			name: "Premium",
			price: "89 990",
			code: "1y",
			tagline: "Откройте все возможности",
			buttonText: "Перейти на Premium",
			buttonVariant: "primary",
			period: "год",
			features: [
				{ icon: <Cpu size={18} />, text: "Расширенные модели" },
				{ icon: <MessageSquare size={18} />, text: "Еще больше сообщений и загрузок" },
				{ icon: <BrainCircuit size={18} />, text: "Продвинутая генерация документов" },
				{ icon: <Zap size={18} />, text: "Расширенная память для чатов" },
				{ icon: <Layers size={18} />, text: "Проекты и пользовательские GPT" },
				{ icon: <Calendar1 size={18} />, text: "1 лет" },
			],
			isPaid: true,
		},
	];

	const handleClick = async (planCode: PlanType) => {
		try {
			const invoiceData = await createInvoice(planCode);

			const currentInvoiceId = invoiceData?.data?.invoice_id;

			if (currentInvoiceId) {
				const urlData = await invoiceUrl(currentInvoiceId);

				const paymentUrl = typeof urlData === "string" ? urlData : urlData?.url;

				if (paymentUrl) {
					window.location.href = paymentUrl;
				} else {
					console.error("URL для оплаты не найден в ответе сервера! Вот что пришло:", urlData);
				}
			} else {
				console.error("ID инвойса не найден. Проверьте формат invoiceData в консоли!");
			}
		} catch (error) {
			console.error("Ошибка при переходе к оплате:", error);
		}
	};

	const navigate = useNavigate();

	return (
		<div className="min-h-screen bg-[#ffffff] text-white py-12 px-4 font-sans relative">
			<div
				onClick={() => navigate("/chat")}
				className="absolute top-6 right-8 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
			>
				<X size={24} />
			</div>

			<div className="max-w-8xl mx-auto flex flex-col items-center">
				<h1 className="text-3xl font-medium mb-10 text-black">Обновите свой план</h1>

				<div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-full">
					{plans.map((plan, index) => (
						<div
							key={index}
							style={{
								background: plan.isPaid
									? "linear-gradient(to bottom, #001A41 0%, #0d0f12 100%)"
									: "#ffffff",
								border: plan.isPaid ? "1px solid #001A41 " : "1px solid #1f1f5a",
							}}
							className="relative rounded-[24px] p-10 flex flex-col min-h-[800px] shadow-sm"
						>
							{plan.badge && (
								<div className="absolute top-8 right-8 bg-[#3d3d7a]/20 text-[#5c5cff] text-[10px] uppercase trac	king-wider px-2 py-1 rounded-md font-bold">
									{plan.badge}
								</div>
							)}

							<div className="mb-10">
								<h3
									className={`text-2xl font-bold mb-6 ${plan.isPaid ? "text-white" : "text-[#001A41]"}`}
								>
									{plan.name}
								</h3>
								<div className="flex items-baseline mb-1">
									<span
										className={`text-[16px] font-bold self-start mt-2 mr-0.5 ${plan.isPaid ? "text-white" : "text-[#001A41]"}`}
									>
										₸
									</span>
									<span
										className={`text-6xl font-bold tracking-tight ${plan.isPaid ? "text-white" : "text-[#001A41]"}`}
									>
										{plan.price}
									</span>
									<span
										className={`ml-2 text-[10px] uppercase font-medium ${plan.isPaid ? "text-gray-200" : "text-gray-500"}`}
									>
										KZT/{plan.period}
									</span>
								</div>
								<p
									className={`text-sm font-medium mt-6 leading-relaxed ${plan.isPaid ? "text-gray-100" : "text-gray-900"}`}
								>
									{plan.tagline}
								</p>
							</div>

							{/* Кнопка */}
							<button
								onClick={() => plan.isPaid && handleClick(plan.code as PlanType)}
								className={`w-full py-4 px-6 rounded-full font-bold text-sm mb-12 transition-all ${
									plan.buttonVariant === "primary"
										? "bg-[#5c5cff] text-white hover:bg-[#4a4aff] shadow-lg cursor-pointer"
										: "bg-transparent text-gray-400 border border-gray-200 cursor-default"
								}`}
							>
								{plan.buttonText}
							</button>

							{/* Список функций */}
							<div className="space-y-5">
								{plan.features.map((feature, fIndex) => (
									<div key={fIndex} className="flex items-start gap-4">
										<div
											className={`${plan.isPaid && fIndex < 9 ? "text-white" : "text-gray-400"} mt-0.5 flex-shrink-0`}
										>
											{feature.icon}
										</div>
										<span
											className={`text-[14px] font-medium leading-snug ${plan.isPaid && fIndex < 9 ? "text-white" : "text-gray-700"}`}
										>
											{feature.text}
										</span>
									</div>
								))}
							</div>
						</div>
					))}
				</div>

				<p className="mt-16 text-[11px] text-gray-400 text-center max-w-xl leading-normal">
					Без ограничений с учетом мер защиты от неправомерного использования. <br />
					Применяются условия использования и политика конфиденциальности.
				</p>
			</div>
		</div>
	);
};

export default Subscription;
