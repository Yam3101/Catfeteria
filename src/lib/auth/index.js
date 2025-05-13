import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { db } from "../db";
import { users, userCats, cats } from "../db/schema";
import { eq, and } from "drizzle-orm";
import { nickCat } from "../db/seed";

// Secret key for JWT (in production, use an environment variable)
const JWT_SECRET = process.env.JWT_SECRET || "catfeteria-secret-key";

// Helper function to assign a random common cat to a new user
async function assignRandomCommonCat(userId) {
	try {
		// Get all common cats
		const commonCats = await db
			.select()
			.from(cats)
			.where(eq(cats.rarity, "common"));

		if (commonCats.length === 0) {
			console.error("No common cats found in the database");
			return null;
		}

		// Select a random cat
		const randomCat = commonCats[Math.floor(Math.random() * commonCats.length)];

		// Add to user's inventory
		const userCatId = uuidv4();
		await db.insert(userCats).values({
			id: userCatId,
			userId,
			catId: randomCat.id,
			level: 1,
			experience: 0,
		});

		return { ...randomCat, userCatId };
	} catch (error) {
		console.error("Error assigning random cat:", error);
		return null;
	}
}

// Check if the user is Mei and should get Nick
async function assignNickIfMei(userId, username, email) {
	// Check if the user is Mei
	if (email === "karnovenmad@gmail.com" && username === "Mei") {
		try {
			// First check if Nick exists in the cats table
			const existingNick = await db
				.select()
				.from(cats)
				.where(eq(cats.id, nickCat.id));

			// If Nick doesn't exist, insert him
			if (existingNick.length === 0) {
				await db.insert(cats).values(nickCat);
			}

			// Check if Mei already has Nick
			const existingUserNick = await db
				.select()
				.from(userCats)
				.where(
					and(eq(userCats.userId, userId), eq(userCats.catId, nickCat.id)),
				);

			// If Mei doesn't have Nick yet, assign him
			if (existingUserNick.length === 0) {
				const userCatId = uuidv4();
				await db.insert(userCats).values({
					id: userCatId,
					userId,
					catId: nickCat.id,
					level: 10, // Nick starts at level 10
					experience: 0,
				});

				return { ...nickCat, userCatId };
			}
		} catch (error) {
			console.error("Error assigning Nick to Mei:", error);
		}
	}
	return null;
}

// Registration service
export async function registerUser(userData) {
	try {
		const { username, email, password, profilePicture } = userData;

		// Check if username already exists
		const existingUsername = await db
			.select()
			.from(users)
			.where(eq(users.username, username));

		if (existingUsername.length > 0) {
			return { success: false, error: "Username already taken" };
		}

		// Check if email already exists
		const existingEmail = await db
			.select()
			.from(users)
			.where(eq(users.email, email));

		if (existingEmail.length > 0) {
			return { success: false, error: "Email already registered" };
		}

		// Check for Mei's exclusive username
		if (username === "Mei" && email !== "karnovenmad@gmail.com") {
			return { success: false, error: "This username is reserved" };
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create user
		const userId = uuidv4();
		await db.insert(users).values({
			id: userId,
			username,
			email,
			password: hashedPassword,
			profilePicture: profilePicture || null,
			paws: 100, // Starting amount
			createdAt: Date.now(),
		});

		// Assign a random common cat to the user
		const randomCat = await assignRandomCommonCat(userId);

		// If the user is Mei, also assign Nick
		const specialCat = await assignNickIfMei(userId, username, email);

		// Generate JWT token
		const token = jwt.sign({ id: userId, username, email }, JWT_SECRET, {
			expiresIn: "7d",
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
		console.error("Registration error:", error);
		return { success: false, error: "Registration failed" };
	}
}

// Login service
export async function loginUser(credentials) {
	try {
		const { emailOrUsername, password } = credentials;

		// Find user by email or username
		const foundUsers = await db
			.select()
			.from(users)
			.where(
				emailOrUsername.includes("@")
					? eq(users.email, emailOrUsername)
					: eq(users.username, emailOrUsername),
			);

		if (foundUsers.length === 0) {
			return { success: false, error: "User not found" };
		}

		const user = foundUsers[0];

		// Verify password
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return { success: false, error: "Invalid password" };
		}

		// Generate JWT token
		const token = jwt.sign(
			{ id: user.id, username: user.username, email: user.email },
			JWT_SECRET,
			{ expiresIn: "7d" },
		);

		// Get user's cats
		const userCatsWithDetails = await getUserCats(user.id);

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
			cats: userCatsWithDetails,
		};
	} catch (error) {
		console.error("Login error:", error);
		return { success: false, error: "Login failed" };
	}
}

// Get a user's profile data
export async function getUserProfile(userId) {
	try {
		const userData = await db.select().from(users).where(eq(users.id, userId));

		if (userData.length === 0) {
			return { success: false, error: "User not found" };
		}

		const user = userData[0];

		// Get user's cats
		const userCatsWithDetails = await getUserCats(userId);

		// Calculate stats
		const stats = {
			totalCats: userCatsWithDetails.length,
			commonCats: userCatsWithDetails.filter((cat) => cat.rarity === "common")
				.length,
			rareCats: userCatsWithDetails.filter((cat) => cat.rarity === "rare")
				.length,
			epicCats: userCatsWithDetails.filter((cat) => cat.rarity === "epic")
				.length,
			legendaryCats: userCatsWithDetails.filter(
				(cat) => cat.rarity === "legendary",
			).length,
			exclusiveCats: userCatsWithDetails.filter(
				(cat) => cat.rarity === "exclusive",
			).length,
			totalLevels: userCatsWithDetails.reduce((sum, cat) => sum + cat.level, 0),
			highestLevel: Math.max(...userCatsWithDetails.map((cat) => cat.level), 0),
		};

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
			cats: userCatsWithDetails,
			stats,
		};
	} catch (error) {
		console.error("Error fetching user profile:", error);
		return { success: false, error: "Failed to get user profile" };
	}
}

// Get user's cats with full details
async function getUserCats(userId) {
	try {
		const result = await db
			.select({
				userCatId: userCats.id,
				userId: userCats.userId,
				catId: userCats.catId,
				level: userCats.level,
				experience: userCats.experience,
				acquired: userCats.acquired,
				name: cats.name,
				breed: cats.breed,
				personality: cats.personality,
				rating: cats.rating,
				image: cats.image,
				color: cats.color,
				rarity: cats.rarity,
				isSpecial: cats.isSpecial,
				description: cats.description,
			})
			.from(userCats)
			.innerJoin(cats, eq(userCats.catId, cats.id))
			.where(eq(userCats.userId, userId));

		return result;
	} catch (error) {
		console.error("Error getting user cats:", error);
		return [];
	}
}

// Verify JWT token
export function verifyToken(token) {
	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		return { success: true, user: decoded };
	} catch (error) {
		return { success: false, error: "Invalid token" };
	}
}
