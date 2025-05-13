// Simple client-side authentication for development

// Storage for users and cats
const users = [];
const userCats = [];

// Special Nick cat data
const nickCat = {
	id: "nick-special",
	name: "Nick",
	breed: "Bombay",
	personality: "Mysterious",
	rating: 5.0,
	level: 10,
	image: "/nick.svg",
	color: "bg-primary",
	rarity: "exclusive",
	isSpecial: true,
	description:
		"Nick is an enigmatic black cat with golden eyes that seem to hold ancient wisdom. Legend says he chooses his owner, not the other way around.",
};

// Generate a random ID
function generateId() {
	return (
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15)
	);
}

// Registration function
export async function registerUser(userData) {
	const { username, email, password } = userData;

	// Check if username already exists
	if (users.find((u) => u.username === username)) {
		return { success: false, error: "Username already taken" };
	}

	// Check if email already exists
	if (users.find((u) => u.email === email)) {
		return { success: false, error: "Email already registered" };
	}

	// Check for Mei's exclusive username
	if (username === "Mei" && email !== "karnovenmad@gmail.com") {
		return { success: false, error: "This username is reserved" };
	}

	// Create user
	const userId = generateId();
	const newUser = {
		id: userId,
		username,
		email,
		password,
		profilePicture: null,
		paws: 100,
		createdAt: Date.now(),
	};

	users.push(newUser);

	// Create token - just base64 encode the userId for simplicity
	const token = btoa(userId);

	// Give user a random cat
	const randomCat = {
		id: generateId(),
		name: "Luna",
		breed: "Siamese",
		personality: "Playful",
		rating: 4.8,
		level: 3,
		image: "🐱",
		color: "bg-neutral",
		rarity: "common",
		isSpecial: false,
		description:
			"Luna is a playful Siamese cat who loves to chase after toys and nap in sunny spots.",
		userCatId: generateId(),
	};

	userCats.push({
		id: randomCat.userCatId,
		userId,
		catId: randomCat.id,
		level: 1,
		experience: 0,
		acquired: Date.now(),
	});

	// Check if the user is Mei and should get Nick
	let specialCat = null;
	if (email === "karnovenmad@gmail.com" && username === "Mei") {
		const userCatId = generateId();
		specialCat = { ...nickCat, userCatId };

		userCats.push({
			id: userCatId,
			userId,
			catId: nickCat.id,
			level: 10,
			experience: 0,
			acquired: Date.now(),
		});
	}

	return {
		success: true,
		token,
		user: {
			id: userId,
			username,
			email,
			profilePicture: null,
			paws: 100,
		},
		newCat: randomCat,
		specialCat,
	};
}

// Login function
export async function loginUser(credentials) {
	const { emailOrUsername, password } = credentials;

	// Find user
	const user = users.find(
		(u) => u.username === emailOrUsername || u.email === emailOrUsername,
	);

	if (!user) {
		return { success: false, error: "User not found" };
	}

	if (user.password !== password) {
		return { success: false, error: "Invalid password" };
	}

	// Create token
	const token = btoa(user.id);

	// Get user's cats
	const cats = userCats.filter((uc) => uc.userId === user.id);

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
		cats,
	};
}

// Verify token
export function verifyToken(token) {
	try {
		const userId = atob(token);
		const user = users.find((u) => u.id === userId);

		if (!user) {
			return { success: false, error: "Invalid token" };
		}

		return {
			success: true,
			user: {
				id: user.id,
				username: user.username,
				email: user.email,
			},
		};
	} catch (error) {
		return { success: false, error: "Invalid token" };
	}
}

// Get user profile
export async function getUserProfile(userId) {
	const user = users.find((u) => u.id === userId);

	if (!user) {
		return { success: false, error: "User not found" };
	}

	const cats = userCats.filter((uc) => uc.userId === userId);

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
		cats,
		stats: {
			totalCats: cats.length,
			commonCats: cats.filter((cat) => cat.rarity === "common").length,
			rareCats: cats.filter((cat) => cat.rarity === "rare").length,
			epicCats: cats.filter((cat) => cat.rarity === "epic").length,
			legendaryCats: cats.filter((cat) => cat.rarity === "legendary").length,
			exclusiveCats: cats.filter((cat) => cat.rarity === "exclusive").length,
			totalLevels: cats.reduce((sum, cat) => sum + (cat.level || 0), 0),
			highestLevel: cats.length
				? Math.max(...cats.map((cat) => cat.level || 0))
				: 0,
		},
	};
}
