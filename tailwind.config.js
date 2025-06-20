const { addDynamicIconSelectors } = require('@iconify/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './resources/js/**/*.{js,jsx}',
    './resources/views/*.blade.php',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      boxShadow: {
        'offset': '0px 4px 20px -5px rgb(0 0 0 / 0.4)',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  safelist: [
    "hover:bg-red-200",
    "hover:bg-green-200",
    "hover:bg-yellow-200",
    "hover:bg-blue-200",
    "hover:bg-purple-200",
    "hover:bg-gray-200",
    "bg-red-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-blue-200",
    "bg-gray-200",
    "bg-purple-200",
    "border-red-400",
    "border-green-400",
    "border-yellow-400",
    "border-blue-400",
    "border-purple-400",
    "border-gray-400",
    "text-red-600",
    "text-green-600",
    "text-yellow-600",
    "text-blue-600",
    "text-purple-600",
    "text-gray-600",
    "icon-[mdi--chevron-right]",
    "icon-[material-symbols--search-rounded]",
    "icon-[material-symbols--article-outline]",
    "icon-[mdi--truck-outline]",
    "icon-[ic--outline-people]",
    "icon-[gravity-ui--file-dollar]",
    "icon-[mdi--cog]"
  ],
  plugins: [
    require("tailwindcss-animate"),
    addDynamicIconSelectors(),
  ],
}