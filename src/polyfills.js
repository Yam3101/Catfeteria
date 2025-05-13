// Set up Node.js polyfills for browser environment
import { Buffer } from "buffer";
import process from "process";

// Make Buffer available globally
window.Buffer = Buffer;

// Set up process for environment variables
window.process = process;

// Fix missing globals
window.global = window;
