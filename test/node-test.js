'use strict'

const EventEmitter = require('events')

function Factory () {
  EventEmitter.call(this)
}

Factory.prototype = Object.create(EventEmitter.prototype)
Factory.prototype.constructor = Factory

testMultipleListeners()
testStandardEvents()

function testMultipleListeners () {
  console.info('\nTest Multiple listeners\n')

  const EVT_1 = 'evt1'

  const emitter1 = new Factory()

  console.info('Add 2 listeners')

  emitter1.on(EVT_1, _listener1)
  emitter1.on(EVT_1, _listener1)

  console.info('EMIT ONCE')

  emitter1.emit(EVT_1)

  console.info('REMOVE 1 listener')

  emitter1.off(EVT_1, _listener1)

  console.info('EMIT ONCE')

  emitter1.emit(EVT_1)

  console.info('\nEnd Test Multiple listeners\n')

  function _listener1 () {
    console.log('EVT_1, listener 1')
  }
}

function testStandardEvents () {
  console.info('\nTest Standard events\n')

  const EVT_1 = 'evt1'

  const emitter1 = new Factory()

  console.info('Add standard listeners')

  emitter1.on('removeListener', _onRemoveListener)
  emitter1.on('newListener', _onAddListener)

  console.info('ADD 1 listeners')

  emitter1.on(EVT_1, _listener1)

  console.info('EMIT ONCE')

  emitter1.emit(EVT_1)

  console.info('REMOVE 1 listener')

  emitter1.off(EVT_1, _listener1)

  console.info('ADD 1 ONCE listener')

  emitter1.once(EVT_1, _listener1)

  console.info('EMIT EVT')

  emitter1.emit(EVT_1)

  console.info('EMIT EVT')

  emitter1.emit(EVT_1)

  console.info('\nEnd Test Standard\n')

  function _listener1 () {
    console.log('EVT_1, listener 1')
  }

  function _onAddListener (event, listener) {
    console.log(
      'ADD LISTENER\nARGUMENTS\n',
      arguments,
      '\nLISTENER is EQUAL\n',
      listener === _listener1
    )
  }

  function _onRemoveListener (event, listener) {
    console.log(
      'REMOVE LISTENER\nARGUMENTS\n',
      arguments,
      '\nLISTENER is EQUAL\n',
      listener === _listener1
    )
  }
}
