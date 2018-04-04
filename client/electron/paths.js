const fs = require('fs')
const path = require('path')
const io = require('./io')
const version = require('../package.json').version

const homePath = io.userHome
const workPath = path.join(io.userHome, '.hostsManager')
const dataPath = path.join(workPath, 'data.json')
const hostsPath = process.platform === 'win32' ?
  `${process.env.windir || 'C:\\WINDOWS'}\\system32\\drivers\\etc\\hosts` :
  '/etc/hosts'

if (!io.isDirectory(workPath) || !io.isFile(dataPath)) {
  initPath(workPath, hostsPath)
}

function initPath(workPath, hostsPath) {
  try {
    fs.mkdirSync(workPath)
  } catch (e) {
    console.log(e)
  }

  fs.copyFileSync(hostsPath, path.join(workPath, 'hosts.bak'))

  let fileData = path.join(workPath, 'data.json')
  let data = {
    global: '',
    projects: [],
    version: version
  }
  fs.writeFileSync(fileData, JSON.stringify(data), 'utf-8')
}

module.exports = {
  homePath,
  workPath,
  dataPath,
  hostsPath
}