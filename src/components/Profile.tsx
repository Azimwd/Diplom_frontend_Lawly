import { useRef, useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { updateProfile, type UserProfileUpdate } from "../api/chat";
import { Camera, UserIcon, X } from "lucide-react";
import Portal from "./Portal";
import { translations, type Language } from "../utils/translations";

interface ProfileProps {
	onClose?: () => void;
}

function Profile({ onClose }: ProfileProps) {
	const { user, profile, setProfile } = useUser();
	const [firstName, setFirstName] = useState(profile?.first_name || "");
	const [lastName, setLastName] = useState(profile?.last_name || "");
	const [phone, setPhone] = useState(profile?.phoneNumber || "");
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [avatarPreview, setAvatarPreview] = useState<string | null>(profile?.avatar || null);

	const [isMobile, setIsMobile] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 768);
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	const handleAvatarClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setSelectedFile(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setAvatarPreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!user) return;

		setLoading(true);
		setError("");

		const data: UserProfileUpdate = {
			first_name: firstName,
			last_name: lastName,
			phoneNumber: phone,
			avatar: selectedFile,
		};

		const updatedProfile = await updateProfile(user.id, data);

		if (updatedProfile) {
			setProfile(profile ? { ...profile, ...updatedProfile } : updatedProfile);
			setSuccess(true);
			setSelectedFile(null);
		} else {
			setError("Ошибка при обновлении профиля");
		}
		setLoading(false);
	};

	const stopPropagation = (e: React.MouseEvent | React.TouchEvent) => {
		e.stopPropagation();
		if (e.nativeEvent && e.nativeEvent.stopImmediatePropagation) {
			e.nativeEvent.stopImmediatePropagation();
		}
	};

	const lang = (profile?.language as Language) || "ru";
	const t = translations[lang].profilefield;

	const formContent = (
		<form
			onSubmit={handleSubmit}
			onClick={stopPropagation}
			onMouseDown={stopPropagation}
			onTouchStart={stopPropagation}
			className={`flex flex-col gap-4 text-gray-900 dark:text-white bg-white dark:bg-[#1f1f1f] ${
				isMobile ? "p-6 rounded-xl w-full max-w-sm shadow-2xl relative z-10 mb-20" : ""
			}`}
		>
			<div className="flex justify-between items-center border-b border-gray-200 dark:border-[#444] pb-2 mb-1">
				<h3 className="text-lg font-semibold">{t.ChangeAvatar}</h3>

				{isMobile && onClose && (
					<button
						type="button"
						onClick={(e) => {
							stopPropagation(e);
							onClose();
						}}
						className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
					>
						<X size={20} />
					</button>
				)}
			</div>

			<div className="flex flex-col gap-2 items-center mb-2">
				<label className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider self-start">
					{t.Avatar}
				</label>
				<div className="relative group cursor-pointer" onClick={handleAvatarClick}>
					<div className="h-[90px] w-[90px] rounded-full overflow-hidden border-2 border-gray-200 dark:border-[#444] group-hover:border-blue-500 transition-all bg-gray-100 dark:bg-[#2a2a2a] flex items-center justify-center">
						{avatarPreview ? (
							<img src={avatarPreview} alt="avatar" className="h-full w-full object-cover" />
						) : (
							<UserIcon size={40} className="text-gray-400 dark:text-gray-500" />
						)}
					</div>

					<div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
						<Camera size={24} className="text-white" />
					</div>

					<input
						type="file"
						ref={fileInputRef}
						onChange={handleFileChange}
						className="hidden"
						accept="image/*"
					/>
				</div>
				<p className="text-[10px] text-gray-500 dark:text-gray-400">{t.EditProfile}</p>
			</div>

			<div className="flex flex-col gap-1">
				<label className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">
					{t.NameField}
				</label>
				<input
					type="text"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					className="bg-gray-50 dark:bg-[#2a2a2a] text-gray-900 dark:text-white border border-gray-300 dark:border-[#444] placeholder-gray-400 dark:placeholder-gray-500 rounded p-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
					placeholder={t.Pname}
				/>
			</div>

			<div className="flex flex-col gap-1">
				<label className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">
					{t.LastNameField}
				</label>
				<input
					type="text"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					className="bg-gray-50 dark:bg-[#2a2a2a] text-gray-900 dark:text-white border border-gray-300 dark:border-[#444] placeholder-gray-400 dark:placeholder-gray-500 rounded p-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
					placeholder={t.Lname}
				/>
			</div>

			<div className="flex flex-col gap-1">
				<label className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">
					{t.NumberField}
				</label>
				<input
					type="text"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					className="bg-gray-50 dark:bg-[#2a2a2a] text-gray-900 dark:text-white border border-gray-300 dark:border-[#444] placeholder-gray-400 dark:placeholder-gray-500 rounded p-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
					placeholder="+7 (___) ___ __ __"
				/>
			</div>

			{error && (
				<div className="text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-200 dark:border-red-900/50">
					{error}
				</div>
			)}
			{success && (
				<div className="text-green-700 dark:text-green-400 text-sm bg-green-50 dark:bg-green-900/20 p-2 rounded border border-green-200 dark:border-green-900/50">
					Профиль обновлен!
				</div>
			)}

			<button
				type="submit"
				disabled={loading}
				className="bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white py-2 mt-2 rounded font-medium transition-all disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed active:scale-[0.98]"
			>
				{loading ? "Сохраняем..." : "Сохранить"}
			</button>
		</form>
	);

	if (isMobile) {
		return (
			<Portal>
				<div
					className="fixed inset-0 z-[100] flex items-center justify-center p-4 cursor-pointer"
					onClick={onClose}
				>
					<div className="absolute inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm" />

					{formContent}
				</div>
			</Portal>
		);
	}

	return formContent;
}

export default Profile;
