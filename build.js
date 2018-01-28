'use strict'
const path = require('path')
const fs = require('fs')

const ora = require('ora')
const chalk = require('chalk')
const rm = require('rimraf')
const shell = require('shelljs')

console.log(chalk.cyan(`  building for deploy:...\n`))

const hashPageMap = {}
const pageHashMap = {}
const enterHtml = fs.readFileSync(path.join(__dirname, 'static', 'enter.html'), 'utf-8')
const re = /\<a href=\"\/twl\/static\/([\w\d]*).html\"\>([\w-\d]*)\<\/a\>/
const matches = enterHtml.match(new RegExp(re.source, 'g'))
if (matches) {
  matches.forEach(item => {
    const matched = item.match(re)
    hashPageMap[matched[1]] = matched[2]
    pageHashMap[matched[2]] = matched[1]
  })
}

const staticPath = path.join(__dirname, 'static')
const files = fs.readdirSync(staticPath)
const pageReg = /#{page:([\w-\d]*)}/
const pageRegGlobal = new RegExp(pageReg.source, 'g')

const publicDir = path.join(__dirname, 'public')
const deployDir = path.join(__dirname, 'docs')
if (!fs.existsSync(deployDir)) {
  fs.mkdirSync(deployDir)
}
const deployStaticDir = path.join(__dirname, 'docs', 'static')
if (!fs.existsSync(deployStaticDir)) {
  fs.mkdirSync(deployStaticDir)
}
for (let file of files) {
  if (file !== 'enter.html' && file.endsWith('.html')) {
    const fileName = file.substring(0, file.indexOf('.'))
    if (!!hashPageMap[fileName]) {
      let html = fs.readFileSync(path.join(__dirname, 'static', file), 'utf-8')
      html = html.replace(pageRegGlobal, piece => {
        const matched = piece.match(pageReg)
        return matched[1] === 'index' ? '/' : '/' + matched[1]
      })
      const fileDir = path.join(__dirname, 'deploy', hashPageMap[fileName] === 'index' ? '' : hashPageMap[fileName])
      if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir)
      }
      fs.writeFileSync(fileDir + '/index.html', html)
    } else {
      console.log(chalk.red(`  ${fileName} not exsist in hashPageMap .\n`))
    }
  } else if (file !== 'enter.html' && !file.endsWith('.html')) {
    fs.createReadStream(staticPath + '/' + file).pipe(fs.createWriteStream(deployStaticDir + '/' + file))
  }
}

shell.cp('-R', publicDir + '/*', deployDir)

console.log(chalk.cyan(`  complete -------------.\n`))
