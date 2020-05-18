/* eslint-env mocha */

'use strict'

import assert from 'assert'

import events from 'events'
import EventEmitterEsm from '../esm/event_emitter.esm.js'
import EventEmitterCjs from '../lib/event_emitter.cjs.js'
import EventEmitterUmd from '../umd/event_emitter.umd.js'

import testEventEmitter from '../test/tests.js'

testEventEmitter(
  assert,
  events,
  'Events (NodeJS) - Reference'
)
testEventEmitter(
  assert,
  EventEmitterEsm,
  'EventEmitter (TypeScript ESM build)'
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
