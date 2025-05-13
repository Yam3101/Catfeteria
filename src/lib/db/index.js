import * as schema from "./schema";

// Create a mock database client
const mockClient = {
	execute: async () => ({ rows: [] }),
};

// Create a mock database interface
export const db = {
	select: () => ({
		from: () => ({
			where: () => [],
		}),
	}),
	insert: () => ({
		values: () => {},
	}),
};

// Initialize database (mock implementation)
export async function initDatabase() {
	console.log("Using mock database for development");
	return true;
}

// Seed initial data (mock implementation)
export async function seedInitialData() {
	console.log("Mock seed function called");
	return true;
}
