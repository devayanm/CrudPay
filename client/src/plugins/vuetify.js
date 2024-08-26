import { createVuetify } from "vuetify";
import "vuetify/styles"; // Import Vuetify styles

// Create a Vuetify instance
export default createVuetify({
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        background: "#2B2A33 !important",
        colors: {
          primary: "#1976D2",
          secondary: "#424242",
          accent: "#82B1FF",
          error: "#FF5252",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FFC107",
        },
      },
      dark: {
        background: "#2B2A33", // For dark mode if needed
      },
    },
  },
});