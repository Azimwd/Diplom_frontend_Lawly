import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home/Home";
import ChatAI from "./pages/ChatAI";
import Subscription from "./pages/Subscription";
import SubscriptionConfirmed from "./pages/SubscriptionConfirmed";
import SubscriptionFailed from "./pages/SubscriptionFailed";

import ChatWindow from "./test/ChatWindow";
import "./App.css";
import { UserProvider } from "./context/UserContext";

function App() {
	return (
		<UserProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<SignIn />} />
					<Route path="/register" element={<SignUp />} />
					<Route path="/chat/:id?" element={<ChatAI />} />
					<Route path="/test" element={<ChatWindow />} />
					<Route path="/subscription" element={<Subscription />} />
					<Route path="/payment/success" element={<SubscriptionConfirmed />} />
					<Route path="/payment/fail" element={<SubscriptionFailed />} />
				</Routes>
			</BrowserRouter>
		</UserProvider>
	);
}

export default App;
