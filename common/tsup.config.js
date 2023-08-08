// eslint-disable-next-line node/no-unsupported-features/es-syntax
import { defineConfig } from "tsup";

module.exports = defineConfig({
  entry: ["src/index.ts"],
  sourcemap: true,
  dts: true,
  outDir: "./dist",
});