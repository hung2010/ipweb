import fs from "fs"
import path from "path"

const possiblePaths = [
  "node_modules/pdfjs-dist/build/pdf.worker.min.mjs",
  "node_modules/pdfjs-dist/legacy/build/pdf.worker.min.mjs",
]

const targetDir = "public"
const targetFile = path.join(targetDir, "pdf.worker.min.mjs")

const sourceFile = possiblePaths.find((p) => fs.existsSync(p))

if (!sourceFile) {
  console.error("Không tìm thấy pdf.worker.min.mjs")
  process.exit(1)
}

if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir)

fs.copyFileSync(sourceFile, targetFile)

console.log(`Copied ${sourceFile} -> ${targetFile}`)