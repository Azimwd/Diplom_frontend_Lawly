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
		<span className="relative">
			<input
				type={type}
				id={id}
				value={value}
				onChange={onChange}
				className="peer border border-[#929292] rounded-[3px] h-[48px] w-[320px] text-black p-[10px] focus:border-[#1E4FE0] outline-none placeholder:text-[16px] transition-colors duration-200 transition-3s"
				placeholder=""
			/>
			<label
				htmlFor={id}
				className="absolute text-[#888888] left-[10px] top-[13px] peer-focus:text-[#1E4FE0] transition-[color,transform,top,left] duration-200 ease-in-out label-anim pointer-events-none bg-white px-[3px]"
			>
				{label}
			</label>
		</span>
	);
}
