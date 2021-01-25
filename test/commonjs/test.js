/* eslint-env node, mocha */

var assert = require('assert')
var EventEmitter = require('events')

var EventEmitterUmd = require('../../umd/event_emitter.js')

var testEventEmitter = require('../tests')

testEventEmitter(
  assert,
  EventEmitter,
  'Events (NodeJS) - Reference'
)

testEventEmitter(
  assert,
  EventEmitterUmd,
  'EventEmitter (UMD build)'
)
