import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Assets under the default 4KB threshold are inlined as base64 into shared
// JS. The compact logo needs to stay a separately cacheable file (it renders
// on every route), so it's excluded by path while everything else keeps the
// default inlining behavior.
const NO_INLINE_ASSETS = ["logo-compact.webp"];

export default defineConfig({
  plugins: [react()],
  build: {
    assetsInlineLimit: (filePath) =>
      NO_INLINE_ASSETS.some((name) => filePath.endsWith(name)) ? false : undefined,
  },
});
