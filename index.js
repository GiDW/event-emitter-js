/* global self */
(function (root, factory) {
  // eslint-disable-next-line no-undef
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module
    // eslint-disable-next-line no-undef
    define([], factory)
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory()
  } else {
    // Browser globals (root is window)
    root.EventEmitter = factory()
  }
}(typeof self !== 'undefined' ? self : this, function () {
  // TODO once
  // TODO Multiple same listeners, on remove, delete last added first
  function EventEmitter () {
    /**
         * @type {Object.<string, function[]>}
         */
    this._events = {}
  }

  EventEmitter.prototype.emit = function (eventName) {
    var listeners, i, length, args

    if (typeof eventName === 'string' && eventName &&
            this._events[eventName]) {
      args = _getArgs(arguments, 1)

      listeners = this._events[eventName]
      length = listeners.length
      for (i = 0; i < length; i++) {
        listeners[i].apply(this, args)
      }
    }

    return this
  }

  EventEmitter.prototype.addListener = function (eventName, listener) {
    if (typeof eventName === 'string' && eventName &&
            typeof listener === 'function') {
      if (!this._events[eventName]) this._events[eventName] = []

      this._events[eventName].push(listener)
    }

    return this
  }

  EventEmitter.prototype.removeListener = function (eventName, listener) {
    var listeners, i, length

    if (typeof eventName === 'string' && eventName &&
            typeof listener === 'function' &&
            this._events[eventName]) {
      listeners = this._events[eventName]

      length = listeners.length
      for (i = 0; i < length; i++) {
        if (listeners[i] === listener) {
          listeners.splice(i, 1)

          break
        }
      }
    }

    return this
  }

  EventEmitter.prototype.removeAllListeners = function () {
    this._events = {}
    return this
  }

  EventEmitter.prototype.once = function (eventName, listener) {
    var onceWrapped, state

    if (typeof eventName === 'string' && eventName &&
            typeof listener === 'function') {
      state = {
        eventName: eventName,
        listener: listener,
        wrappedListener: null
      }

      onceWrapped = _once.bind(this, state)

      state.wrappedListener = onceWrapped

      this.addListener(eventName, onceWrapped)
    }

    return this
  }

  EventEmitter.prototype.on = EventEmitter.prototype.addListener
  EventEmitter.prototype.off = EventEmitter.prototype.removeListener

  return EventEmitter

  function _once (state) {
    this.removeListener(state.eventName, state.wrappedListener)

    state.listener.apply(this, _getArgs(arguments, 1))
  }

  /**
     * @param {IArguments} args
     * @param {number} offset
     * @returns {Array}
     */
  function _getArgs (args, offset) {
    var result, i, length

    result = []

    length = args.length
    for (i = offset; i < length; i++) {
      result.push(args[i])
    }

    return result
  }
}))
