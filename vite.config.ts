import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(async () => ({
    plugins: [react()],
    clearScreen: false,
    test: { environment: "jsdom" },
    server: {
        port: 1420,
        strictPort: true,
        watch: {
            // tell vite to ignore watching `src-tauri`
            ignored: ["**/src-tauri/**"]
        }
    }
}));
