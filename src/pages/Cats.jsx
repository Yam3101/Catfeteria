import React, { useState, useEffect } from "react";
import { FaCat, FaSearch } from "react-icons/fa";
import CatCard from "../components/CatCard";
import catsData from "../data/cats.json";

const Cats = () => {
	const [cats, setCats] = useState(catsData);
	const [activeCategory, setActiveCategory] = useState("All Cats");
	const [searchTerm, setSearchTerm] = useState("");

	const categories = ["All Cats", "My Cats", "Available", "Rare Breeds"];

	useEffect(() => {
		// Apply filtering logic when category or search term changes
		let filteredCats = [...catsData];

		// Filter by category
		if (activeCategory !== "All Cats") {
			// This is just placeholder logic - in a real app, cats would have category properties
			if (activeCategory === "Rare Breeds") {
				filteredCats = filteredCats.filter((cat) => cat.rating >= 4.7);
			} else if (activeCategory === "My Cats") {
				// In a real app, this would filter to show only owned cats
				filteredCats = filteredCats.filter((cat) => cat.level > 3);
			}
		}

		// Filter by search term
		if (searchTerm.trim() !== "") {
			const term = searchTerm.toLowerCase();
			filteredCats = filteredCats.filter(
				(cat) =>
					cat.name.toLowerCase().includes(term) ||
					cat.breed.toLowerCase().includes(term) ||
					cat.personality.toLowerCase().includes(term)
			);
		}

		setCats(filteredCats);
	}, [activeCategory, searchTerm]);

	return (
		<div className="min-h-screen bg-primary">
			<div className="container mx-auto py-10 px-4">
				<div className="text-center">
					<div className="flex justify-center">
						<img src="./catbox.svg" alt="Cat Box" className="mx-auto" />
					</div>
					<h1 className="text-4xl md:text-5xl font-bold text-light mb-4">
						Cat Adoption
					</h1>
					<p className="text-xl text-neutral max-w-2xl mx-auto mb-8">
						Adopt and collect unique cats with different personalities and
						traits!
					</p>
				</div>

				{/* Search Bar */}
				<div className="max-w-md mx-auto mb-8">
					<div className="relative">
						<input
							type="text"
							placeholder="Search cats by name, breed or personality..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full py-2 px-4 pl-10 rounded-lg bg-white text-primary focus:outline-none focus:ring-2 focus:ring-accent"
						/>
						<FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
					</div>
				</div>

				{/* Categories */}
				<div className="flex flex-wrap justify-center gap-3 mb-8">
					{categories.map((category) => (
						<button
							key={category}
							type="button"
							onClick={() => setActiveCategory(category)}
							className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
								activeCategory === category
									? "bg-accent text-primary font-bold"
									: "bg-secondary text-light hover:bg-accent hover:text-primary"
							}`}
						>
							{category}
						</button>
					))}
				</div>

				{/* Cats grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
					{cats.length > 0 ? (
						cats.map((cat) => <CatCard key={cat.id} cat={cat} />)
					) : (
						<div className="col-span-full text-center py-10">
							<p className="text-light text-xl">
								No cats found matching your criteria.
							</p>
							<button
								type="button"
								onClick={() => {
									setActiveCategory("All Cats");
									setSearchTerm("");
								}}
								className="mt-4 bg-accent hover:bg-secondary text-primary font-bold py-2 px-4 rounded-lg transition-colors duration-300"
							>
								Show All Cats
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Cats;
