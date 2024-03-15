/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}'],
    theme: {
        colors: {
            'mc-red': '#E21B1B',
            'mc-gray': '#E0E0E0',
            'mc-black': 'rgb(0, 0, 0, 0.2)',
            'mc-yellow': '#ffc82c',
            'mc-orange': '#ff7849',
            'mc-green': '#13ce66',
        },
        fontFamily: {
            'open-sans': ['Open Sans', 'sans-serif'],
            oswald: ['Oswald', 'sans-serif'],
        },
        extend: {},
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/container-queries'),
    ],
};
