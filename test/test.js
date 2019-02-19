'use strict'

const chai = require('chai')
const expect = chai.expect
const EventEmitter = require('../dist/index.js')

describe('on', function () {
  it('Should fire once', function () {
    const EVT = 'someEvent'
    const emitter = new EventEmitter()
    let count = 0
    emitter.on(EVT, function () {
      count++
    })
    emitter.emit(EVT)
    expect(count).to.equal(1)
  })
  it('Should fire twice', function () {
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
  it('Should fire four times', function () {
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
  it('Should fire once', function () {
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
})

describe('once', function () {
  it('Should fire once', function () {
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
