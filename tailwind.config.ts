module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}" // For Next.js App Router
  ],
  theme: {
    extend: {
      boxShadow: {
        customNegative: "0px -4px 9px 0px #0000001A",
      },
    },
  },
  plugins: [],
};