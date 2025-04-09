import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
        colors:{
            transparent: '#FFFFFF1C',
            micronesia: 'rgba(0, 207, 255, 0.2)',
            micronesiaOpaque: 'rgba(0, 207, 255, 1)',
            metroAlert: '#F45E5E',
            alertTransparent: 'rgba(244, 94, 94, 0.3)',
            atom: '#1F2937',
            atomTransparent: 'rgba(31, 41, 55, 0.3)',
            overlay:"rgba(0, 0, 0, 0.3)",
            inner_layer: 'rgba(0, 0, 0, 0.45)',
        },
    },


    plugins: [forms],
    purge: 'false',
    darkMode: 'class'
};
