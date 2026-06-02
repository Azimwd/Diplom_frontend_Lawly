import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import "../styles/DocFrom.css";
import LawyerSlider from "./LawyerSlider";
import { translations, type Language } from "../utils/translations";
import { useUser } from "../context/UserContext";

type Message = {
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

type DialogProps = {
	messages: Message[];
	loading: boolean;
	isTyping: boolean;
	isStoped: boolean;
	onChooseDoc: (doc: { template_name: string; title: string }) => void;
	onSubmitForm: (data: Record<string, string>, templateName?: string) => void;
};

export default function Dialog({ messages, loading, isTyping, isStoped, onChooseDoc, onSubmitForm }: DialogProps) {
	const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);

	const [formData, setFormData] = useState<Record<string, string>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { profile } = useUser();
	const lang = (profile?.language as Language) || "ru";
	const t = translations[lang].Dialog;

	const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
		if (containerRef.current) {
			containerRef.current.scrollTo({
				top: containerRef.current.scrollHeight,
				behavior,
			});
		}
	};

	useEffect(() => {
		setTimeout(() => scrollToBottom("auto"), 0);
	}, []);

	useEffect(() => {
		scrollToBottom("smooth");
	}, [messages, loading]);

	const handleDownload = (fileUrl: string, fileName: string) => {
		const link = document.createElement("a");
		link.href = fileUrl;
		link.download = fileName.endsWith(".docx") ? fileName : `${fileName}.docx`;

		document.body.appendChild(link);
		link.click();
		link.remove();
	};

	return (
		<div
			className="flex flex-col items-center justify-between max-w-[100vw] w-full h-[70vh] text-white overflow-y-auto"
			ref={containerRef}
		>
			<div className="w-full max-w-[90vw] md:max-w-[55vw] flex flex-col gap-4">
				{loading ? (
					<div className="flex flex-col gap-4 w-full">
						<div
							className="skeleton-anim self-end bg-[#2a2a2a] rounded-[10px] 
							w-[200px] md:w-[400px] h-[60px]"
						/>
						<div
							className="skeleton-anim self-start bg-[#2a2a2a] rounded-[10px] 
							w-[250px] md:w-[500px] h-[100px] md:h-[200px]"
						/>
						<div
							className="skeleton-anim self-end bg-[#2a2a2a] rounded-[10px] 
							w-[200px] md:w-[400px] h-[60px]"
						/>
						<div
							className="skeleton-anim self-start bg-[#2a2a2a] rounded-[10px] 
							w-[250px] md:w-[500px] h-[150px] md:h-[300px]"
						/>
						<div
							className="skeleton-anim self-end bg-[#2a2a2a] rounded-[10px] 
							w-[270px] md:w-[400px] h-[200px] md:h-[100px]"
						/>
					</div>
				) : (
					messages.map((msg, index) => {
						if (isStoped && msg.role === "ai" && !msg.text && !isTyping) {
							return null;
						}

						if (msg.text?.includes('"type": "document_values"')) {
							return null;
						}

						return (
							<div
								key={index}
								className={`w-fit rounded-[10px] shrink-0 px-4 py-3 min-h-[3.2vh] break-words ${
									msg.role === "user"
										? "self-end bg-[#1E4FE0]"
										: "self-start bg-[#e7e7e7] dark:bg-[#212121] text-[#141414] dark:text-[#fff]"
								} ${
									msg.type === "document_fields"
										? "!max-w-[500px] w-full"
										: "max-w-[80%] md:max-w-[65%]"
								}`}
							>
								{msg.text === "Загрузка..." ? (
									<span className="animate-pulse text-[#a8a8a8]">{t.loading}</span>
								) : msg.text ? (
									<ReactMarkdown
										remarkPlugins={[remarkBreaks]}
										components={{
											p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
										}}
									>
										{msg.type?.includes("top_lawyers")
											? msg.text.split("\n")[0].trim()
											: msg.text.trim()}
									</ReactMarkdown>
								) : isTyping && msg.role === "ai" ? (
									<span className="animate-pulse text-[#a8a8a8]">{t.loading}</span>
								) : null}

								{msg.type === "documents_list" && msg.documents && (
									<div className="mt-3 flex flex-col gap-2 max-h-[300px] overflow-y-auto docForm">
										{msg.documents.map((doc, i) => (
											<button
												key={i}
												className="p-2 bg-[#d8d8d8] dark:bg-[#1e1e1e] rounded-md cursor-pointer hover:bg-[#adadad] dark:hover:bg-[#3a3a3a] text-justify mr-2"
												onClick={() => onChooseDoc(doc)}
											>
												{doc.title}
											</button>
										))}
									</div>
								)}

								{msg.type === "document_fields" && msg.fields && (
									<div className="mt-3 flex flex-col gap-3 max-h-[300px] overflow-y-auto">
										<h3 className="text-[16px] font-semibold">{msg.documentTitle}</h3>

										{isSubmitting ? (
											<div className="text-gray-400 animate-pulse">{t.docload}</div>
										) : (
											<form className="flex flex-col gap-2">
												{msg.fields.map((field, i) => (
													<input
														key={i}
														type="text"
														value={formData[field.key] || ""}
														onChange={(e) =>
															setFormData((prev) => ({
																...prev,
																[field.key]: e.target.value,
															}))
														}
														placeholder={field.hint}
														required={field.required}
														className="p-2 rounded-md bg-[#151414] outline-none"
													/>
												))}

												<button
													type="button"
													onClick={() => {
														setIsSubmitting(true);
														onSubmitForm(formData, msg.templateName);
													}}
													className="mt-2 bg-[#1E4FE0] hover:bg-[#3c6df0] p-2 rounded-md cursor-pointer"
												>
													{t.genbutton}
												</button>
											</form>
										)}
									</div>
								)}

								{(msg.type === "top_lawyers_by_article" || msg.type === "top_lawyers") &&
									msg.lawyers && <LawyerSlider lawyers={msg.lawyers} />}

								{msg.type === "article_win_chance" &&
									msg.winRate !== undefined &&
									msg.lossRate !== undefined && (
										<div className="mt-4 p-5 bg-[#d8d8d8] dark:bg-[#212121] border border-[#a3a3a3] dark:border-[#2A2A2A] rounded-[15px] w-full">
											<h3 className=" dark:text-white font-medium mb-4 text-[16px]">
												{msg.article || "Анализ судебной практики"}
											</h3>

											<div className="flex flex-col gap-4">
												<div className="w-full">
													<div className="flex justify-between text-sm mb-1">
														<span className="text-[#2f52b8] dark:text-[#3966ed]">
															{t.wc}
														</span>
														<span className="text-[#000] dark:text-white font-bold">
															{msg.winRate}%
														</span>
													</div>
													<div className="w-full bg-[#b8ddf8] dark:bg-[#2A2A2A] rounded-full h-2.5">
														<div
															className="bg-[#1E4FE0] h-2.5 rounded-full transition-all duration-1000"
															style={{ width: `${msg.winRate}%` }}
														></div>
													</div>
												</div>

												<div className="w-full">
													<div className="flex justify-between text-sm mb-1">
														<span className="text-[#fc2727] dark:text-[#f87171]">
															{t.lc}
														</span>
														<span className="text-[#000] dark:text-white font-bold">
															{msg.lossRate}%
														</span>
													</div>
													<div className="w-full bg-[#ffcece] dark:bg-[#2A2A2A] rounded-full h-2.5">
														<div
															className="bg-[#c13636] dark:bg-[#8c2828] h-2.5 rounded-full transition-all duration-1000"
															style={{ width: `${msg.lossRate}%` }}
														></div>
													</div>
												</div>
											</div>
										</div>
									)}

								{msg.type === "document_generated" && (
									<div className="mt-3 p-4  bg-[#d8d8d8] dark:bg-[#212121] rounded-lg border border-[#a3a3a3] dark:border-[#3a3a3a] flex flex-col gap-3 w-full">
										<div className="flex flex-col gap-1">
											<span className="text-[12px] text-[#141414] dark:text-gray-400 uppercase tracking-wider">
												{t.docdone}
											</span>
											<h3 className="text-[18px] font-bold text-[#171717] dark:text-white">
												{msg.documentTitle || "Документ"}
											</h3>
										</div>

										<button
											onClick={() =>
												msg.fileUrl &&
												handleDownload(msg.fileUrl, msg.documentTitle || "document")
											}
											className="flex items-center justify-center bg-[#1E4FE0] hover:bg-[#3c6df0] text-white py-2 px-4 rounded-md transition-colors font-medium cursor-pointer"
										>
											{t.dowdoc}
										</button>
									</div>
								)}
							</div>
						);
					})
				)}

				<div ref={endOfMessagesRef} />
			</div>
		</div>
	);
}
