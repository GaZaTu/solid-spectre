import { copyFile, readFile, rm, writeFile } from "fs/promises"
import { glob } from "glob"
import { $ } from "zx"

/** @type {{ exports: { [path: string]: { [condition: string]: string } } }} */
const packageJson = JSON.parse(await readFile("package.json", { encoding: "utf-8" }))
packageJson.exports = {}

await rm("dist", { recursive: true, force: true })

await $`npm run tsc`

const jsFiles = await glob("dist/**/*.{jsx,js}")
jsFiles.sort()
for (const jsFile of jsFiles) {
  if (jsFile.includes("storybook")) {
    continue
  }

  const name = jsFile.replace(/\.(jsx|js)/, "")

  packageJson.exports[name.replace("dist/", "./")] = {
    "types": `./${name}.d.ts`,
    "default": `./${jsFile}`,
  }
}

const cssFiles = await glob("src/**/*.css")
for (const cssFile of cssFiles) {
  const cssFileInDist = cssFile.replace("src/", "dist/")

  await copyFile(cssFile, cssFileInDist)
}

await writeFile("package.json", `${JSON.stringify(packageJson, undefined, "  ")}\n`, { encoding: "utf-8" })
