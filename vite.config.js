import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			events: "events-browserify",
			stream: "stream-browserify",
			crypto: "crypto-browserify",
			buffer: "buffer",
		},
	},
	define: {
		// Fix "process is not defined" error
		"process.env": {},
		global: "window",
	},
	optimizeDeps: {
		include: [
			"events-browserify",
			"stream-browserify",
			"crypto-browserify",
			"buffer",
		],
	},
});
