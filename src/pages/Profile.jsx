import React, { useState, useEffect } from "react";
import { useAuth } from "../lib/auth/AuthContext";
import { FaUser, FaPaw, FaCat, FaCrown } from "react-icons/fa";
import CatCard from "../components/CatCard";
import { CatRarity } from "../lib/db/schema";

const Profile = () => {
	const { user, cats, logout } = useAuth();
	const [activeTab, setActiveTab] = useState("profile");
	const [catProgressPercentage, setCatProgressPercentage] = useState(0);

	// Calculate cat collection progress
	useEffect(() => {
		if (cats && cats.length > 0) {
			// Simple progress calculation based on number of cats collected
			// This assumes there are about 20 total possible cats to collect
			const maxCats = 20;
			const progress = Math.min(100, Math.round((cats.length / maxCats) * 100));
			setCatProgressPercentage(progress);
		}
	}, [cats]);

	// Group cats by rarity
	const catsByRarity = {
		common: cats.filter((cat) => cat.rarity === CatRarity.COMMON),
		rare: cats.filter((cat) => cat.rarity === CatRarity.RARE),
		epic: cats.filter((cat) => cat.rarity === CatRarity.EPIC),
		legendary: cats.filter((cat) => cat.rarity === CatRarity.LEGENDARY),
		exclusive: cats.filter((cat) => cat.rarity === CatRarity.EXCLUSIVE),
	};

	if (!user) {
		return null; // Protected route should handle this, but just in case
	}

	return (
		<div className="min-h-screen bg-primary py-10 px-4">
			<div className="container mx-auto">
				<div className="bg-white rounded-lg shadow-lg overflow-hidden">
					{/* Profile Header */}
					<div className="bg-secondary text-white p-6">
						<div className="flex flex-col md:flex-row items-center gap-6">
							{/* Profile Image */}
							<div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-4xl">
								{user.profilePicture ? (
									<img
										src={user.profilePicture}
										alt={user.username}
										className="w-full h-full rounded-full object-cover"
									/>
								) : (
									<FaUser />
								)}
							</div>

							{/* User Info */}
							<div className="flex-1 text-center md:text-left">
								<h1 className="text-2xl font-bold">{user.username}</h1>
								<p className="text-neutral">{user.email}</p>
							</div>

							{/* Stats */}
							<div className="flex gap-4 flex-wrap justify-center md:justify-end">
								<div className="text-center">
									<div className="text-2xl font-bold">{cats.length}</div>
									<div className="text-sm text-neutral">Cats</div>
								</div>
								<div className="text-center">
									<div className="text-2xl font-bold flex items-center justify-center">
										{user.paws} <FaPaw className="ml-1 text-lg" />
									</div>
									<div className="text-sm text-neutral">Paws</div>
								</div>
								{catsByRarity.exclusive.length > 0 && (
									<div className="text-center">
										<div className="text-2xl font-bold flex items-center justify-center text-yellow-400">
											<FaCrown />
										</div>
										<div className="text-sm text-neutral">VIP</div>
									</div>
								)}
							</div>
						</div>

						{/* Progress Bar */}
						<div className="mt-6">
							<div className="flex justify-between text-sm mb-1">
								<span>Cat Collection Progress</span>
								<span>{catProgressPercentage}%</span>
							</div>
							<div className="h-2 bg-primary/30 rounded-full overflow-hidden">
								<div
									className="h-full bg-accent"
									style={{ width: `${catProgressPercentage}%` }}
								/>
							</div>
						</div>
					</div>

					{/* Tabs */}
					<div className="border-b">
						<div className="flex">
							<button
								type="button"
								className={`py-4 px-6 font-medium ${
									activeTab === "profile"
										? "text-primary border-b-2 border-primary"
										: "text-gray-500 hover:text-primary"
								}`}
								onClick={() => setActiveTab("profile")}
							>
								Profile
							</button>
							<button
								type="button"
								className={`py-4 px-6 font-medium ${
									activeTab === "cats"
										? "text-primary border-b-2 border-primary"
										: "text-gray-500 hover:text-primary"
								}`}
								onClick={() => setActiveTab("cats")}
							>
								My Cats ({cats.length})
							</button>
						</div>
					</div>

					{/* Tab Content */}
					<div className="p-6">
						{activeTab === "profile" ? (
							/* Profile Content */
							<div>
								<h2 className="text-xl font-bold mb-4">Account Information</h2>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
									<div>
										<div className="block text-gray-500 text-sm font-bold mb-2">
											Username
										</div>
										<div className="border border-gray-300 rounded-lg p-3 bg-gray-50">
											{user.username}
										</div>
									</div>

									<div>
										<div className="block text-gray-500 text-sm font-bold mb-2">
											Email
										</div>
										<div className="border border-gray-300 rounded-lg p-3 bg-gray-50">
											{user.email}
										</div>
									</div>
								</div>

								<h2 className="text-xl font-bold mb-4">Statistics</h2>
								<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
									<div className="bg-gray-50 p-4 rounded-lg text-center">
										<div className="text-3xl font-bold text-primary">
											{catsByRarity.common.length}
										</div>
										<div className="text-gray-500">Common Cats</div>
									</div>

									<div className="bg-gray-50 p-4 rounded-lg text-center">
										<div className="text-3xl font-bold text-blue-500">
											{catsByRarity.rare.length}
										</div>
										<div className="text-gray-500">Rare Cats</div>
									</div>

									<div className="bg-gray-50 p-4 rounded-lg text-center">
										<div className="text-3xl font-bold text-purple-500">
											{catsByRarity.epic.length}
										</div>
										<div className="text-gray-500">Epic Cats</div>
									</div>

									<div className="bg-gray-50 p-4 rounded-lg text-center">
										<div className="text-3xl font-bold text-yellow-500">
											{catsByRarity.legendary.length +
												catsByRarity.exclusive.length}
										</div>
										<div className="text-gray-500">Legendary Cats</div>
									</div>
								</div>

								{/* Logout Button */}
								<button
									type="button"
									onClick={logout}
									className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
								>
									Logout
								</button>
							</div>
						) : (
							/* Cats Content */
							<div>
								<div className="mb-6">
									<h2 className="text-xl font-bold mb-2">
										Your Cat Collection
									</h2>
									<p className="text-gray-500">
										You have collected {cats.length} cats so far. Keep exploring
										to find more!
									</p>
								</div>

								{cats.length > 0 ? (
									<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
										{cats.map((cat) => (
											<CatCard key={cat.userCatId} cat={cat} />
										))}
									</div>
								) : (
									<div className="bg-gray-50 p-8 rounded-lg text-center">
										<FaCat className="text-5xl text-gray-300 mx-auto mb-4" />
										<h3 className="text-xl font-bold text-gray-600 mb-2">
											No Cats Yet
										</h3>
										<p className="text-gray-500">
											You haven't collected any cats yet. Start your adventure
											to find some!
										</p>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
