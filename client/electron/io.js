const fs = require('fs')

module.exports = {
  userHome: process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'],
  isFile(p) {
    try {
      return fs.statSync(p).isFile()
    } catch (e) {
    }
    return false
  },
  isDirectory(p) {
    try {
      return fs.statSync(p).isDirectory()
    } catch (e) {
    }
    return false
  },
  writeFile(fileName, content) {
    return new Promise((resolve, reject) => {
      fs.writeFile(fileName, content, 'utf-8', (error) => error ? reject(error) : resolve(null))
    })
  },
  readFile(fileName) {
    if (!this.isFile(fileName)) {
      return Promise.reject(null)
    }
    return new Promise((resolve, reject) => {
      fs.readFile(fileName, 'utf-8', (error, content) => error ? reject(error) : resolve(content))
    })
  }
}
