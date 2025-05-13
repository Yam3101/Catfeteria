import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Shop from "./pages/Shop";
import Cats from "./pages/Cats";

// Auth components
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/Profile";
import { AuthProvider, useAuth } from "./lib/auth/AuthContext";

// Protected Route component
const ProtectedRoute = ({ children }) => {
	const { user, loading, authReady } = useAuth();

	// Show loading state while checking auth
	if (loading || !authReady) {
		return (
			<div className="flex justify-center items-center min-h-screen bg-primary">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent" />
			</div>
		);
	}

	// Redirect to login if not authenticated
	if (!user) {
		return <Navigate to="/login" replace />;
	}

	return children;
};

function AppContent() {
	const { user } = useAuth();

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="flex-grow">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/games" element={<Games />} />
					<Route path="/shop" element={<Shop />} />
					<Route path="/cats" element={<Cats />} />

					{/* Auth routes */}
					<Route
						path="/login"
						element={user ? <Navigate to="/" replace /> : <Login />}
					/>
					<Route
						path="/register"
						element={user ? <Navigate to="/" replace /> : <Register />}
					/>

					{/* Protected routes */}
					<Route
						path="/profile"
						element={
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						}
					/>

					{/* Fallback route */}
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
}

function App() {
	return (
		<AuthProvider>
			<AppContent />
		</AuthProvider>
	);
}

export default App;
