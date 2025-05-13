import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../lib/auth/AuthContext";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import CatModal from "../modals/CatModal";

// Validation schema
const registerSchema = z
	.object({
		username: z
			.string()
			.min(3, { message: "Username must be at least 3 characters" })
			.max(20, { message: "Username cannot exceed 20 characters" })
			.regex(/^[a-zA-Z0-9_]+$/, {
				message: "Username can only contain letters, numbers, and underscores",
			}),
		email: z.string().email({ message: "Please enter a valid email address" }),
		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters" })
			.regex(/[A-Z]/, {
				message: "Password must contain at least one uppercase letter",
			})
			.regex(/[a-z]/, {
				message: "Password must contain at least one lowercase letter",
			})
			.regex(/[0-9]/, { message: "Password must contain at least one number" }),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

const RegisterForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [registrationSuccess, setRegistrationSuccess] = useState(false);
	const [newCat, setNewCat] = useState(null);
	const [specialCat, setSpecialCat] = useState(null);

	const { register: registerUser, loading, error } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	const onSubmit = async (data) => {
		const userData = {
			username: data.username,
			email: data.email,
			password: data.password,
		};

		const result = await registerUser(userData);

		if (result.success) {
			setRegistrationSuccess(true);
			if (result.newCat) setNewCat(result.newCat);
			if (result.specialCat) setSpecialCat(result.specialCat);
		}
	};

	const closeModal = () => {
		if (specialCat) {
			// If there's a special cat, show it after the regular cat
			setNewCat(null);
			setSpecialCat(null);
		} else if (newCat) {
			// If there's only a regular cat, clean up after showing
			setNewCat(null);
		}
	};

	if (registrationSuccess && !newCat && !specialCat) {
		// Redirect or show success message
		return (
			<div className="bg-white p-8 rounded-lg shadow-md text-center">
				<div className="text-4xl text-accent mb-4">🎉</div>
				<h2 className="text-2xl font-bold text-primary mb-2">
					Registration Successful!
				</h2>
				<p className="text-gray-600 mb-4">
					Welcome to Catfeteria! Your account has been created.
				</p>
				<p className="text-gray-600">
					You're now logged in and ready to explore!
				</p>
			</div>
		);
	}

	return (
		<>
			{/* Registration Form */}
			<div className="bg-white p-6 rounded-lg shadow-md">
				<h2 className="text-2xl font-bold text-primary mb-6 text-center">
					Create an Account
				</h2>

				{error && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit(onSubmit)}>
					{/* Username field */}
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="username"
						>
							Username
						</label>
						<div className="relative">
							<span className="absolute left-3 top-3 text-gray-400">
								<FaUser />
							</span>
							<input
								id="username"
								type="text"
								className={`w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
									errors.username ? "border-red-500" : "border-gray-300"
								}`}
								placeholder="Enter your username"
								{...register("username")}
							/>
						</div>
						{errors.username && (
							<p className="text-red-500 text-xs mt-1">
								{errors.username.message}
							</p>
						)}
					</div>

					{/* Email field */}
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="email"
						>
							Email
						</label>
						<div className="relative">
							<span className="absolute left-3 top-3 text-gray-400">
								<FaEnvelope />
							</span>
							<input
								id="email"
								type="email"
								className={`w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
									errors.email ? "border-red-500" : "border-gray-300"
								}`}
								placeholder="Enter your email"
								{...register("email")}
							/>
						</div>
						{errors.email && (
							<p className="text-red-500 text-xs mt-1">
								{errors.email.message}
							</p>
						)}
					</div>

					{/* Password field */}
					<div className="mb-4">
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

					{/* Confirm Password field */}
					<div className="mb-6">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="confirmPassword"
						>
							Confirm Password
						</label>
						<div className="relative">
							<span className="absolute left-3 top-3 text-gray-400">
								<FaLock />
							</span>
							<input
								id="confirmPassword"
								type={showConfirmPassword ? "text" : "password"}
								className={`w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
									errors.confirmPassword ? "border-red-500" : "border-gray-300"
								}`}
								placeholder="Confirm your password"
								{...register("confirmPassword")}
							/>
							<button
								type="button"
								className="absolute right-3 top-3 text-gray-400"
								onClick={toggleConfirmPasswordVisibility}
							>
								{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
							</button>
						</div>
						{errors.confirmPassword && (
							<p className="text-red-500 text-xs mt-1">
								{errors.confirmPassword.message}
							</p>
						)}
					</div>

					<button
						type="submit"
						className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
						disabled={loading}
					>
						{loading ? "Creating Account..." : "Sign Up"}
					</button>
				</form>
			</div>

			{/* New Cat Modal */}
			{newCat && (
				<CatModal
					cat={newCat}
					onClose={closeModal}
					title="You got a new cat!"
					message="Every new user receives a cat companion to start their journey."
				/>
			)}

			{/* Special Cat Modal (Nick) */}
			{!newCat && specialCat && (
				<CatModal
					cat={specialCat}
					onClose={closeModal}
					title="You found a special cat!"
					message="Nick has chosen you as his owner. He's a rare exclusive cat with mysterious powers!"
					isSpecial={true}
				/>
			)}
		</>
	);
};

export default RegisterForm;
