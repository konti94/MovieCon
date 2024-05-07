/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'mc-red': '#E21B1B',
                'mc-red-dark': '#b51616',
                'mc-gray': '#E0E0E0',
                'mc-gray-dark': 'rgb(0, 0, 0, 0.2)',
                'mc-yellow': '#ffc82c',
                'mc-orange': '#ff7849',
                'mc-green': '#13ce66',
            },
            fontFamily: {
                'open-sans': ['Open Sans', 'sans-serif'],
                oswald: ['Oswald', 'sans-serif'],
            },
            screens: {
                '3xl': '1920px',
            },
        },
    },
    plugins: [],
};
