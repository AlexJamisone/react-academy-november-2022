/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"./public/**/*.{html}",
	],
	darkMode: 'class',
	theme: {
		fontFamily: {
			"unb": ['Unbounded', 'serif']
		},
		extend: {},
	},
	plugins: [],
}