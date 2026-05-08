import react from "@vitejs/plugin-react";
import glsl from "vite-plugin-glsl";
import { resolve } from "path";

export default {
  base: "./",
  resolve: {
    alias: {
      '@core': resolve(__dirname, 'packages/three-core/src')
    },
  },
  plugins: [react(), glsl()],
  server: {
    host: true,
    port: 5175,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
  },
};
