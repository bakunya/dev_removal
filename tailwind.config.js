/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				"first": "#bff7ee",
				"second": "#6c92b5",
				"third": "#395486",
				"fourth": "#5aab2b"
			}
		},
	},
	plugins: [],
}

