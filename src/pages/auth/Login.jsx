import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";
import { FaCat } from "react-icons/fa";

const Login = () => {
	return (
		<div className="min-h-screen bg-primary flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				{/* Logo */}
				<div className="flex flex-col items-center mb-8">
					<div className="bg-accent w-16 h-16 rounded-full flex items-center justify-center mb-4">
						<FaCat className="text-white text-3xl" />
					</div>
					<h1 className="text-3xl font-bold text-light">Catfeteria</h1>
					<p className="text-neutral mt-2">Login to your account</p>
				</div>

				{/* Login Form */}
				<LoginForm />

				{/* Register Link */}
				<div className="mt-6 text-center">
					<p className="text-neutral">
						Don't have an account?{" "}
						<Link
							to="/register"
							className="text-accent hover:text-light transition-colors"
						>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
