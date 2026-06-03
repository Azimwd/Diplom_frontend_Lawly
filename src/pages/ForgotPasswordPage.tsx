import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { requestReset, passwordComplete } from "../api/resetpassword";
import AuthInput from "../ui/AuthInput";

type ResetStep = "email" | "password" | "success";

export default function ForgotPasswordPage() {
	const [step, setStep] = useState<ResetStep>("email");
	const [email, setEmail] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [uidb64, setUidb64] = useState("");
	const [token, setToken] = useState("");

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const makeChangeHandler = (setter: (v: string) => void) => (eOrVal: any) => {
		const value = typeof eOrVal === "string" ? eOrVal : (eOrVal?.target?.value ?? "");
		setter(value);
	};

	// Шаг 1: Запрос восстановления (получение uidb64 и token)
	const handleEmailSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const response = await requestReset(email);

			if (response?.uidb64 && response?.token) {
				setUidb64(response.uidb64);
				setToken(response.token);
				setStep("password");
			} else {
				setError(response?.message || "Failed to receive verification details from server.");
			}
		} catch (err: any) {
			setError(err.response?.data?.message || "An error occurred. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	// Шаг 2: Установка нового пароля с использованием uidb64 и token
	const handlePasswordSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!newPassword) {
			setError("Please enter a new password.");
			return;
		}
		setError("");
		setLoading(true);

		try {
			const response = await passwordComplete(uidb64, token, newPassword);

			if (response) {
				setStep("success");
			} else {
				setError("Failed to update password. Please check your connection.");
			}
		} catch (err: any) {
			setError(err.response?.data?.message || "An error occurred during password update.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="text-center flex flex-col items-center justify-center min-h-[400px] bg-[#E5E6E6]">
			<div className="w-[320px] flex flex-col gap-[24px]">
				<h2 className="text-[#1E1E2F] text-[32px] font-bold tracking-[-1px] pb-[8px]">Reset Password</h2>

				{/* Шаг 1: Ввод почты */}
				{step === "email" && (
					<form onSubmit={handleEmailSubmit} className="flex flex-col gap-[24px]">
						<p className="text-[14px] text-[#666666] text-center leading-relaxed">
							Enter your email address and we will verify it to proceed with resetting your password.
						</p>
						<AuthInput
							id="ResetEmail"
							label="Email"
							type="email"
							value={email}
							onChange={makeChangeHandler(setEmail)}
						/>
						{error && <div className="text-red-800 mt-[-10px] text-[14px]">{error}</div>}
						<button
							type="submit"
							disabled={loading}
							className="bg-[#1E4FE0] h-[52px] rounded-[3px] text-[16px] font-bold text-white transition-all disabled:opacity-50 hover:bg-[#1f43ad] cursor-pointer"
						>
							{loading ? "Verifying..." : "Verify Email"}
						</button>
					</form>
				)}

				{/* Шаг 2: Ввод нового пароля */}
				{step === "password" && (
					<form onSubmit={handlePasswordSubmit} className="flex flex-col gap-[24px]">
						<p className="text-[14px] text-[#666666] text-center leading-relaxed">
							Verification successful. Please enter your new secure password below.
						</p>
						<AuthInput
							id="NewPassword"
							label="New Password"
							type="password"
							value={newPassword}
							onChange={makeChangeHandler(setNewPassword)}
						/>
						{error && <div className="text-red-800 mt-[-10px] text-[14px]">{error}</div>}
						<button
							type="submit"
							disabled={loading}
							className="bg-[#1E4FE0] h-[52px] rounded-[3px] text-[16px] font-bold text-white transition-all disabled:opacity-50 hover:bg-[#1f43ad] cursor-pointer"
						>
							{loading ? "Saving..." : "Save Password"}
						</button>
					</form>
				)}

				{/* Шаг 3: Успешный сброс */}
				{step === "success" && (
					<div className="flex flex-col gap-[24px]">
						<p className="text-[14px] text-green-700 bg-green-50 p-4 rounded-[4px] text-center leading-relaxed border border-green-200">
							Your password has been successfully updated. You can now use your new credentials to log in.
						</p>
						<NavLink
							to="/signin"
							className="bg-[#1E4FE0] h-[52px] flex items-center justify-center rounded-[3px] text-[16px] font-bold text-white hover:bg-[#1f43ad] transition-all"
						>
							Go to Sign In
						</NavLink>
					</div>
				)}

				{step !== "success" && (
					<div className="text-[#666666] text-[14px] mt-[-7px]">
						Remember your password? &nbsp;
						<NavLink to="/signin" className="text-[#1E4FE0] underline underline-offset-1px">
							Sign In
						</NavLink>
					</div>
				)}
			</div>
		</div>
	);
}
