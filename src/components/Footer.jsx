import React from "react";
import { Link } from "react-router-dom";
import {
	FaCat,
	FaTwitter,
	FaInstagram,
	FaGithub,
	FaDiscord,
} from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="bg-black py-8 text-light">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* Logo and Description */}
					<div className="col-span-1 md:col-span-1">
						<Link to="/" className="flex items-center text-light mb-4">
							<FaCat className="text-2xl text-accent mr-2" />
							<span className="text-xl font-bold">Catfeteria</span>
						</Link>
						<p className="text-neutral text-sm mb-4">
							Your one-stop destination for all things cats! Play games, shop
							for cat accessories, and adopt virtual cats in our immersive
							cat-themed world.
						</p>
						<div className="flex space-x-4">
							<a
								href="https://twitter.com"
								className="text-[#efe1c0] hover:text-[#c5820e] transition-colors"
							>
								<FaTwitter />
							</a>
							<a
								href="https://instagram.com"
								className="text-[#efe1c0] hover:text-[#c5820e] transition-colors"
							>
								<FaInstagram />
							</a>
							<a
								href="https://github.com"
								className="text-[#efe1c0] hover:text-[#c5820e] transition-colors"
							>
								<FaGithub />
							</a>
							<a
								href="https://discord.com"
								className="text-[#efe1c0] hover:text-[#c5820e] transition-colors"
							>
								<FaDiscord />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-lg font-bold mb-4 text-accent">Quick Links</h3>
						<ul className="space-y-2">
							<li>
								<Link
									to="/"
									className="text-neutral hover:text-accent transition-colors"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									to="/games"
									className="text-neutral hover:text-accent transition-colors"
								>
									Games
								</Link>
							</li>
							<li>
								<Link
									to="/shop"
									className="text-neutral hover:text-accent transition-colors"
								>
									Shop
								</Link>
							</li>
							<li>
								<Link
									to="/cats"
									className="text-neutral hover:text-accent transition-colors"
								>
									Cats
								</Link>
							</li>
						</ul>
					</div>

					{/* Support */}
					<div>
						<h3 className="text-lg font-bold mb-4 text-accent">Support</h3>
						<ul className="space-y-2">
							<li>
								<Link
									to="/faq"
									className="text-neutral hover:text-accent transition-colors"
								>
									FAQ
								</Link>
							</li>
							<li>
								<Link
									to="/contact"
									className="text-neutral hover:text-accent transition-colors"
								>
									Contact Us
								</Link>
							</li>
							<li>
								<Link
									to="/privacy"
									className="text-neutral hover:text-accent transition-colors"
								>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									to="/terms"
									className="text-neutral hover:text-accent transition-colors"
								>
									Terms of Service
								</Link>
							</li>
						</ul>
					</div>
					{/* Newsletter */}
					<div>
						<h3 className="text-lg font-bold mb-4 text-accent">Subscribe</h3>
						<p className="text-neutral text-sm mb-4">
							Subscribe to our newsletter for updates and special offers.
						</p>
						<form className="flex flex-col sm:flex-row gap-2">
							<input
								type="email"
								placeholder="Your email"
								className="py-2 px-3 rounded-lg bg-light text-primary focus:outline-none focus:ring-2 focus:ring-accent"
							/>
							<button
								type="submit"
								className="bg-accent hover:bg-light text-light font-bold py-2 px-4 rounded-lg transition-colors duration-300"
							>
								Subscribe
							</button>
						</form>
					</div>
				</div>

				<div className="mt-10 pt-6 border-t border-secondary text-neutral text-sm text-center">
					<p>© {new Date().getFullYear()} Catfeteria. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
