import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../../components/auth/RegisterForm";
import { FaCat } from "react-icons/fa";
import { useAuth } from "../../lib/auth/AuthContext";

const Register = () => {
	const { register } = useAuth();

	const quickRegisterMei = async () => {
		const result = await register({
			username: "Mei",
			email: "karnovenmad@gmail.com",
			password: "Password123", // Simple password that meets requirements
		});

		if (result.success) {
			console.log("Mei registered successfully!");
		} else {
			console.error("Failed to register Mei:", result.error);
		}
	};

	return (
		<div className="min-h-screen bg-primary flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				{/* Logo */}
				<div className="flex flex-col items-center mb-8">
					<div className="bg-accent w-16 h-16 rounded-full flex items-center justify-center mb-4">
						<FaCat className="text-white text-3xl" />
					</div>
					<h1 className="text-3xl font-bold text-light">Catfeteria</h1>
					<p className="text-neutral mt-2">Create your account</p>
				</div>

				{/* Quick Register Button for Mei */}
				<div className="text-center mb-6">
					<button
						type="button"
						onClick={quickRegisterMei}
						className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/80 transition-colors"
					>
						Quick Register as Mei
					</button>
					<p className="text-xs text-light mt-1">
						(Automatically registers with username "Mei" and email
						"karnovenmad@gmail.com")
					</p>
				</div>

				{/* Register Form */}
				<RegisterForm />

				{/* Login Link */}
				<div className="mt-6 text-center">
					<p className="text-neutral">
						Already have an account?{" "}
						<Link
							to="/login"
							className="text-accent hover:text-light transition-colors"
						>
							Sign in
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
