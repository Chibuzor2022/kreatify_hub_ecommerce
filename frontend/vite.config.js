import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// import tailwindcss from '@tailwindcss/vite';

// // https://vite.dev/config/
// export default defineConfig({
// 	plugins: [react(), tailwindcss(),
// 	],
// 	server: {
// 		proxy: {
// 			"/api": "http://localhost:5000", // forward requests to backend
// 		},
// 	},
//  build: {
//     outDir: '../dist', // Temporary build directory
//     emptyOutDir: true
//   }
// });

export default defineConfig({
  plugins: [react()],
});

