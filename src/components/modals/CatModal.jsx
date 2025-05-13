import React, { useState, useEffect } from "react";
import { FaStar, FaPaw, FaTimes } from "react-icons/fa";
import { CatRarity } from "../../lib/db/schema";

// Helper function to get rarity color
const getRarityColor = (rarity) => {
	switch (rarity) {
		case CatRarity.COMMON:
			return "text-gray-500";
		case CatRarity.RARE:
			return "text-blue-500";
		case CatRarity.EPIC:
			return "text-purple-500";
		case CatRarity.LEGENDARY:
			return "text-yellow-500";
		case CatRarity.EXCLUSIVE:
			return "text-red-500";
		default:
			return "text-gray-500";
	}
};

// Helper function to get rarity text
const getRarityText = (rarity) => {
	switch (rarity) {
		case CatRarity.COMMON:
			return "Common";
		case CatRarity.RARE:
			return "Rare";
		case CatRarity.EPIC:
			return "Epic";
		case CatRarity.LEGENDARY:
			return "Legendary";
		case CatRarity.EXCLUSIVE:
			return "Exclusive";
		default:
			return "Unknown";
	}
};

const CatModal = ({ cat, onClose, title, message, isSpecial = false }) => {
	const [isVisible, setIsVisible] = useState(false);
	const [showConfetti, setShowConfetti] = useState(true);

	// Add animation delay
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 100);

		return () => clearTimeout(timer);
	}, []);

	// Remove confetti after a few seconds
	useEffect(() => {
		if (
			isSpecial ||
			cat.rarity === CatRarity.LEGENDARY ||
			cat.rarity === CatRarity.EXCLUSIVE
		) {
			const timer = setTimeout(() => {
				setShowConfetti(false);
			}, 5000);

			return () => clearTimeout(timer);
		}
	}, [isSpecial, cat.rarity]);

	// Check if image is emoji
	const isEmoji = cat.image?.length <= 2;
	const isSvg = cat.image?.endsWith(".svg");

	// Get rarity color and text
	const rarityColor = getRarityColor(cat.rarity);
	const rarityText = getRarityText(cat.rarity);

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
			{/* Confetti for special cats */}
			{showConfetti &&
				(isSpecial ||
					cat.rarity === CatRarity.LEGENDARY ||
					cat.rarity === CatRarity.EXCLUSIVE) && (
					<div className="absolute inset-0 pointer-events-none">
						{Array.from({ length: 50 }).map((_, i) => (
							<div
								key={`confetti-${i}-${Date.now()}`}
								className="absolute animate-fall"
								style={{
									top: `-${Math.random() * 20}px`,
									left: `${Math.random() * 100}%`,
									backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
									width: `${Math.random() * 10 + 5}px`,
									height: `${Math.random() * 10 + 5}px`,
									animationDuration: `${Math.random() * 3 + 2}s`,
									animationDelay: `${Math.random() * 2}s`,
								}}
							/>
						))}
					</div>
				)}

			{/* Modal Content */}
			<div
				className={`bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transition-all duration-500 transform ${
					isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
				} ${isSpecial ? "ring-4 ring-yellow-400" : ""}`}
			>
				{/* Close button */}
				<button
					type="button"
					onClick={onClose}
					className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 z-10"
					aria-label="Close"
				>
					<FaTimes size={24} />
				</button>

				{/* Title */}
				<div className="p-4 border-b">
					<h2 className="text-2xl font-bold text-primary text-center">
						{title}
					</h2>
					<p className="text-gray-600 text-center mt-1">{message}</p>
				</div>

				{/* Cat Image and Details */}
				<div className="p-6">
					{/* Cat Image */}
					<div className="flex justify-center mb-6">
						<div
							className={`w-40 h-40 rounded-full flex items-center justify-center ${cat.color}`}
						>
							{isEmoji ? (
								<span className="text-7xl">{cat.image}</span>
							) : (
								<img
									src={cat.image}
									alt={cat.name}
									className={`${
										isSvg ? "w-4/5 h-4/5" : "w-full h-full object-cover"
									} rounded-full`}
								/>
							)}
						</div>
					</div>

					{/* Cat Info */}
					<div className="text-center mb-6">
						<h3 className="text-2xl font-bold text-primary">{cat.name}</h3>
						<p className={`text-sm font-semibold ${rarityColor}`}>
							{rarityText}
						</p>
						<p className="text-gray-600 mt-1">
							{cat.breed} • {cat.personality}
						</p>
					</div>

					{/* Cat Stats */}
					<div className="bg-gray-50 p-4 rounded-lg">
						<div className="flex justify-between items-center mb-2">
							<div className="flex items-center">
								<FaStar className="text-yellow-400 mr-1" />
								<span className="font-semibold">Rating:</span>
							</div>
							<span>{cat.rating}</span>
						</div>

						<div className="flex justify-between items-center mb-2">
							<div className="flex items-center">
								<FaPaw className="text-primary mr-1" />
								<span className="font-semibold">Level:</span>
							</div>
							<span>{cat.level}</span>
						</div>

						{cat.description && (
							<div className="mt-3 text-sm text-gray-600">
								<p className="italic">{cat.description}</p>
							</div>
						)}
					</div>
				</div>

				{/* Button */}
				<div className="p-4 border-t">
					<button
						type="button"
						onClick={onClose}
						className="w-full bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
					>
						{isSpecial ? "Amazing!" : "Got it!"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default CatModal;
