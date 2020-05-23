'use strict'

var path = require('path')

var shell = require('shelljs')

var mochaPath = path.join(
  'node_modules',
  'mocha',
  'bin',
  'mocha'
)

var testEsmPath = path.join(
  'test-esm',
  'test.js'
)

var child = shell.exec(
  'node' +
  ' --experimental-modules' +
  ' ' + mochaPath +
  ' --color' +
  ' ' + testEsmPath
)

process.exit(child.code)
