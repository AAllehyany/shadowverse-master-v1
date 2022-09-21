/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				"primary": "#020202",
				"secondary": "#71bf67",
				"accent": "#f8ac11"
			}
		},
	},
	plugins: [],
}
