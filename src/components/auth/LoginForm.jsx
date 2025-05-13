import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../lib/auth/AuthContext";
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";

// Validation schema
const loginSchema = z.object({
	emailOrUsername: z
		.string()
		.min(1, { message: "Email or username is required" }),
	password: z.string().min(1, { message: "Password is required" }),
});

const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false);

	const { login, loading, error } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			emailOrUsername: "",
			password: "",
		},
	});

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const onSubmit = async (data) => {
		await login(data);
	};

	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h2 className="text-2xl font-bold text-primary mb-6 text-center">
				Login to Your Account
			</h2>

			{error && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
					{error}
				</div>
			)}

			<form onSubmit={handleSubmit(onSubmit)}>
				{/* Email/Username field */}
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="emailOrUsername"
					>
						Email or Username
					</label>
					<div className="relative">
						<span className="absolute left-3 top-3 text-gray-400">
							<FaUser />
						</span>
						<input
							id="emailOrUsername"
							type="text"
							className={`w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
								errors.emailOrUsername ? "border-red-500" : "border-gray-300"
							}`}
							placeholder="Enter your email or username"
							{...register("emailOrUsername")}
						/>
					</div>
					{errors.emailOrUsername && (
						<p className="text-red-500 text-xs mt-1">
							{errors.emailOrUsername.message}
						</p>
					)}
				</div>

				{/* Password field */}
				<div className="mb-6">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="password"
					>
						Password
					</label>
					<div className="relative">
						<span className="absolute left-3 top-3 text-gray-400">
							<FaLock />
						</span>
						<input
							id="password"
							type={showPassword ? "text" : "password"}
							className={`w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
								errors.password ? "border-red-500" : "border-gray-300"
							}`}
							placeholder="Enter your password"
							{...register("password")}
						/>
						<button
							type="button"
							className="absolute right-3 top-3 text-gray-400"
							onClick={togglePasswordVisibility}
						>
							{showPassword ? <FaEyeSlash /> : <FaEye />}
						</button>
					</div>
					{errors.password && (
						<p className="text-red-500 text-xs mt-1">
							{errors.password.message}
						</p>
					)}
				</div>

				<button
					type="submit"
					className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
					disabled={loading}
				>
					{loading ? "Logging In..." : "Sign In"}
				</button>
			</form>
		</div>
	);
};

export default LoginForm;
