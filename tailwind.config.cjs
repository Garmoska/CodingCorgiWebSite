/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        corgi: {
          orange: '#E67E22',
          brown: '#8B4513',
          cream: '#FFF8DC',
        },
      },
    },
  },
  plugins: [],
};
