import { useState, type ChangeEvent } from "react";
import { Eye, EyeClosed } from "lucide-react";
import "../index.css";

interface AuthInputProps {
	id: string;
	label: string;
	type?: string;
	value?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function AuthInput({ id, label, type = "text", value, onChange }: AuthInputProps) {
	const [showPassword, setShowPassword] = useState(false);
	const isPasswordType = type === "password";

	const inputType = isPasswordType ? (showPassword ? "text" : "password") : type;

	return (
		<span className="relative inline-block w-[320px] text-left">
			<input
				type={inputType}
				id={id}
				value={value}
				onChange={onChange}
				className={`peer border border-[#929292] rounded-[3px] h-[48px] w-full text-black py-[10px] pl-[10px] ${
					isPasswordType ? "pr-[40px]" : "pr-[10px]"
				} focus:border-[#1E4FE0] outline-none placeholder:text-[16px] transition-colors duration-200`}
				placeholder=" "
			/>
			<label
				htmlFor={id}
				className="absolute text-[#888888] left-[10px] pointer-events-none bg-white px-[3px] transition-all duration-200 ease-in-out
				
				top-[13px] text-[16px]
				
				peer-focus:top-[-8px] peer-focus:text-[12px] peer-focus:text-[#1E4FE0]
				
				peer-[:not(:placeholder-shown)]:top-[-8px] peer-[:not(:placeholder-shown)]:text-[12px]"
			>
				{label}
			</label>

			{isPasswordType && (
				<button
					type="button"
					onClick={() => setShowPassword(!showPassword)}
					className="absolute right-[12px] top-[14px] text-[#888888] hover:text-[#1E4FE0] transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
				>
					{showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
				</button>
			)}
		</span>
	);
}
