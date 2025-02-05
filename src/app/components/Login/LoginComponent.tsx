import LoginForm from "@/app/components/Login/LoginForm";
import LoginHead from "@/app/components/Login/LoginHead";

const LoginComponent = () => {
	return (
		<div className='items-center bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4'>
			<LoginHead />
			<LoginForm />
		</div>
	);
};

export default LoginComponent;
