import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

export default function ChatAI() {
	const [refreshChats, setRefreshChats] = React.useState(0);

	return (
		<div className="flex lg:flex h-[100vh] w-full">
			<Sidebar refreshChats={refreshChats} />
			<Chat onChatCreated={() => setRefreshChats((prev) => prev + 1)} />
		</div>
	);
}
