import React from "react";
import { FaGamepad } from "react-icons/fa";

const Games = () => {
	return (
		<div className="min-h-screen bg-primary">
			<div className="container mx-auto py-10 px-4">
				<div className="text-center my-10">
					<FaGamepad className="text-6xl text-accent mx-auto mb-4" />
					<h1 className="text-4xl md:text-5xl font-bold text-light mb-4">
						Mini Games
					</h1>
					<p className="text-xl text-neutral max-w-2xl mx-auto mb-8">
						Play cat-themed mini games to earn coins and rewards for your
						virtual cats!
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
					{/* Placeholder for future game cards */}
					{[1, 2, 3, 4, 5, 6].map((game) => (
						<div
							key={game}
							className="bg-secondary p-6 rounded-lg text-light hover:bg-accent hover:text-primary transition-colors duration-300 cursor-pointer"
						>
							<div className="aspect-video bg-neutral/20 rounded-lg mb-4 flex items-center justify-center">
								<FaGamepad className="text-5xl opacity-50" />
							</div>
							<h2 className="text-2xl font-bold mb-2">Game {game}</h2>
							<p>
								Coming soon! A fun cat-themed mini game to enjoy and earn
								rewards.
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Games;
