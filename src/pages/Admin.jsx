import React, { useState, useEffect, useCallback } from "react";
import { FaCat, FaUser, FaDatabase, FaLock, FaEnvelope } from "react-icons/fa";

const Admin = () => {
	const [users, setUsers] = useState([]);
	const [userCats, setUserCats] = useState([]);
	const [activeTab, setActiveTab] = useState("users");
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	// Admin credentials
	const ADMIN_EMAIL = "angelmay_810@hotmail.com";
	const ADMIN_PASSWORD = "Mapache810131!";

	// Define loadData function with useCallback to avoid dependency issues
	const loadData = useCallback(() => {
		const storedUsers = localStorage.getItem("catfeteria_users");
		const storedUserCats = localStorage.getItem("catfeteria_user_cats");

		if (storedUsers) {
			setUsers(JSON.parse(storedUsers));
		}

		if (storedUserCats) {
			setUserCats(JSON.parse(storedUserCats));
		}
	}, []);

	useEffect(() => {
		// Check if admin is already authenticated
		const adminAuth = localStorage.getItem("catfeteria_admin_auth");
		if (adminAuth === "true") {
			setIsAuthenticated(true);
			loadData();
		}
	}, [loadData]);

	useEffect(() => {
		// Only set up storage listener if authenticated
		if (isAuthenticated) {
			// Set up a listener for storage changes
			const handleStorageChange = () => loadData();
			window.addEventListener("storage", handleStorageChange);

			return () => {
				window.removeEventListener("storage", handleStorageChange);
			};
		}
	}, [isAuthenticated, loadData]);

	const handleLogin = (e) => {
		e.preventDefault();
		if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
			setIsAuthenticated(true);
			localStorage.setItem("catfeteria_admin_auth", "true");
			loadData();
			setError("");
		} else {
			setError("Invalid email or password");
		}
	};

	const handleLogout = () => {
		setIsAuthenticated(false);
		localStorage.removeItem("catfeteria_admin_auth");
		setEmail("");
		setPassword("");
	};

	const clearDatabase = () => {
		if (
			window.confirm(
				"Are you sure you want to clear all database data? This cannot be undone."
			)
		) {
			localStorage.removeItem("catfeteria_users");
			localStorage.removeItem("catfeteria_user_cats");
			setUsers([]);
			setUserCats([]);
		}
	};

	// Admin login form
	if (!isAuthenticated) {
		return (
			<div className="min-h-screen bg-primary flex items-center justify-center p-4">
				<div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
					<div className="text-center mb-6">
						<FaLock className="mx-auto text-4xl text-accent mb-2" />
						<h1 className="text-2xl font-bold text-primary">Admin Access</h1>
						<p className="text-gray-600">Please enter your credentials</p>
					</div>

					{error && (
						<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
							{error}
						</div>
					)}

					<form onSubmit={handleLogin}>
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
									className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
									placeholder="Enter your email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
						</div>

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
									type="password"
									className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
									placeholder="Enter your password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>
						</div>

						<button
							type="submit"
							className="w-full bg-accent hover:bg-primary text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
						>
							Login to Admin
						</button>
					</form>
				</div>
			</div>
		);
	}

	// Admin dashboard
	return (
		<div className="min-h-screen bg-primary p-6">
			<div className="container mx-auto">
				<div className="bg-white rounded-lg shadow-lg overflow-hidden">
					<div className="bg-secondary p-6 text-white flex justify-between items-center">
						<div>
							<h1 className="text-2xl font-bold flex items-center">
								<FaDatabase className="mr-2" /> Database Admin
							</h1>
							<p className="text-neutral mt-1">
								View and manage the localStorage database
							</p>
						</div>
						<button
							type="button"
							onClick={handleLogout}
							className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
						>
							Logout
						</button>
					</div>

					<div className="border-b border-gray-200">
						<nav className="flex">
							<button
								type="button"
								onClick={() => setActiveTab("users")}
								className={`px-4 py-3 font-medium ${
									activeTab === "users"
										? "text-primary border-b-2 border-primary"
										: "text-gray-500 hover:text-primary"
								}`}
							>
								<FaUser className="inline mr-2" /> Users ({users.length})
							</button>
							<button
								type="button"
								onClick={() => setActiveTab("cats")}
								className={`px-4 py-3 font-medium ${
									activeTab === "cats"
										? "text-primary border-b-2 border-primary"
										: "text-gray-500 hover:text-primary"
								}`}
							>
								<FaCat className="inline mr-2" /> User Cats ({userCats.length})
							</button>
						</nav>
					</div>

					<div className="p-6">
						{activeTab === "users" && (
							<div>
								<h2 className="text-xl font-bold mb-4">Users</h2>
								{users.length > 0 ? (
									<div className="overflow-x-auto">
										<table className="w-full table-auto">
											<thead>
												<tr className="bg-gray-100">
													<th className="px-4 py-2 text-left">ID</th>
													<th className="px-4 py-2 text-left">Username</th>
													<th className="px-4 py-2 text-left">Email</th>
													<th className="px-4 py-2 text-left">Paws</th>
													<th className="px-4 py-2 text-left">Created</th>
												</tr>
											</thead>
											<tbody>
												{users.map((user) => (
													<tr
														key={user.id}
														className="border-b hover:bg-gray-50"
													>
														<td className="px-4 py-2 font-mono text-xs">
															{user.id}
														</td>
														<td className="px-4 py-2">{user.username}</td>
														<td className="px-4 py-2">{user.email}</td>
														<td className="px-4 py-2">{user.paws}</td>
														<td className="px-4 py-2">
															{new Date(user.createdAt).toLocaleString()}
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								) : (
									<div className="text-center py-8 text-gray-500">
										No users found in the database
									</div>
								)}
							</div>
						)}

						{activeTab === "cats" && (
							<div>
								<h2 className="text-xl font-bold mb-4">User Cats</h2>
								{userCats.length > 0 ? (
									<div className="overflow-x-auto">
										<table className="w-full table-auto">
											<thead>
												<tr className="bg-gray-100">
													<th className="px-4 py-2 text-left">ID</th>
													<th className="px-4 py-2 text-left">User ID</th>
													<th className="px-4 py-2 text-left">Cat ID</th>
													<th className="px-4 py-2 text-left">Level</th>
													<th className="px-4 py-2 text-left">Experience</th>
													<th className="px-4 py-2 text-left">Acquired</th>
												</tr>
											</thead>
											<tbody>
												{userCats.map((cat) => (
													<tr
														key={cat.id}
														className="border-b hover:bg-gray-50"
													>
														<td className="px-4 py-2 font-mono text-xs">
															{cat.id}
														</td>
														<td className="px-4 py-2 font-mono text-xs">
															{cat.userId}
														</td>
														<td className="px-4 py-2 font-mono text-xs">
															{cat.catId}
														</td>
														<td className="px-4 py-2">{cat.level}</td>
														<td className="px-4 py-2">{cat.experience}</td>
														<td className="px-4 py-2">
															{new Date(cat.acquired).toLocaleString()}
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								) : (
									<div className="text-center py-8 text-gray-500">
										No cats found in the database
									</div>
								)}
							</div>
						)}

						<div className="mt-8 text-center">
							<button
								type="button"
								onClick={clearDatabase}
								className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
							>
								Clear Database
							</button>
							<p className="text-xs text-gray-500 mt-2">
								Warning: This will remove all users and cats from the database
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Admin;
