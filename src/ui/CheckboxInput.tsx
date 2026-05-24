import { Check } from "lucide-react";

interface CheckboxInput {
	id: string;
	label: string;
	checked?: boolean;
	onChange: (checked: boolean) => void;
}

export default function CheckboxInput({ id, label, checked, onChange }: CheckboxInput) {
	return (
		<div className="flex justify-start gap-[10px] items-center">
			<div
				className={`w-4 h-4 rounded-sm border border-gray-400 flex items-center justify-center transition duration-150 ${
					checked ? "bg-[#1E4FE0] border-[#1E4FE0]" : "bg-white"
				} cursor-pointer`}
				onClick={() => onChange(!checked)}
				aria-checked={checked}
				role="checkbox"
			>
				{checked && <Check size={12} className="text-white" />}
			</div>
			<label htmlFor={id} className="text-[#000000] text-[12px]  select-none" onClick={() => onChange(!checked)}>
				{label}
			</label>
			<input
				type="checkbox"
				id={id}
				checked={checked}
				onChange={(e) => onChange(e.target.checked)}
				className="sr-only"
			/>
		</div>
	);
}
