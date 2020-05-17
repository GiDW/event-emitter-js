/* eslint-env mocha */

'use strict'

import assert from 'assert'

import events from 'events'
import EventEmitterEsm from '../esm/event_emitter.mjs'
import EventEmitterCjs from '../lib/event_emitter.cjs.js'
import EventEmitterUmd from '../dist/event_emitter.umd.js'

testEventEmitter(
  events,
  'Events (NodeJS) - Reference'
)
testEventEmitter(
  EventEmitterEsm,
  'EventEmitter (TypeScript ESM build)'
)
testEventEmitter(
  EventEmitterCjs,
  'EventEmitter (TypeScript CJS build)'
)
testEventEmitter(
  EventEmitterUmd,
  'EventEmitter (TypeScript UMD build)'
)

function testEventEmitter (EventEmitter, testName) {
  describe(testName, function () {
    describe('#on, #off', function () {
      it('should fire once', function () {
        const EVT = 'someEvent'
        const emitter = new EventEmitter()
        let count = 0
        emitter.on(EVT, function () {
          count++
        })
        emitter.emit(EVT)
        assert.strictEqual(count, 1)
      })
      it('should fire twice', function () {
        const EVT = 'someEvent'
        const emitter = new EventEmitter()
        let count = 0
        emitter.on(EVT, function () {
          count++
        })
        emitter.on(EVT, function () {
          count++
        })
        emitter.emit(EVT)
        assert.strictEqual(count, 2)
      })
      it('should fire twice (chaining)', function () {
        const EVT = 'someEvent'
        const emitter = new EventEmitter()
        let count = 0
        emitter
          .on(EVT, function () {
            count++
          })
          .on(EVT, function () {
            count++
          })
        emitter.emit(EVT)
        assert.strictEqual(count, 2)
      })
      it('should fire four times', function () {
        const EVT = 'someEvent'
        const emitter = new EventEmitter()
        let count = 0
        emitter.on(EVT, function () {
          count++
        })
        emitter.on(EVT, function () {
          count++
        })
        emitter.emit(EVT)
        emitter.emit(EVT)
        assert.strictEqual(count, 4)
      })
      it('should fire once', function () {
        const EVT = 'someEvent'
        const emitter = new EventEmitter()
        let count = 0
        emitter.on(EVT, listener)
        emitter.emit(EVT)
        emitter.removeListener(EVT, listener)
        emitter.emit(EVT)
        assert.strictEqual(count, 1)

        function listener () {
          count++
        }
      })
      it('should pass event arguments', function () {
        const EVT = 'someEvent'
        const emitter = new EventEmitter()
        let result1, result2
        emitter.on(EVT, function (arg1, arg2) {
          result1 = arg1
          result2 = arg2
        })
        emitter.emit(EVT, 12, 'lol')
        assert.strictEqual(result1, 12)
        assert.strictEqual(result2, 'lol')
      })
      it('should have the emitter "this" context', function () {
        const EVT = 'someEvent'
        const emitter = new EventEmitter()
        let listenerThis
        emitter.on(EVT, function () {
          listenerThis = this
        })
        emitter.emit(EVT)
        assert.strictEqual(listenerThis, emitter)
      })
    })

    describe('#once', function () {
      it('should fire once', function () {
        const EVT = 'someEvent'
        const emitter = new EventEmitter()
        let count = 0
        emitter.once(EVT, function () {
          count++
        })
        emitter.emit(EVT)
        emitter.emit(EVT)
        assert.strictEqual(count, 1)
      })
      it('should fire once for each "once" listener', function () {
        const EVT = 'someEvent'
        const emitter = new EventEmitter()
        let count1 = 0
        let count2 = 0
        let count3 = 0
        emitter.emit(EVT)
        emitter.once(EVT, function () {
          count1++
        })
        emitter.emit(EVT)
        emitter.on(EVT, function () {
          count2++
        })
        emitter.emit(EVT)
        emitter.once(EVT, function () {
          count3++
        })
        emitter.emit(EVT)
        emitter.emit(EVT)
        assert.strictEqual(count1, 1)
        assert.strictEqual(count2, 3)
        assert.strictEqual(count3, 1)
      })
    })
  })
}