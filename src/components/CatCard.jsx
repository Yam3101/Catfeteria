import React from "react";
import { FaStar, FaHeart } from "react-icons/fa";

const CatCard = ({ cat }) => {
	// Check if the image is an emoji (typically 1-2 characters) or a URL
	const isEmoji = cat.image?.length <= 2;
	const isSvg = cat.image?.endsWith(".svg");

	return (
		<div className="bg-black rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl flex flex-col">
			{/* Cat Image */}
			<div className="p-4 flex-grow flex items-center justify-center">
				<div className="bg-primary/5 rounded-lg aspect-square w-full flex items-center justify-center">
					{isEmoji ? (
						<span className="text-6xl">{cat.image}</span>
					) : (
						<img
							src={cat.image}
							alt={cat.name}
							className={`${
								isSvg
									? "w-4/5 h-4/5 object-contain"
									: "w-full h-full object-cover"
							} rounded-lg`}
						/>
					)}
				</div>
			</div>

			{/* Cat Info - Bottom section */}
			<div className="p-4 bg-white">
				<div className="flex justify-between items-center mb-2">
					<h2 className="text-xl font-bold text-primary">{cat.name}</h2>
					<div className="bg-primary text-white px-2 py-1 rounded text-xs font-bold">
						Lvl {cat.level}
					</div>
				</div>

				<p className="text-gray-600 text-sm mb-2">
					{cat.breed} • {cat.personality}
				</p>

				{/* Rating */}
				<div className="flex items-center text-accent mb-3">
					<FaStar className="mr-1" />
					<span className="text-primary font-medium">{cat.rating}</span>
				</div>

				{/* Action Buttons */}
				<div className="flex gap-2">
					<button
						type="button"
						className="flex-1 bg-primary hover:bg-secondary text-white font-bold py-2 rounded-md transition-colors duration-300"
					>
						Adopt
					</button>
					<button
						type="button"
						className="w-10 aspect-square bg-accent hover:bg-secondary text-primary hover:text-white flex items-center justify-center rounded-md transition-colors duration-300"
					>
						<FaHeart />
					</button>
				</div>
			</div>
		</div>
	);
};

export default CatCard;
