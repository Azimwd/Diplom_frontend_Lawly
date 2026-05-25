import SignInForm from "../components/SignInForm";

export default function SignIn() {
	return (
		<div className="bg-[#E5E6E6] h-screen flex items-center justify-center text-white">
			<div className="relative w-[700px] h-[815px] bg-[#FFFFFF] rounded-lg flex items-center justify-center">
				<SignInForm path="/register" />
			</div>
		</div>
	);
}
