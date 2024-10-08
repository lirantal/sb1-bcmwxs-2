module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
           // Add custom utilities here
           typography: {
            DEFAULT: {
              css: {
                'code': {
                  'white-space': 'pre-wrap',
                  'word-break': 'break-word',
                },
              },
            },
          },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}