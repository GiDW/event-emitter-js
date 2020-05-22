'use strict'

var shell = require('shelljs')

var nodeVersion = process.versions.node
var nodeVersionMaj = parseInt(nodeVersion.split('.')[0], 10)

var child

if (nodeVersionMaj < 12) {
  child = shell.exec('npm run test-legacy')
} else {
  child = shell.exec('npm run test-esm')
}

process.exit(child.code)
