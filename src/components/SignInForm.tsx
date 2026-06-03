import { NavLink, useNavigate } from "react-router-dom";
import { getMyProfile } from "../api/chat";
import { requestReset } from "../api/resetpassword";
import { loginUser } from "../api/user";
import { useUser } from "../context/UserContext";
import googleicon from "../assets/search.svg";
import AuthInput from "../ui/AuthInput";
import React, { useState } from "react";

interface PropsSignIn {
	path: string;
}

export default function SignInForm({ path }: PropsSignIn) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [showSuccessScreen, setShowSuccessScreen] = useState(false);

	// Состояния для модального окна восстановления пароля
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [resetEmail, setResetEmail] = useState("");
	const [resetLoading, setResetLoading] = useState(false);
	const [resetError, setResetError] = useState("");
	const [resetSuccess, setResetSuccess] = useState(false);

	const navigate = useNavigate();

	const makeChangeHandler = (setter: (v: string) => void) => (eOrVal: any) => {
		const value = typeof eOrVal === "string" ? eOrVal : (eOrVal?.target?.value ?? "");
		setter(value);
	};

	const { setUser, setProfile } = useUser();

	const handleClick = () => {
		sessionStorage.setItem("showSplash", "true");
		window.location.href = "https://lawly.up.railway.app/accounts/google/login/?process=login";
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const data = await loginUser({ email, password });

			if (data?.success) {
				setUser(data.data);
				const profileData = await getMyProfile(data.data.id);
				setProfile(profileData);

				sessionStorage.setItem("showSplash", "true");

				setShowSuccessScreen(true);
				setTimeout(() => {
					navigate("/chat");
				}, 2000);
			} else {
				setError(data?.message || "Не удалось войти");
				setLoading(false);
			}
		} catch (error: any) {
			console.log(error);
			setError(error.response?.data?.message || "Произошла ошибка");
			setLoading(false);
		}
	};

	const handleResetSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setResetError("");
		setResetLoading(true);

		try {
			const response = await requestReset(resetEmail);

			if (response?.success) {
				setResetSuccess(true);
			} else {
				setResetError(response?.message || "Не удалось отправить запрос");
			}
		} catch (err: any) {
			setResetError(err.response?.data?.message || "Произошла ошибка при отправке");
		} finally {
			setResetLoading(false);
		}
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setResetEmail("");
		setResetError("");
		setResetSuccess(false);
	};

	if (showSuccessScreen) {
		return (
			<div className="flex flex-col items-center justify-center h-[300px]">
				<div className="w-14 h-14 border-4 border-gray-200 border-t-[#1E4FE0] rounded-full animate-spin mb-4"></div>
				<h2 className="text-[#1E1E2F] text-[24px] font-bold">Welcome back!</h2>
				<p className="text-[#666666] mt-2">Preparing your chats...</p>
			</div>
		);
	}

	return (
		<div className="text-center relative">
			<form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
				<h2
					className="justify-center align-center text-[#1E1E2F] items-center flex text-[64px]/[16px] font-bold tracking-[-2px]
				pb-[32px]"
				>
					Sign In
				</h2>
				<AuthInput id="Email" label="Email" type="text" value={email} onChange={makeChangeHandler(setEmail)} />
				<div className="flex flex-col gap-2">
					<AuthInput
						id="Password"
						label="Password"
						type="password"
						value={password}
						onChange={makeChangeHandler(setPassword)}
					/>
					{/* Кнопка "Забыли пароль?" */}
					<div className="text-right">
						<button
							type="button"
							onClick={() => setIsModalOpen(true)}
							className="text-[#1E4FE0] text-[14px] hover:underline"
						>
							Forgot password?
						</button>
					</div>
				</div>
				{error && <div className=" text-red-800 mt-[-10px] text-[14px]">{error}</div>}
				<button
					type="submit"
					disabled={loading}
					className="bg-[#1E4FE0] h-[52px] hover:cursor-pointer rounded-[3px] mt-[-7px] hover:bg-[#1f43ad] text-[16px] font-bold text-white transition-all disabled:opacity-50"
				>
					{loading ? "Signing in..." : "Sign In"}
				</button>
				<div className="text-[#666666] text-[14px] items-center flex justify-center mt-[-7px]">
					Don`t have an account? &nbsp;
					<NavLink to={path} className="text-[#1E4FE0] underline underline-offset-1px">
						Sign Up
					</NavLink>
				</div>
				<div className="flex items-center mt-[-15px]">
					<div className="flex-grow h-px bg-[#1E1E2F]"></div>
					<span className="px-4 text-[#1E1E2F]">or</span>
					<div className="flex-grow h-px bg-[#1E1E2F]"></div>
				</div>
			</form>
			<div className="flex justify-center items-center">
				<button
					className=" w-[250px] h-[54px] text-black border mt-[15px] border-black rounded-[6px] text-[14px] cursor-pointer flex items-center justify-center gap-[13px] hover:bg-gray-100"
					type="button"
					onClick={handleClick}
				>
					<img src={googleicon} className="w-[30px] h-[30px]" alt="Google" />
					Sign In with Google
				</button>
			</div>

			{isModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-[#E5E6E6] bg-opacity-50 px-4">
					<div className="bg-white p-6 rounded-[8px] shadow-lg w-[400px] max-w-full relative text-left">
						<button
							type="button"
							onClick={closeModal}
							className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-[24px]"
						>
							&times;
						</button>
						<h3 className="text-[20px] font-bold text-[#1E1E2F] mb-4">Reset Password</h3>

						{resetSuccess ? (
							<div className="flex flex-col gap-4">
								<p className="text-[14px] text-green-700 bg-green-50 p-3 rounded">
									Instructions to reset your password have been sent to your email.
								</p>
								<button
									type="button"
									onClick={closeModal}
									className="w-full bg-[#1E4FE0] text-white py-2 rounded-[3px] font-bold hover:bg-[#1f43ad]"
								>
									Close
								</button>
							</div>
						) : (
							<form onSubmit={handleResetSubmit} className="flex flex-col gap-4">
								<p className="text-[14px] text-[#666666]">
									Enter your email address and we will send you a link to reset your password.
								</p>
								<AuthInput
									id="ResetEmail"
									label="Email"
									type="email"
									value={resetEmail}
									onChange={makeChangeHandler(setResetEmail)}
								/>
								{resetError && <div className="text-red-800 text-[14px]">{resetError}</div>}
								<button
									type="submit"
									disabled={resetLoading}
									className="bg-[#1E4FE0] h-[48px] rounded-[3px] text-white font-bold hover:bg-[#1f43ad] transition-all disabled:opacity-50"
								>
									{resetLoading ? "Sending..." : "Send Reset Link"}
								</button>
							</form>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
