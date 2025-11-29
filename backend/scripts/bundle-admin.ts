import path from "path"
import fs from "fs/promises"
import { existsSync } from "fs"
import { bundle } from "@adminjs/bundler"
import { ComponentLoader } from "adminjs"

// Recreate the loader setup inline so the bundler picks up upload components.
const componentLoader = new ComponentLoader()

const resolveUploadComponentsDir = () => {
  const projectRoot = process.cwd()
  const local = path.join(projectRoot, "src", "admin", "components")
  if (existsSync(local)) return local

  const pkg = path.join(
    projectRoot,
    "node_modules",
    "@adminjs",
    "upload",
    "build",
    "features",
    "upload-file",
    "components",
  )
  if (existsSync(pkg)) return pkg

  throw new Error("Cannot resolve @adminjs/upload components directory for bundling")
}

const uploadDir = resolveUploadComponentsDir()

componentLoader.add("UploadEditComponent", path.join(uploadDir, "UploadEditComponent.js"))
componentLoader.add("UploadListComponent", path.join(uploadDir, "UploadListComponent.js"))
componentLoader.add("UploadShowComponent", path.join(uploadDir, "UploadShowComponent.js"))

const destinationDir = path.join("public", "admin")

await fs.mkdir(path.join(process.cwd(), destinationDir), { recursive: true })

await bundle({
  adminJsOptions: {
    rootPath: "/admin",
    componentLoader,
  },
  destinationDir,
})

console.log(`AdminJS assets bundled to ${destinationDir}`)
