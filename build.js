import { existsSync } from "fs"
import { copyFile, readFile, rename, rm, writeFile } from "fs/promises"
import { glob } from "glob"
import { basename, dirname } from "path"
import { $ } from "zx"

/** @type {{ exports: { [path: string]: { [condition: string]: string } } }} */
const packageJson = JSON.parse(await readFile("package.json", { encoding: "utf-8" }))
packageJson.exports = {}

await rm("dist", { recursive: true, force: true })
await $`npm run tsup`

const entries = (await glob("dist/**/index.js"))
  .map(f => ({
    dir: dirname(f),
    js: f,
    jsx: f.replace(".js", ".jsx"),
    dts: f.replace(".js", ".d.ts"),
    svr: f.replace("/index.js", "/server.js"),
  }))

for (const { dir, js, jsx, dts, svr } of entries) {
  const exportName = dir.replace("dist/", "./")
  const exportObj = (packageJson.exports[exportName] = {})

  if (existsSync(jsx)) {
    // const jsxTarget = `./${dirname(dir)}/${basename(dir)}.jsx`
    // await rename(jsx, jsxTarget)
    // exportObj.solid = jsxTarget
  }

  if (existsSync(dts)) {
    const dtsTarget = `./${dirname(dir)}/${basename(dir)}.d.ts`
    await rename(dts, dtsTarget)
    exportObj.import ??= {}
    exportObj.import.types = dtsTarget

    // reeeeee
    const content = (await readFile(dtsTarget, { encoding: "utf-8" }))
      .replace(/^(import .+ from ['"])(.*)\/index.js/gm, "$1$2")
      .replace(/^(import .+ from ['"])(\.\.\/)/gm, "$1./")
      .replace(/^(import .+ from ['"])(\.\/\.\.\/)/gm, "$1../")
    await writeFile(dtsTarget, content)
  }

  if (existsSync(svr)) {
    const svrTarget = `./${dirname(dir)}/${basename(dir)}.server.js`
    await rename(svr, svrTarget)
    exportObj.import ??= {}
    exportObj.import.node = svrTarget

    // reeeeee
    const content = (await readFile(svrTarget, { encoding: "utf-8" }))
      .replace(/^(import .+ from ['"])(\..+)(['"])/gm, "$1$2.server.js$3")
    await writeFile(svrTarget, content)
  }

  if (existsSync(js)) {
    const jsTarget = `./${dirname(dir)}/${basename(dir)}.js`
    await rename(js, jsTarget)
    exportObj.import ??= {}
    exportObj.import.default = jsTarget

    // reeeeee
    const content = (await readFile(jsTarget, { encoding: "utf-8" }))
      .replace(/^(import .+ from ['"])(\..+)(['"])/gm, "$1$2.js$3")
    await writeFile(jsTarget, content)
  }

  await rm(dir, { recursive: true, force: true })

  const cssTarget = `${dir}.css`
  const cssSource = cssTarget.replace("dist/", "src/")
  if (existsSync(cssSource)) {
    try {
      await copyFile(cssSource, cssTarget)
    } catch {
      // ignore
    }
  }
}

await writeFile("package.json", `${JSON.stringify(packageJson, undefined, "  ")}\n`, { encoding: "utf-8" })
