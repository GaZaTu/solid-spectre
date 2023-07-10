import { copyFile } from "fs/promises"
import { glob } from "glob"
import { $ } from "zx"

await $`npm run tsc`

const cssFiles = await glob("src/**/*.css")
for (const cssFile of cssFiles) {
  const cssFileInDist = cssFile.replace("src/", "dist/")

  await copyFile(cssFile, cssFileInDist)
}
