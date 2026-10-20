/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Archivo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      // Couleurs pilotées par les variables CSS de src/index.css (thèmes clair / sombre)
      colors: {
        bg: 'var(--bg)',
        'bg-2': 'var(--bg-2)',
        fg: 'var(--fg)',
        muted: 'var(--muted)',
        rule: 'var(--rule)',
        signal: 'var(--signal)',
        'signal-text': 'var(--signal-text)',
        ink: '#111110',
        bone: '#efebe3',
      },
      maxWidth: {
        page: '84rem',
      },
    },
  },
  plugins: [],
}
