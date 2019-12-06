/* eslint-env mocha */

'use strict'

const chai = require('chai')
const expect = chai.expect

const EventEmitter = require('../dist/event_emitter').default

describe('EventEmitter', function () {
  describe('#on', function () {
    it('should fire once', function () {
      const EVT = 'someEvent'
      const emitter = new EventEmitter()
      let count = 0
      emitter.on(EVT, function () {
        count++
      })
      emitter.emit(EVT)
      expect(count).to.equal(1)
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
      expect(count).to.equal(2)
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
      expect(count).to.equal(4)
    })
    it('should fire once', function () {
      const EVT = 'someEvent'
      const emitter = new EventEmitter()
      let count = 0
      emitter.on(EVT, listener)
      emitter.emit(EVT)
      emitter.removeListener(EVT, listener)
      emitter.emit(EVT)
      expect(count).to.equal(1)

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
      expect(result1).to.equal(12) && expect(result2).to.equal('lol')
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
      expect(count).to.equal(1)
    })
  })
})
