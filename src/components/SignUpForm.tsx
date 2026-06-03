/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthInput from "../ui/AuthInput";
import googleicon from "../assets/search.svg";
import CheckboxInput from "../ui/CheckboxInput";
import { registerUser } from "../api/user";

interface PropsSignUp {
	path: string;
}

export default function SignUpForm({ path }: PropsSignUp) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [cpassword, setCpassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleClick = () => {
		window.location.href = "https://lawly.up.railway.app/users/google/login/";
	};

	const [isAgreed, setIsAgreed] = useState(false);
	const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false);

	const makeChangeHandler = (setter: (v: string) => void) => (eOrVal: any) => {
		const value = typeof eOrVal === "string" ? eOrVal : (eOrVal?.target?.value ?? "");
		setter(value);
	};

	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (loading) return;

		setError("");

		if (!isAgreed || !isPrivacyAccepted) {
			setError("Необходимо принять условия и политику конфиденциальности");
			return;
		}

		try {
			setLoading(true);

			const data = await registerUser({
				email,
				password,
				confirmPassword: cpassword,
				agreementAccepted: isAgreed,
				privacyPolicyAccepted: isPrivacyAccepted,
			});

			navigate("/login");

			console.log("Успешная регистрация: ", data);
		} catch (error: any) {
			console.log(error);
			setError(error.response?.data?.message || "Ошибка регистрации");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="text-center ">
			<form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
				<h2
					className="justify-center align-center text-[#1E1E2F] items-center flex text-[64px]/[16px] font-bold tracking-[-2px]
				pb-[32px]"
				>
					Sign Up
				</h2>
				<AuthInput id="Email" label="Email" type="text" value={email} onChange={makeChangeHandler(setEmail)} />
				<AuthInput
					id="Password"
					label="Password"
					type="password"
					value={password}
					onChange={makeChangeHandler(setPassword)}
				/>
				<AuthInput
					id="Confirm Password"
					label="Confirm password"
					type="password"
					value={cpassword}
					onChange={makeChangeHandler(setCpassword)}
				/>
				<div className="flex flex-col gap-[5px] mt-[-10px]">
					<CheckboxInput
						id="agreementAccepted"
						label="I agree to the terms of use."
						checked={isAgreed}
						onChange={setIsAgreed}
					/>
					<CheckboxInput
						id="privacyPolicyAccepted"
						label="I accept the privacy policy."
						checked={isPrivacyAccepted}
						onChange={setIsPrivacyAccepted}
					/>
				</div>
				<button
					type="submit"
					className="bg-[#1E4FE0] h-[52px] hover:cursor-pointer rounded-[3px] mt-[-7px] hover:bg-[#1f43ad] text-[16px] font-bold"
					value="Sign In"
					disabled={loading}
				>
					{loading ? "Loading..." : "Sign Up"}
				</button>
				{error && <div className=" text-red-800 mt-[-10px] text-[14px] max-w-[320px]">{error}</div>}

				<div className="text-[#666666] text-[14px] items-center flex justify-center mt-[-7px]">
					Don`t have an account? &nbsp;
					<NavLink to={path} className="text-[#1E4FE0] underline underline-offset-1px">
						Sign In
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
					<img src={googleicon} className="w-[30px] h-[30px]" /> Sign Up with Google
				</button>
			</div>
		</div>
	);
}
