import { glob } from "glob"
import { defineConfig } from "tsup-preset-solid"

const entries = (await glob("src/**/*.{ts,tsx}"))
  .filter(f => !f.endsWith("index.tsx"))
  .map(f => ({
    entry: f,
    name: f
      .replace("src/", "")
      .replace(".tsx", "")
      .replace(".ts", ""),
    css: [],
  }))

export default defineConfig(entries, {
  writePackageJson: true,
  dropConsole: true,
  tsupOptions: options => {
    return {
      ...options,
      onSuccess: async () => {
        console.log("DONE")
      },
    }
  },
})
