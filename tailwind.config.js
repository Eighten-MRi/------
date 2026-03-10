/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#14B8A6',
                    DEFAULT: '#0D9488',
                    dark: '#0F766E',
                },
                accent: {
                    DEFAULT: '#F97316',
                    hover: '#EA580C',
                },
                background: '#F0FDFA',
                text: {
                    DEFAULT: '#134E4A',
                    muted: '#334155',
                }
            },
            fontFamily: {
                sans: ['Figtree', 'Noto Sans JP', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
