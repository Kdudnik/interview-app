import * as fs from "node:fs/promises"
import { ensureDir, copy } from "fs-extra/esm"
import * as path from "node:path"
import { fileURLToPath } from "node:url"

import * as fSizeLib from "filesize"
import sharp from "sharp"
import chalk from "chalk"

const error = chalk.red
const success = chalk.green

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const directory = path.join(__dirname, "..", "src/images/")

async function isDirectory(source) {
  return fs.lstat(source).then((stats) => stats.isDirectory())
}

async function getFiles(source) {
  const files = await fs.readdir(source)
  const result = []

  for (const file of files) {
    const filePath = path.join(source, file)
    const isDir = await isDirectory(filePath)

    if (isDir) {
      const subFiles = await getFiles(filePath)
      result.push(...subFiles)
    } else {
      result.push(filePath)
    }
  }

  return result
}

async function optimizeImage(file, destPath) {
  let localFileVar = file
  const fileExtension = path.extname(localFileVar)
  const fileDest = localFileVar.replace("src/images/", "public/")
  const fileDestDir = path.dirname(fileDest)

  if (
    fileExtension !== ".jpg" &&
    fileExtension !== ".jpeg" &&
    fileExtension !== ".png"
  ) {
    try {
      await copy(localFileVar, fileDest)
      console.log(success("not an image file was copied!"))
    } catch (err) {
      console.log(error(err))
    }
    return
  }

  const fileMetaData = await sharp(localFileVar).metadata()

  // if (fileMetaData.width > 400) {
  //   localFileVar = await sharp(localFileVar).resize({ width: 400 }).toBuffer()
  // }

  if (fileMetaData.format === "jpeg") {
    await sharp(localFileVar).jpeg({ progressive: true, force: false })
  }

  if (fileMetaData.format === "png") {
    await sharp(localFileVar).png({
      compressionLevel: 8,
      progressive: true,
      force: false,
    })
  }

  // if destination folder doesn't exist, create it.
  // if it exists, write files to it.
  try {
    await ensureDir(fileDestDir)
    await sharp(localFileVar).withMetadata().toFile(fileDest)
  } catch (err) {
    console.log(error(err))
  }
}

async function cleanAndCreateDestDir(destPath) {
  try {
    await fs.access(destPath, fs.constants.R_OK | fs.constants.W_OK)
    await fs.rm(destPath, { recursive: true })
  } catch {
    // ignore
  } finally {
    await fs.mkdir(destPath)
  }
}

async function showStats(file) {
  const fileName = path.basename(file)
  const stats = await fs.stat(file)
  const outputFileSize = fSizeLib.filesize(stats.size, {
    base: 2,
    standard: "jedec",
  })

  console.log(`File: ${fileName} - ${outputFileSize}`)
}

try {
  const files = await getFiles(directory)

  const destDir = path.join(__dirname, "..", "public")
  await cleanAndCreateDestDir(destDir)

  for await (const file of files) {
    await optimizeImage(file, destDir)
    await showStats(file)
  }
} catch (err) {
  console.error(err)
} finally {
  console.log(success("Done!"))
}
