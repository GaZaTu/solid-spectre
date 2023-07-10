import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"

const INLINE = process.argv.includes("inline")

const __dirname = fileURLToPath(new URL(".", import.meta.url))

/**
 * @param {string} str
 */
const convertDashCaseToPascalCase = (str) => {
  return str.replace(/(^\w|-\w)/g, g => g.replace(/-/, "").toUpperCase())
}

const iconsDirName = "feather-icons/dist/icons"
const iconsDir = `${__dirname}/../node_modules/${iconsDirName}`

const targetDir = `${__dirname}/../src/icons`
await rm(targetDir, { recursive: true, force: true })
await mkdir(targetDir, { recursive: true })

for (const iconFile of await readdir(iconsDir)) {
  const iconImportPath = `${iconsDirName}/${iconFile}`
  const iconName = iconFile.replace(".svg", "")
  const iconJSName = `icon${convertDashCaseToPascalCase(iconName)}`
  const iconJSFileName = `${iconJSName}.ts`

  const eslintCode = "/* eslint-disable */"
  const iconCode = await (async () => {
    if (INLINE) {
      const iconFilePath = `${iconsDir}/${iconFile}`
      const iconAsString = await readFile(iconFilePath, { encoding: "utf-8" })

      return `const ${iconJSName} = \`${iconAsString}\` as string`
    } else {
      return `import ${iconJSName} from "${iconImportPath}?raw"`
    }
  })()
  const exportCode = `export default ${iconJSName}`

  const code = `${eslintCode}\n${iconCode}\n${exportCode}\n`
  await writeFile(`${targetDir}/${iconJSFileName}`, code)
}
