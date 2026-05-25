import SignUpForm from "../components/SignUpForm";

export default function SignUp() {
	return (
		<div>
			<div className="bg-[#E5E6E6] min-h-screen flex items-center justify-center text-white overflow-y-hidden">
				<div className="relative w-[700px] h-[815px] bg-[#FFFFFF] rounded-lg flex items-center justify-center">
					<SignUpForm path="/login" />
				</div>
			</div>
		</div>
	);
}
