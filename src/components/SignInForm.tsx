/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, useNavigate } from "react-router-dom";
import { getMyProfile } from "../api/chat";
import { loginUser } from "../api/user";
import { useUser } from "../context/UserContext";
import googleicon from "../assets/search.svg";
import AuthInput from "../ui/AuthInput";
import React, { useState } from "react";
// global statement для доступа к страницам юзеру если он прежде был залогинен

interface PropsSignIn {
	path: string;
}

export default function SignInForm({ path }: PropsSignIn) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const makeChangeHandler = (setter: (v: string) => void) => (eOrVal: any) => {
		const value = typeof eOrVal === "string" ? eOrVal : (eOrVal?.target?.value ?? "");
		setter(value);
	};

	const { setUser, setProfile } = useUser();

	const handleClick = () => {
		window.location.href = "https://lawly.up.railway.app/accounts/google/login/?process=login";
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const data = await loginUser({
				email,
				password,
			});
			console.log("Успешный логин:", data);

			if (data?.success) {
				setUser(data.data);

				const profileData = await getMyProfile(data.data.id);
				setProfile(profileData);

				navigate("/chat");
			} else {
				setError(data?.message || "Не удалось войти");
			}
		} catch (error: any) {
			console.log(error);
			setError(error.response?.data?.message);
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
					Sign In
				</h2>
				<AuthInput id="Email" label="Email" type="text" value={email} onChange={makeChangeHandler(setEmail)} />
				<AuthInput
					id="Password"
					label="Password"
					type="password"
					value={password}
					onChange={makeChangeHandler(setPassword)}
				/>
				{error && <div className=" text-red-800 mt-[-10px] text-[14px]">{error}</div>}
				<button
					type="submit"
					disabled={loading}
					className="bg-[#1E4FE0] h-[52px] hover:cursor-pointer rounded-[3px] mt-[-7px] hover:bg-[#1f43ad] text-[16px] font-bold"
				>
					{loading ? "Loading..." : "Sign In"}
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
					<img src={googleicon} className="w-[30px] h-[30px]" />
					Sign In with Google
				</button>
			</div>
		</div>
	);
}
