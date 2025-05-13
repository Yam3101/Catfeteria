import { CatRarity } from "./schema";
import { v4 as uuidv4 } from "uuid";

// Seed data for cats
export const seedCats = [
	{
		id: uuidv4(),
		name: "Luna",
		breed: "Siamese",
		personality: "Playful",
		rating: 4.8,
		level: 3,
		image: "🐱",
		color: "bg-neutral",
		rarity: CatRarity.COMMON,
		isSpecial: 0,
		description:
			"Luna is a playful Siamese cat who loves to chase after toys and nap in sunny spots.",
	},
	{
		id: uuidv4(),
		name: "Oliver",
		breed: "Persian",
		personality: "Lazy",
		rating: 4.5,
		level: 2,
		image: "😺",
		color: "bg-accent",
		rarity: CatRarity.COMMON,
		isSpecial: 0,
		description:
			"Oliver is a Persian cat who enjoys lounging around and being pampered.",
	},
	{
		id: uuidv4(),
		name: "Milo",
		breed: "Maine Coon",
		personality: "Curious",
		rating: 4.7,
		level: 4,
		image: "😸",
		color: "bg-secondary",
		rarity: CatRarity.RARE,
		isSpecial: 0,
		description:
			"Milo is an inquisitive Maine Coon who explores every nook and cranny of the house.",
	},
	{
		id: uuidv4(),
		name: "Bella",
		breed: "Ragdoll",
		personality: "Affectionate",
		rating: 4.9,
		level: 5,
		image: "😽",
		color: "bg-light",
		rarity: CatRarity.RARE,
		isSpecial: 0,
		description:
			"Bella is a sweet Ragdoll who loves cuddles and will follow you everywhere.",
	},
	{
		id: uuidv4(),
		name: "Charlie",
		breed: "Scottish Fold",
		personality: "Quiet",
		rating: 4.4,
		level: 1,
		image: "🙀",
		color: "bg-neutral",
		rarity: CatRarity.COMMON,
		isSpecial: 0,
		description:
			"Charlie is a reserved Scottish Fold who observes everything with his big round eyes.",
	},
	{
		id: uuidv4(),
		name: "Lucy",
		breed: "Sphynx",
		personality: "Energetic",
		rating: 4.6,
		level: 3,
		image: "😼",
		color: "bg-accent",
		rarity: CatRarity.EPIC,
		isSpecial: 0,
		description:
			"Lucy is a spirited Sphynx cat who defies her hairless appearance with boundless energy.",
	},
	{
		id: uuidv4(),
		name: "Mila",
		breed: "Siamese",
		personality: "Lazy",
		rating: 4.7,
		level: 3,
		image: "/mila.svg",
		color: "bg-neutral",
		rarity: CatRarity.RARE,
		isSpecial: 0,
		description:
			"Mila is a beautiful Siamese cat who loves to lounge in the sun and watch birds through the window.",
	},
	{
		id: uuidv4(),
		name: "Mia",
		breed: "Turkish Angora",
		personality: "Playful",
		rating: 4.6,
		level: 4,
		image: "/mia.svg",
		color: "bg-accent",
		rarity: CatRarity.EPIC,
		isSpecial: 0,
		description:
			"Mia is a graceful Turkish Angora with a playful spirit and a love for interactive toys.",
	},
	{
		id: uuidv4(),
		name: "Leo",
		breed: "Bengal",
		personality: "Adventurous",
		rating: 4.8,
		level: 4,
		image: "/1.svg",
		color: "bg-secondary",
		rarity: CatRarity.LEGENDARY,
		isSpecial: 0,
		description:
			"Leo is a striking Bengal with a wild spirit, always seeking adventure and excitement.",
	},
	// Nick is not in the normal seed database - will be added separately for Mei user only
];

// Nick the special cat - not added to seedCats since it's exclusive
export const nickCat = {
	id: "nick-special",
	name: "Nick",
	breed: "Bombay",
	personality: "Mysterious",
	rating: 5.0,
	level: 10,
	image: "/nick.svg",
	color: "bg-primary",
	rarity: CatRarity.EXCLUSIVE,
	isSpecial: 1,
	description:
		"Nick is an enigmatic black cat with golden eyes that seem to hold ancient wisdom. Legend says he chooses his owner, not the other way around.",
};
