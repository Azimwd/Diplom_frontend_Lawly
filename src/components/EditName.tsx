import { Pencil, Trash } from "lucide-react";
import { createPortal } from "react-dom";
import { deleteChat, editChatName } from "../api/chats";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

type EditNameProps = {
	chatId: number;
	top: number;
	left: number;
	onClose: () => void;
	onDelete: (id: number) => void;
	onRename: (id: number, title: string) => void;
};

export default function EditName({ chatId, top, left, onClose, onDelete }: EditNameProps) {
	const navigate = useNavigate();
	const location = useLocation();

	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState("");

	const handleDelete = async (e: any) => {
		e.stopPropagation();

		try {
			await deleteChat(chatId);

			onDelete(chatId);

			if (location.pathname === `/chat/${chatId}`) {
				navigate("/chat");
			}
		} finally {
			onClose();
		}
	};

	const handleRename = async (e: any) => {
		e.stopPropagation();

		if (!title.trim()) return;

		try {
			await editChatName(chatId, title);
		} finally {
			onClose();
		}
	};

	return createPortal(
		<div
			className="fixed z-[9999] w-40 border border-[#444] flex flex-col bg-[#1f1f1f] text-white rounded-[12px] text-[14px]"
			style={{ top, left }}
			onClick={(e) => e.stopPropagation()}
		>
			{!isEditing ? (
				<>
					<button
						onClick={() => setIsEditing(true)}
						className="w-full flex items-center text-left hover:bg-[#3F3F3F] gap-2 rounded-[10px] px-2.5 py-2"
					>
						<Pencil size={14} />
						Rename
					</button>

					<button
						className="w-full flex items-center text-left hover:bg-[#3F3F3F] gap-2 rounded-[10px] px-2.5 py-2"
						onClick={handleDelete}
					>
						<Trash size={14} color="#EF5350" />
						Delete
					</button>
				</>
			) : (
				<div className="p-2 flex flex-col gap-2">
					<input
						autoFocus
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="New name"
						className="bg-[#2a2a2a] px-2 py-1 rounded text-sm outline-none"
					/>

					<div className="flex gap-2">
						<button
							onClick={handleRename}
							className="flex-1 bg-blue-500 hover:bg-blue-600 rounded px-2 py-1 text-sm"
						>
							Save
						</button>

						<button
							onClick={() => setIsEditing(false)}
							className="flex-1 bg-gray-700 hover:bg-gray-400 rounded px-2 py-1 text-sm"
						>
							Cancel
						</button>
					</div>
				</div>
			)}
		</div>,
		document.body,
	);
}
