import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "next/typescript"),
	{
		env: {
			browser: true,
			es2021: true,
			node: true,
		},
		extends: ["standard-with-typescript", "plugin:react/recommended"],
		parserOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			project: "./tsconfig.json",
		},
		plugins: ["react"],
		rules: {
			"react/prop-types": "off",
			"react/react-in-jsx-scope": "off",
			"@typescript-eslint/no-floating-promises": "off",
			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/no-misused-promises": "off",
			avoidEscape: true,
			allowTemplateLiterals: true,
		},
	},
];

export default eslintConfig;
