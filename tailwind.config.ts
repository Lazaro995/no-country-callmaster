import { heroui } from "@heroui/theme";

import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary1: "#005BBB",
				primary2: "#FFFFFF",
				primary3: "#1C1C1C",
				secondary1: "#A6A6A6",
				secondary2: "#A8D5BA",
				secondary3: "#D0E6FA",
				accent1: "#007BFF",
				accent2: "#FFC857",
				accent3: "#D1C4E9",
				confirm: "#00BF63",
				error: "#FF6B6B",
				warning: "#FF9F1C",
				background1: "#F7F9FC",
				background2: "#E8EEF3",
				background3: "#121212",
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
			fontFamily: {
				roboto: ["var(--font-roboto)"],
				montserrat: ["var(--font-montserrat)"],
			},
			
		},
	},
	darkMode: "class",
	plugins: [heroui()],
} satisfies Config;
