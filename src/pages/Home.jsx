import React from "react";
import { Link } from "react-router-dom";
import { FaCat, FaGamepad, FaShoppingBag, FaStore } from "react-icons/fa";

const Home = () => {
	return (
		<div className="min-h-screen bg-primary">
			<div className="container mx-auto py-10 px-4">
				{/* Hero Section */}
				<div className="flex flex-col items-center justify-center text-center my-12">
					<h1 className="text-4xl md:text-6xl font-bold text-light mb-4">
						Welcome to <span className="text-accent">Catfeteria</span>
					</h1>
					<p className="text-xl text-neutral max-w-2xl mb-8">
						Your one-stop destination for all things cats! Play games, shop for
						cat accessories, and adopt virtual cats in our immersive cat-themed
						world.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 mt-4">
						<Link
							to="/games"
							className="bg-accent text-black font-bold py-3 px-6 rounded-md flex items-center transition-colors duration-300"
						>
							<FaGamepad className="mr-2" /> Play Games
						</Link>
						<Link
							to="/shop"
							className="bg-neutral hover:bg-light text-primary font-bold py-3 px-6 rounded-md flex items-center transition-colors duration-300"
						>
							<FaShoppingBag className="mr-2" /> Shop
						</Link>
						<Link
							to="/cats"
							className="bg-secondary hover:bg-accent text-light font-bold py-3 px-6 rounded-md flex items-center transition-colors duration-300"
						>
							<FaCat className="mr-2" /> Adopt Cats
						</Link>
					</div>
				</div>

				{/* Features Section */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
					<div className="bg-secondary p-6 rounded-lg text-light">
						<FaGamepad className="text-4xl mb-4" />
						<h2 className="text-2xl font-bold mb-2">Mini Games</h2>
						<p>
							Enjoy a variety of cat-themed mini games to earn coins and
							rewards!
						</p>
					</div>
					<div className="bg-accent p-6 rounded-lg text-primary">
						<FaShoppingBag className="text-4xl mb-4" />
						<h2 className="text-2xl font-bold mb-2">Shop Items</h2>
						<p>
							Get toys, food, and accessories for your virtual cats in our shop.
						</p>
					</div>
					<div className="bg-neutral p-6 rounded-lg text-primary">
						<FaStore className="text-4xl mb-4" />
						<h2 className="text-2xl font-bold mb-2">Cat Store</h2>
						<p>
							Adopt and collect unique cats with different personalities and
							traits!
						</p>
					</div>
				</div>

				{/* CTA Section */}
				<div className="bg-light text-primary p-8 rounded-lg text-center my-12">
					<h2 className="text-3xl font-bold mb-4">
						Ready to Start Your Cat Adventure?
					</h2>
					<p className="mb-6 max-w-2xl mx-auto">
						Join our community of cat lovers and start your journey in the
						Catfeteria universe!
					</p>
					<Link
						to="/register"
						className="bg-secondary text-light font-bold py-3 px-6 rounded-md inline-block transition-colors duration-300"
					>
						Get Started Now
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Home;
