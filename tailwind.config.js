/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // JavaScript and TypeScript files
    "./public/index.html",          // Main HTML file (if applicable)
    "./src/**/*.{html}",            // Any HTML files in the src directory
    "./src/**/*.{ejs,pug}",         // If using other templating engines
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}




