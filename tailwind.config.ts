import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        nicolai: '#f00000',
        thomas: '#0f0000',
        anders: '#00f000',
        rasmus: '#000f00',
        kjeldsen: '#0000f0',
        lars: '#00000f',
        portalcolor: {
          DEFAULT: 'var(--portalcolor)',
          50: 'var(--portalcolor-50)',
          100: 'var(--portalcolor-100)',
          200: 'var(--portalcolor-200)',
          300: 'var(--portalcolor-300)',
          400: 'var(--portalcolor-400)',
          500: 'var(--portalcolor-500)',
          600: 'var(--portalcolor-600)',
          700: 'var(--portalcolor-700)',
          800: 'var(--portalcolor-800)',
          900: 'var(--portalcolor-900)',
        },
      }
    }
  },
  plugins: [],
}
export default config
