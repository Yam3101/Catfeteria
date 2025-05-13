import React from "react";
import { FaShoppingBag, FaTag, FaStar } from "react-icons/fa";

const Shop = () => {
	// Mock data for shop items
	const shopItems = [
		{
			id: 1,
			name: "Premium Cat Food",
			price: 50,
			rating: 4.5,
			category: "Food",
			image: "🍗",
		},
		{
			id: 2,
			name: "Cat Toy Mouse",
			price: 25,
			rating: 4.2,
			category: "Toys",
			image: "🐁",
		},
		{
			id: 3,
			name: "Scratching Post",
			price: 120,
			rating: 4.8,
			category: "Furniture",
			image: "🪵",
		},
		{
			id: 4,
			name: "Cozy Cat Bed",
			price: 150,
			rating: 4.7,
			category: "Furniture",
			image: "🛏️",
		},
		{
			id: 5,
			name: "Catnip Treats",
			price: 35,
			rating: 4.3,
			category: "Food",
			image: "🌿",
		},
		{
			id: 6,
			name: "Cat Collar",
			price: 20,
			rating: 4.1,
			category: "Accessories",
			image: "⭕",
		},
	];

	return (
		<div className="min-h-screen bg-primary">
			<div className="container mx-auto py-10 px-4">
				<div className="text-center my-10">
					<FaShoppingBag className="text-6xl text-accent mx-auto mb-4" />
					<h1 className="text-4xl md:text-5xl font-bold text-light mb-4">
						Cat Shop
					</h1>
					<p className="text-xl text-neutral max-w-2xl mx-auto mb-8">
						Get toys, food, and accessories for your virtual cats!
					</p>
				</div>

				{/* Categories */}
				<div className="flex flex-wrap justify-center gap-3 mb-8">
					{["All", "Food", "Toys", "Furniture", "Accessories"].map(
						(category) => (
							<button
								key={category}
								type="button"
								className="bg-secondary hover:bg-accent text-light hover:text-primary px-4 py-2 rounded-lg transition-colors duration-300"
							>
								{category}
							</button>
						)
					)}
				</div>

				{/* Shop items */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
					{shopItems.map((item) => (
						<div
							key={item.id}
							className="bg-secondary p-6 rounded-lg text-light hover:shadow-lg transition-all duration-300"
						>
							<div className="bg-neutral/20 rounded-lg mb-4 aspect-square flex items-center justify-center text-6xl">
								{item.image}
							</div>
							<div className="flex justify-between items-start mb-2">
								<h2 className="text-xl font-bold">{item.name}</h2>
								<span className="bg-accent text-primary px-2 py-1 rounded font-bold flex items-center">
									<FaTag className="mr-1" /> {item.price}
								</span>
							</div>
							<div className="flex items-center text-accent mb-4">
								<FaStar className="mr-1" />
								<span>{item.rating}</span>
								<span className="ml-2 text-neutral text-sm">
									({Math.floor(Math.random() * 100) + 10} reviews)
								</span>
							</div>
							<button
								type="button"
								className="w-full bg-accent hover:bg-light text-primary font-bold py-2 rounded-lg transition-colors duration-300"
							>
								Add to Cart
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Shop;
