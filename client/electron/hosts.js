/**
 * @from https://oldj.net
 */
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const exec = require('child_process').exec
const md5File = require('md5-file')
const io = require('./io')
const { workPath, hostsPath, dataPath } = require('./paths')

let sudoPwd = ''

function needPwd(str) {
  str = str.toLowerCase()

  console.log('needPwd(): ', str)

  const keys = [
    'Permission denied',
    'incorrect password',
    'Password:Sorry, try again.'
  ]
  return !!keys.find(k => str.includes(k.toLowerCase()))
}

function saveUnix(content) {
  let tempFile = path.join(workPath, 'tmp.txt')

  if (typeof content !== 'string') {
    return Promise.reject('bad content')
  }

  return io.writeFile(tempFile, content).then(() => {
    let cmd

    if (!sudoPwd) {
      cmd = [
        `cat "${tempFile}" > ${hostsPath}`,
        `rm -rf ${tempFile}`
      ].join(' && ')
    } else {
      cmd = [
        `echo '${sudoPwd}' | sudo -S chmod 777 ${hostsPath}`,
        `cat "${tempFile}" > ${hostsPath}`,
        `echo '${sudoPwd}' | sudo -S chmod 644 ${hostsPath}`
      ].join(' && ')
    }

    return cmd
  }).then(cmd => {
    return new Promise((resolve, reject) => {
      exec(cmd, function (error, stdout, stderr) {
        if (!error) {
          return resolve()
        }
  
        reject(!sudoPwd || needPwd(stdout + stderr) ? 'need_sudo' : error)
      })
    })
  })
}

function saveWin32(content) {
  return io.writeFile(hostsPath, content)
}

module.exports = {
  save: (content, pwd) => {
    let fileMD5 = md5File.sync(hostsPath)
    let contentMD5 = crypto.createHash('md5').update(content).digest('hex')

    if (fileMD5 === contentMD5) {
      // 文件相同
      console.log('same hosts content')
      return Promise.resolve()
    }

    if (pwd) {
      sudoPwd = pwd
    }

    if (process.platform === 'win32') {
      return saveWin32(content)
    }
    return saveUnix(content)
  },
  saveJSON: (json) => {
    return io.writeFile(dataPath, json)
  },
  getJSON: () => {
    return io.readFile(dataPath)
  }
}