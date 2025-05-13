import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Shop from "./pages/Shop";
import Cats from "./pages/Cats";

function App() {
	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="flex-grow">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/games" element={<Games />} />
					<Route path="/shop" element={<Shop />} />
					<Route path="/cats" element={<Cats />} />
					{/* Other routes will be added later */}
					<Route path="*" element={<Home />} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
}

export default App;
