/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				"primary": "#272232",
				"primary-light": "#353135",
				"secondary": "#dfe3e6",
				"secondary-dark": "#333C42",
				"accent": "#E6ECEC"
			},
			fontFamily: {
				sans: ['Roboto', 'sans-serif'],
				heading: ['Fira Sans', 'sans-serif'],
				'oswald': ['Oswald', 'sans-serif'],
				'merriweather': ['Merriweather', 'sans-serif']
			},
			opacity: {
				'8': '.08'
			}
		},
	},
	plugins: [],
}
