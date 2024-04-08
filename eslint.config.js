import eslint from "@eslint/js";
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from "globals";

export default [
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
	eslintPluginUnicorn.configs['flat/recommended'],
	{
		rules: {
			"unicorn/prevent-abbreviations": [
				"error",
				{
					"allowList": {
						"args": true,
						"func": true
					}
				}
			]
		}
	}
]
