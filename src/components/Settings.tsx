import { useUser } from "../context/UserContext";
import { CreditCard, Palette, Globe, LogOut, User as UserIcon } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { translations, type Language } from "../utils/translations";
import MenuItem from "./MenuItem";
import Profile from "./Profile";
import Cookies from "js-cookie";
import { switchLanguage, switchTheme } from "../api/settings";
import { getStatusSubscription } from "../api/subscription";

const LANGUAGES = [
	{ code: "ru", label: "Русский" },
	{ code: "en", label: "English" },
	{ code: "kk", label: "Қазақша" },
];

export default function Settings() {
	const { user, loading, profile, setProfile } = useUser();
	const langKey = (profile?.language as Language) || "ru";
	const t = translations[langKey].settings;

	const THEMES = [
		{ code: "dark", label: t.themes.dark },
		{ code: "light", label: t.themes.light },
	];

	const [open, setOpen] = useState(false);
	const [langOpen, setLangOpen] = useState(false);
	const [themeOpen, setThemeOpen] = useState(false);

	const currentLang = LANGUAGES.find((l) => l.code === profile?.language) || LANGUAGES[0];
	const currentTheme = THEMES.find((th) => th.code === (profile?.theme || "dark")) || THEMES[0];

	const containerRef = useRef<HTMLDivElement>(null);
	const langContainerRef = useRef<HTMLDivElement>(null);
	const themeContainerRef = useRef<HTMLDivElement>(null);

	const navigate = useNavigate();

	if (loading) return null;

	const handleLanguageChange = async (lang: (typeof LANGUAGES)[0]) => {
		if (!profile?.id) return;

		try {
			const updatedData = await switchLanguage(profile.id, lang.code);
			if (updatedData) {
				setProfile({ ...profile, language: lang.code });
			}
		} catch (err) {
			console.error("Ошибка при смене языка", err);
		} finally {
			setLangOpen(false);
		}
	};

	const handleThemeChange = async (theme: (typeof THEMES)[0]) => {
		if (!profile?.id) return;

		try {
			const updatedData = await switchTheme(profile.id, theme.code);
			if (updatedData) {
				setProfile({ ...profile, theme: theme.code });
				if (theme.code === "dark") {
					document.documentElement.classList.add("dark");
				} else {
					document.documentElement.classList.remove("dark");
				}
			}
		} catch (err) {
			console.error("Ошибка при смене темы", err);
		} finally {
			setThemeOpen(false);
		}
	};

	const currentAvatar = profile?.avatar || null;

	const [subBadge, setSubBadge] = useState<string>("Basic");

	const PLAN_BADGES: Record<string, string> = {
		"1m": "Plus",
		"6m": "Pro",
		"1y": "Premium",
	};

	useEffect(() => {
		const fetchSubscription = async () => {
			try {
				const response = await getStatusSubscription();

				if (response?.success && response?.data?.is_active) {
					const planCode = response.data.subscription.plan;
					setSubBadge(PLAN_BADGES[planCode] || "Basic");
				} else {
					setSubBadge("Basic");
				}
			} catch (error) {
				console.error("Ошибка при получении статуса подписки:", error);
				setSubBadge("Basic");
			}
		};

		fetchSubscription();
	}, []);

	const getInitials = () => {
		const firstName = profile?.first_name || "";
		const lastName = profile?.last_name || "";
		return (firstName[0] || "" + lastName[0] || "").toUpperCase();
	};
	const initials = getInitials();

	const handleLogout = () => {
		Cookies.remove("access_token");
		Cookies.remove("refresh_token");
		navigate("/login");
	};

	return (
		<div className="flex items-center justify-center">
			<div ref={containerRef} className="relative max-w-[260px] w-full">
				<div className="flex flex-col relative bg-white dark:bg-[#1f1f1f] text-gray-900 dark:text-white rounded-[12px] border border-gray-200 dark:border-[#444] font-sans shadow-sm dark:shadow-none transition-colors duration-200">
					<button
						onClick={() => setOpen((prev) => !prev)}
						className="flex items-center px-3 py-3 w-full hover:bg-[#98caff] dark:hover:bg-[#424242] transition-colors rounded-t-[12px]"
					>
						<div className="h-[36px] w-[36px] rounded-full bg-gray-200 dark:bg-[#4A4A4A] text-gray-600 dark:text-white flex items-center justify-center overflow-hidden border border-gray-300 dark:border-[#555]">
							{currentAvatar ? (
								<img src={currentAvatar} alt="Avatar" className="h-full w-full object-cover" />
							) : (
								<span className="text-[13px]">{initials || <UserIcon size={20} />}</span>
							)}
						</div>
						<div className="flex flex-col ml-3 text-left overflow-hidden">
							<div className="text-[14px] font-medium truncate text-gray-900 dark:text-gray-100">
								{profile?.first_name ? `${profile.first_name} ${profile.last_name || ""}` : t.notSet}
							</div>
							<div className="text-[12px] text-gray-500 dark:text-gray-400 truncate">{user?.email}</div>
						</div>
					</button>

					<div className="h-[1px] bg-gray-200 dark:bg-[#4A4A4A] w-[90%] mx-auto my-1 transition-colors duration-200"></div>

					<div className="flex flex-col px-1.5 py-1 gap-0.5">
						<Link to="/subscription">
							<MenuItem icon={<CreditCard size={18} />} text={t.subscription} badge={subBadge} />
						</Link>

						{/* Меню Темы */}
						<div className="relative" ref={themeContainerRef}>
							<div
								onClick={() => {
									setThemeOpen(!themeOpen);
									setLangOpen(false);
								}}
								className="cursor-pointer"
							>
								<MenuItem
									icon={<Palette size={18} />}
									text={t.appearance}
									rightElement={
										<span className="text-xs text-gray-500 dark:text-gray-400">
											{currentTheme.label}
										</span>
									}
								/>
							</div>
							{themeOpen && (
								<div className="absolute top-0 left-full ml-2 w-[160px] bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-[#444] rounded-xl shadow-lg dark:shadow-2xl z-[60] py-1 transition-colors duration-200">
									{THEMES.map((th) => (
										<button
											key={th.code}
											onClick={() => handleThemeChange(th)}
											className={`w-full text-left px-3 py-2 text-[14px] hover:bg-gray-100 dark:hover:bg-[#424242] flex items-center justify-between transition-colors
												${
													currentTheme.code === th.code
														? "text-gray-900 bg-gray-100 dark:text-white dark:bg-[#333]"
														: "text-gray-600 dark:text-gray-300"
												}`}
										>
											{th.label}
											{currentTheme.code === th.code && (
												<div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
											)}
										</button>
									))}
								</div>
							)}
						</div>

						{/* Меню Языка */}
						<div className="relative" ref={langContainerRef}>
							<div
								onClick={() => {
									setLangOpen(!langOpen);
									setThemeOpen(false);
								}}
								className="cursor-pointer"
							>
								<MenuItem
									icon={<Globe size={18} />}
									text={t.language}
									rightElement={
										<span className="text-xs text-gray-500 dark:text-gray-400">
											{currentLang.label}
										</span>
									}
								/>
							</div>
							{langOpen && (
								<div className="absolute top-0 left-full ml-2 w-[160px] bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-[#444] rounded-xl shadow-lg dark:shadow-2xl z-[60] py-1 transition-colors duration-200">
									{LANGUAGES.map((l) => (
										<button
											key={l.code}
											onClick={() => handleLanguageChange(l)}
											className={`w-full text-left px-3 py-2 text-[14px] hover:bg-gray-100 dark:hover:bg-[#424242] flex items-center justify-between transition-colors
												${
													currentLang.code === l.code
														? "text-gray-900 bg-gray-100 dark:text-white dark:bg-[#333]"
														: "text-gray-600 dark:text-gray-300"
												}`}
										>
											{l.label}
											{currentLang.code === l.code && (
												<div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
											)}
										</button>
									))}
								</div>
							)}
						</div>
					</div>

					{/* Разделитель */}
					<div className="h-[1px] bg-gray-200 dark:bg-[#4A4A4A] w-[90%] mx-auto my-1 transition-colors duration-200"></div>

					<div className="px-1.5 pb-1.5 pt-1">
						<button
							onClick={handleLogout}
							className="flex items-center w-full px-2.5 py-2 rounded-[6px] hover:bg-gray-100 dark:hover:bg-[#424242] text-red-500 dark:text-red-400 transition-colors text-[14px]"
						>
							<LogOut size={18} className="mr-3 opacity-90" />
							<span>{t.logout}</span>
						</button>
					</div>
				</div>

				{/* Всплывающее окно профиля */}
				{open && (
					<div className="absolute top-[-275px] left-full ml-4 z-50 bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-[#444] rounded-xl shadow-xl dark:shadow-2xl p-5 w-[320px] transition-colors duration-200">
						<Profile />
					</div>
				)}
			</div>
		</div>
	);
}
