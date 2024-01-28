import type { Plugin } from "windicss/types/interfaces";
import { defineConfig } from "windicss/helpers";
import typography from "windicss/plugin/typography";
import aspectRatio from "windicss/plugin/aspect-ratio";

const plugins: Plugin[] = [typography as Plugin, aspectRatio as Plugin];

export default defineConfig({
  darkMode: "class",
  plugins: plugins,
  extract: {
    include: ["**/*.{jsx,tsx,css}"],
    exclude: ["node_modules", ".git", ".next"],
  },
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: "#58C9B9",
          100: "#9DC8C8",
          200: "#519D9E",
          300: "#0b0",
        },
        purple: {
          DEFAULT: "#D1B6E1",
        },
        navy: {
          "100": "#7F9ADB",
          "200": "#6E86BE",
          "300": "#5E72A2",
          "400": "#4E5F86",
          "500": "#3D4B6A",
          "600": "#2D384E",
          "700": "#1D2432",
        },
        error: {
          DEFAULT: "#D82B2B",
        },
        success: {
          DEFAULT: "#2AD171",
        },
        information: {
          DEFAULT: "#1B86F1",
        },
        warning: {
          DEFAULT: "#F1C21B",
          "01": "#F1C21B",
          "02": "#D77843",
        },
        "@focus": {
          DEFAULT: "#81BFEF",
        },
      },
      screens: {
        "2xl": "1536px",
        xl: "1280px",
        lg: "1024px",
        md: "768px",
        sm: "640px",
        xs: "576px",
        "2xs": "375px",
        "3xs": "320px",
      },
    },
  },
});
