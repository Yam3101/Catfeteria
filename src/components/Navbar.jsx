import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
	FaCat,
	FaGamepad,
	FaShoppingBag,
	FaBars,
	FaTimes,
	FaUser,
	FaHeart,
} from "react-icons/fa";
import { useAuth } from "../lib/auth/AuthContext";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { user } = useAuth();

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const navItems = [
		{ to: "/", label: "Home", icon: <FaCat /> },
		{ to: "/games", label: "Games", icon: <FaGamepad /> },
		{ to: "/shop", label: "Shop", icon: <FaShoppingBag /> },
		{ to: "/cats", label: "Cats", icon: <FaHeart /> },
	];

	return (
		<nav className="bg-light py-4 sticky top-0 z-50 shadow-md text-primary">
			<div className="container mx-auto px-2">
				<div className="flex justify-between items-center">
					{/* Logo */}
					<Link to="/" className="flex items-center text-black">
						<FaCat className="text-2xl mr-1" />
						<span className="text-xl font-bold">Catfeteria</span>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-6">
						{navItems.map((item) => (
							<NavLink
								key={item.to}
								to={item.to}
								className={({ isActive }) =>
									`flex items-center gap-2 font-bold hover:text-accent transition-colors ${
										isActive ? "text-accent" : "text-black"
									}`
								}
							>
								{item.icon}
								<span>{item.label}</span>
							</NavLink>
						))}
					</div>

					{/* User Actions */}
					<div className="hidden md:flex items-center space-x-4">
						{user ? (
							<Link
								to="/profile"
								className="bg-secondary hover:bg-primary text-light px-4 py-2 rounded-lg transition-colors duration-300 flex items-center"
							>
								<FaUser className="mr-2 text-light" />
								Profile
							</Link>
						) : (
							<Link
								to="/login"
								className="bg-accent hover:bg-secondary text-light hover:text-light px-4 py-2 rounded-lg transition-colors duration-300 flex items-center"
							>
								<FaUser className="mr-2 text-light" />
								Login
							</Link>
						)}
					</div>

					{/* Mobile Menu Button */}
					<button
						type="button"
						className="md:hidden text-black"
						onClick={toggleMenu}
						aria-label="Toggle menu"
					>
						{isMenuOpen ? (
							<FaTimes className="text-xl" />
						) : (
							<FaBars className="text-xl" />
						)}
					</button>
				</div>

				{/* Mobile Menu */}
				{isMenuOpen && (
					<div className="md:hidden mt-4 pb-4">
						<div className="flex flex-col space-y-3">
							{navItems.map((item) => (
								<NavLink
									key={item.to}
									to={item.to}
									className={({ isActive }) =>
										`flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-secondary transition-colors ${
											isActive ? "bg-neutral text-black" : "text-black"
										}`
									}
									onClick={() => setIsMenuOpen(false)}
								>
									{item.icon}
									<span>{item.label}</span>
								</NavLink>
							))}
							{user ? (
								<Link
									to="/profile"
									className="bg-secondary hover:bg-primary text-center text-light py-2 px-3 rounded-lg transition-colors duration-300 flex items-center"
									onClick={() => setIsMenuOpen(false)}
								>
									<FaUser className="mr-2" />
									Profile
								</Link>
							) : (
								<Link
									to="/login"
									className="bg-accent hover:bg-secondary text-center text-light py-2 px-3 rounded-lg transition-colors duration-300 flex items-center"
									onClick={() => setIsMenuOpen(false)}
								>
									<FaUser className="mr-2" />
									Login
								</Link>
							)}
						</div>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
