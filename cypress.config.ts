import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: "https://next-lime-delta.vercel.app",
  },
});
