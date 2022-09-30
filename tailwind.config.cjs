/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				"primary": "#05232B",
				"primary-light": "#353135",
				"secondary": "#dfe3e6",
				"secondary-dark": "#333C42",
				"accent": "#3d89a1"
			},
			fontFamily: {
				sans: ['Roboto', 'sans-serif'],
				heading: ['Roboto', 'sans-serif']
			}
		},
	},
	plugins: [],
}
