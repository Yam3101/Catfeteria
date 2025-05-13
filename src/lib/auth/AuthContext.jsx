import React, { createContext, useContext, useState, useEffect } from "react";
// Import client-side auth functions
import * as authService from "./clientAuth";

// Create auth context
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [cats, setCats] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [authReady, setAuthReady] = useState(false);

	// Initialize auth state from localStorage
	useEffect(() => {
		const initAuth = async () => {
			try {
				const token = localStorage.getItem("token");
				if (!token) {
					setAuthReady(true);
					setLoading(false);
					return;
				}

				// Verify the token
				const verifyResult = authService.verifyToken(token);
				if (!verifyResult.success) {
					localStorage.removeItem("token");
					setAuthReady(true);
					setLoading(false);
					return;
				}

				// Get user profile
				const profileResult = await authService.getUserProfile(
					verifyResult.user.id
				);
				if (profileResult.success) {
					setUser(profileResult.user);
					setCats(profileResult.cats);
				} else {
					localStorage.removeItem("token");
				}
			} catch (error) {
				console.error("Auth initialization error:", error);
				localStorage.removeItem("token");
			} finally {
				setAuthReady(true);
				setLoading(false);
			}
		};

		initAuth();
	}, []);

	// Register a new user
	const register = async (userData) => {
		setLoading(true);
		setError(null);
		try {
			const result = await authService.registerUser(userData);
			if (result.success) {
				localStorage.setItem("token", result.token);
				setUser(result.user);

				// Initialize cats array with the starting cat
				const userCats = [];
				if (result.newCat) userCats.push(result.newCat);
				if (result.specialCat) userCats.push(result.specialCat);
				setCats(userCats);

				return {
					success: true,
					newCat: result.newCat,
					specialCat: result.specialCat,
				};
			}

			setError(result.error);
			return { success: false, error: result.error };
		} catch (err) {
			const errorMessage = err.message || "Registration failed";
			setError(errorMessage);
			return { success: false, error: errorMessage };
		} finally {
			setLoading(false);
		}
	};

	// Login user
	const login = async (credentials) => {
		setLoading(true);
		setError(null);
		try {
			const result = await authService.loginUser(credentials);
			if (result.success) {
				localStorage.setItem("token", result.token);
				setUser(result.user);
				setCats(result.cats);
				return { success: true };
			}

			setError(result.error);
			return { success: false, error: result.error };
		} catch (err) {
			const errorMessage = err.message || "Login failed";
			setError(errorMessage);
			return { success: false, error: errorMessage };
		} finally {
			setLoading(false);
		}
	};

	// Logout user
	const logout = () => {
		localStorage.removeItem("token");
		setUser(null);
		setCats([]);
	};

	// Refresh user data
	const refreshUserData = async () => {
		if (!user) return;

		try {
			const result = await authService.getUserProfile(user.id);
			if (result.success) {
				setUser(result.user);
				setCats(result.cats);
			}
		} catch (error) {
			console.error("Error refreshing user data:", error);
		}
	};

	// Value object to be provided
	const value = {
		user,
		cats,
		loading,
		error,
		authReady,
		register,
		login,
		logout,
		refreshUserData,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === null) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
