import eslint from "@eslint/js";
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from "globals";
import { defineConfig } from "eslint/config";

// eslint-disable-next-line unicorn/no-top-level-side-effects
export default defineConfig([
	{
		files: ["**/*.js"],
		ignores: [
			".tap/**",
		],
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
			globals: {
				...globals.node
			}
		}
	},
	eslint.configs.recommended,
	eslintPluginUnicorn.configs.recommended,
	{
		rules: {
			"unicorn/name-replacements": [
				"error",
				{
					"allowList": {
						"args": true,
						"func": true
					}
				}
			],
			"unicorn/no-asterisk-prefix-in-documentation-comments": 'off',
		}
	}
])
