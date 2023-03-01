const sharp = require("sharp")
const fs = require("fs")
const path = require("path")
const fSizeLib = require("filesize");

const directory = path.join(__dirname, '..' ,"src/images")
fs.readdir(directory, async (err, files) => {
  if (err) throw err

  for (const fileName of files) {
    const currentFilePath = path.join(directory, fileName)
    const publicDir = path.join(__dirname, '..', "public")
    const fileExtension = path.extname(fileName)

    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir)
    }

    try {
      switch (fileExtension) {
        case ".jpg" || ".jpeg":
          await sharp(currentFilePath)
            .jpeg({ progressive: true, force: false })
            .toFile(`${publicDir}/${fileName}`)
          break
        case ".png":
          await sharp(currentFilePath)
            .png({ progressive: true, force: false })
            .toFile(`${publicDir}/${fileName}`)
          break

        default:
          break
      }

      const stats = fs.statSync(`${publicDir}/${fileName}`)
      const outputFileSize = fSizeLib.filesize(stats.size, {base: 2, standard: "jedec"});
      console.log(outputFileSize)
    } catch (error) {
      console.error(`An error occurred during processing: ${error}`)
    }
  }
})