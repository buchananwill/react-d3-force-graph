import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["test/**/*.test.ts?(x)"],
    globals: true,
    environment: "jsdom",
    setupFiles: "test/setup.ts",
    coverage: {
      provider: "istanbul",
    },
    server: {
      deps: {
        inline: [/selective-context/],
      },
    },
  },
});
