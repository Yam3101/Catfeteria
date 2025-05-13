import { sqliteTable, text, integer, blob } from "drizzle-orm/sqlite-core";

// Users table
export const users = sqliteTable("users", {
	id: text("id").primaryKey(),
	username: text("username").notNull().unique(),
	email: text("email").notNull().unique(),
	password: text("password").notNull(),
	profilePicture: text("profile_picture"),
	paws: integer("paws").notNull().default(100), // Starting with 100 paws
	createdAt: integer("created_at", { mode: "timestamp" })
		.notNull()
		.default(Date.now),
});

// Cat Rarity Enum
export const CatRarity = {
	COMMON: "common",
	RARE: "rare",
	EPIC: "epic",
	LEGENDARY: "legendary",
	EXCLUSIVE: "exclusive", // For Nick
};

// Cats table with all cats available in the game
export const cats = sqliteTable("cats", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	breed: text("breed").notNull(),
	personality: text("personality").notNull(),
	rating: integer("rating").notNull(),
	level: integer("level").notNull().default(1),
	image: text("image").notNull(),
	color: text("color").notNull(),
	rarity: text("rarity").notNull().default(CatRarity.COMMON),
	isSpecial: integer("is_special", { mode: "boolean" })
		.notNull()
		.default(false),
	description: text("description"),
});

// User-Cat relationship (inventory)
export const userCats = sqliteTable("user_cats", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	catId: text("cat_id")
		.notNull()
		.references(() => cats.id),
	acquired: integer("acquired", { mode: "timestamp" })
		.notNull()
		.default(Date.now),
	level: integer("level").notNull().default(1),
	experience: integer("experience").notNull().default(0),
});

// Nick special cat configuration
export const nickConfiguration = {
	id: "nick-special",
	name: "Nick",
	breed: "Bombay",
	personality: "Mysterious",
	rating: 5.0,
	level: 10,
	image: "/nick.svg",
	color: "bg-primary",
	rarity: CatRarity.EXCLUSIVE,
	isSpecial: true,
	description:
		"A rare, exclusive cat with mysterious powers. Only the chosen one can adopt him.",
	meiEmail: "karnovenmad@gmail.com",
	meiUsername: "Mei",
};
