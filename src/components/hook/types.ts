export type Message = {
	role: "user" | "ai";
	text: string;
	type?: string;
	documents?: {
		template_name: string;
		title: string;
	}[];
	fields?: {
		key: string;
		label: string;
		hint: string;
		required: boolean;
	}[];
	documentTitle?: string;
	templateName?: string;
	fileUrl?: string;
	winRate?: number;
	lossRate?: number;
	article?: string;
	lawyers?: {
		id?: number;
		name: string;
		specialization?: string;
		rating?: number;
		price?: number;
		experience?: number;
		city?: string;
		description?: string;
	}[];
};