/* eslint-env node, mocha */

'use strict'

import assert from 'assert'

import events from 'events'
import EventEmitterEsm from '../../esm/event_emitter.js'
import EventEmitterUmd from '../../umd/event_emitter.js'

import testEventEmitter from '../tests.js'

testEventEmitter(
  assert,
  events,
  'Events (NodeJS) - Reference'
)
testEventEmitter(
  assert,
  EventEmitterEsm,
  'EventEmitter (ESM build)'
)
testEventEmitter(
  assert,
  EventEmitterUmd,
  'EventEmitter (UMD build)'
)
