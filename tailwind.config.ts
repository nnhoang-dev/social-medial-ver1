import type { Config } from 'tailwindcss';

const config = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            colors: {
                'primary-500': '#877EFF',
                'secondary-500': '#FFB620',
                blue: '#0095F6',
                'logout-btn': '#FF5A5A',
                'navbar-menu': 'rgba(16, 16, 18, 0.6)',
                'dark-1': '#000000',
                'dark-2': '#121417',
                'dark-3': '#101012',
                'dark-4': '#1F1F22',
                'light-1': '#FFFFFF',
                'light-2': '#EFEFEF',
                'light-3': '#7878A3',
                'light-4': '#5C5C7B',
                'gray-1': '#697C89',
                glassmorphism: 'rgba(16, 16, 18, 0.60)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
