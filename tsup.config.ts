import { copyFile, mkdir } from "fs/promises"
import { glob } from "glob"
import { defineConfig } from "tsup-preset-solid"

const entries = (await glob("src/**/*.{tsx,ts}"))
  .filter(f => !f.includes("storybook"))
  .map(f => ({
    entry: f,
    serverEntry: true,
    name: f
      .replace("src/", "")
      .replace(/\.(tsx|ts)/, ""),
    css: f
      .replace(/\.(tsx|ts)/, ".css"),
  }))

export default defineConfig(entries, {
  writePackageJson: false,
  dropConsole: true,
  tsupOptions: options => {
    return {
      ...options,
      bundle: false,
      splitting: false,
      onSuccess: async () => {
        await mkdir("dist/css", { recursive: true })
        for (const f of await glob("src/css/*.css")) {
          await copyFile(f, f.replace("src/", "dist/"))
        }
      },
    }
  },
})
