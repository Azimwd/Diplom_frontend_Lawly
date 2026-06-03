import { type ChangeEvent } from "react";
import "../index.css";

interface AuthInputProps {
	id: string;
	label: string;
	type?: string;
	value?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function AuthInput({ id, label, type = "text", value, onChange }: AuthInputProps) {
	return (
		<span className="relative inline-block w-[320px]">
			<input
				type={type}
				id={id}
				value={value}
				onChange={onChange}
				className="peer border border-[#929292] rounded-[3px] h-[48px] w-full text-black p-[10px] focus:border-[#1E4FE0] outline-none placeholder:text-[16px] transition-colors duration-200"
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
		</span>
	);
}
