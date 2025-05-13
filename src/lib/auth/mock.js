// Mock authentication for development
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { nickCat } from "../db/seed";

// Mock storage for users and cats
const mockUsers = [];
const mockUserCats = [];

// Secret key for JWT (in development only)
const JWT_SECRET = "catfeteria-dev-secret-key";

// Helper function to check if email/username exists
const userExists = (username, email) => {
	return mockUsers.some(
		(user) => user.username === username || user.email === email,
	);
};

// Registration service
export async function mockRegisterUser(userData) {
	try {
		const { username, email, password, profilePicture } = userData;

		// Check if username already exists
		if (mockUsers.some((user) => user.username === username)) {
			return { success: false, error: "Username already taken" };
		}

		// Check if email already exists
		if (mockUsers.some((user) => user.email === email)) {
			return { success: false, error: "Email already registered" };
		}

		// Check for Mei's exclusive username
		if (username === "Mei" && email !== "karnovenmad@gmail.com") {
			return { success: false, error: "This username is reserved" };
		}

		// Create user
		const userId = uuidv4();
		const user = {
			id: userId,
			username,
			email,
			password, // In a real app, this would be hashed
			profilePicture: profilePicture || null,
			paws: 100, // Starting amount
			createdAt: Date.now(),
		};

		mockUsers.push(user);

		// Generate JWT token
		const token = jwt.sign({ id: userId, username, email }, JWT_SECRET, {
			expiresIn: "7d",
		});

		// Check if the user is Mei and should get Nick
		let specialCat = null;
		if (email === "karnovenmad@gmail.com" && username === "Mei") {
			specialCat = { ...nickCat, userCatId: uuidv4() };
			mockUserCats.push({
				id: specialCat.userCatId,
				userId,
				catId: nickCat.id,
				level: 10,
				experience: 0,
				acquired: Date.now(),
			});
		}

		// Give user a random common cat
		const randomCat = {
			id: uuidv4(),
			name: "Luna",
			breed: "Siamese",
			personality: "Playful",
			rating: 4.8,
			level: 3,
			image: "🐱",
			color: "bg-neutral",
			rarity: "common",
			isSpecial: 0,
			description:
				"Luna is a playful Siamese cat who loves to chase after toys and nap in sunny spots.",
			userCatId: uuidv4(),
		};

		mockUserCats.push({
			id: randomCat.userCatId,
			userId,
			catId: randomCat.id,
			level: 1,
			experience: 0,
			acquired: Date.now(),
		});

		return {
			success: true,
			token,
			user: {
				id: userId,
				username,
				email,
				profilePicture: profilePicture || null,
				paws: 100,
			},
			newCat: randomCat,
			specialCat,
		};
	} catch (error) {
		console.error("Mock Registration error:", error);
		return { success: false, error: "Registration failed" };
	}
}

// Login service
export async function mockLoginUser(credentials) {
	try {
		const { emailOrUsername, password } = credentials;

		// Find user by email or username
		const user = mockUsers.find(
			(u) => u.email === emailOrUsername || u.username === emailOrUsername,
		);

		if (!user) {
			return { success: false, error: "User not found" };
		}

		// Check password (in a real app, we'd use bcrypt.compare)
		if (user.password !== password) {
			return { success: false, error: "Invalid password" };
		}

		// Generate JWT token
		const token = jwt.sign(
			{ id: user.id, username: user.username, email: user.email },
			JWT_SECRET,
			{ expiresIn: "7d" },
		);

		// Get user's cats
		const userCats = mockUserCats.filter((uc) => uc.userId === user.id);

		return {
			success: true,
			token,
			user: {
				id: user.id,
				username: user.username,
				email: user.email,
				profilePicture: user.profilePicture,
				paws: user.paws,
			},
			cats: userCats,
		};
	} catch (error) {
		console.error("Mock Login error:", error);
		return { success: false, error: "Login failed" };
	}
}

// Verify JWT token
export function mockVerifyToken(token) {
	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		return { success: true, user: decoded };
	} catch (error) {
		return { success: false, error: "Invalid token" };
	}
}

// Get user profile
export async function mockGetUserProfile(userId) {
	const user = mockUsers.find((u) => u.id === userId);

	if (!user) {
		return { success: false, error: "User not found" };
	}

	const userCats = mockUserCats.filter((uc) => uc.userId === userId);

	return {
		success: true,
		user: {
			id: user.id,
			username: user.username,
			email: user.email,
			profilePicture: user.profilePicture,
			paws: user.paws,
			createdAt: user.createdAt,
		},
		cats: userCats,
		stats: {
			totalCats: userCats.length,
			commonCats: userCats.filter((cat) => cat.rarity === "common").length,
			rareCats: userCats.filter((cat) => cat.rarity === "rare").length,
			epicCats: userCats.filter((cat) => cat.rarity === "epic").length,
			legendaryCats: userCats.filter((cat) => cat.rarity === "legendary")
				.length,
			exclusiveCats: userCats.filter((cat) => cat.rarity === "exclusive")
				.length,
			totalLevels: userCats.reduce((sum, cat) => sum + cat.level, 0),
			highestLevel: Math.max(...userCats.map((cat) => cat.level), 0),
		},
	};
}
