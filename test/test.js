/* eslint-env mocha */

var assert = require('assert')
var EventEmitter = require('events')

var EventEmitterCjs = require('../lib/event_emitter.cjs')
var EventEmitterUmd = require('../umd/event_emitter.umd')

var testEventEmitter = require('./tests')

testEventEmitter(
  assert,
  EventEmitter,
  'Events (NodeJS) - Reference'
)

testEventEmitter(
  assert,
  EventEmitterCjs,
  'EventEmitter (TypeScript CJS build)'
)

testEventEmitter(
  assert,
  EventEmitterUmd,
  'EventEmitter (TypeScript UMD build)'
)
