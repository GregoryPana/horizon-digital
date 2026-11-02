import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Acceptance tests belong to the application. Preserved evidence/staging trees
// are historical artifacts with their own dependency roots, not extra suites.
export default defineConfig({
  plugins: [react()],
  test: { include: ['src/**/*.test.{ts,tsx}'] },
});
