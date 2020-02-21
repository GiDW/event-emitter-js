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
    // eslint-disable-next-line dot-notation
    root['EventEmitter'] = factory()
  }
}(typeof self !== 'undefined' ? self : this, function () {
  function EventEmitter () {
    /**
     * @type {Object}
     */
    // eslint-disable-next-line dot-notation
    this['_events'] = {}
  }

  // eslint-disable-next-line dot-notation
  EventEmitter.prototype['emit'] = function (eventName) {
    var listeners, i, length, args
    if (typeof eventName === 'string' &&
        eventName &&
        // eslint-disable-next-line dot-notation
        this['_events'][eventName]) {
      args = _getArgs(arguments, 1)
      // eslint-disable-next-line dot-notation
      listeners = this['_events'][eventName]
      length = listeners.length
      for (i = 0; i < length; i++) {
        listeners[i].apply(this, args)
      }
    }
    return this
  }

  // eslint-disable-next-line dot-notation
  EventEmitter.prototype['addListener'] = function (eventName, listener) {
    if (typeof eventName === 'string' &&
        eventName &&
        typeof listener === 'function') {
      // eslint-disable-next-line dot-notation
      if (!this['_events'][eventName]) this['_events'][eventName] = []
      // eslint-disable-next-line dot-notation
      this['_events'][eventName].push(listener)
    }
    return this
  }

  // eslint-disable-next-line dot-notation
  EventEmitter.prototype['removeListener'] = function (eventName, listener) {
    var listeners, idx
    if (typeof eventName === 'string' &&
        eventName &&
        typeof listener === 'function' &&
        // eslint-disable-next-line dot-notation
        this['_events'][eventName]) {
      // eslint-disable-next-line dot-notation
      listeners = this['_events'][eventName]
      idx = listeners.lastIndexOf(listener)
      if (idx > -1) listeners.splice(idx, 1)
    }
    return this
  }

  // eslint-disable-next-line dot-notation
  EventEmitter.prototype['removeAllListeners'] = function () {
    // eslint-disable-next-line dot-notation
    this['_events'] = {}
    return this
  }

  // eslint-disable-next-line dot-notation
  EventEmitter.prototype['once'] = function (eventName, listener) {
    var onceWrapped, state
    if (typeof eventName === 'string' &&
        eventName &&
        typeof listener === 'function') {
      // Shared object to hold actual listener reference for removal
      state = {
        eventName: eventName,
        listener: listener,
        wrappedListener: null
      }
      onceWrapped = _once.bind(this, state)
      state.wrappedListener = onceWrapped
      // eslint-disable-next-line dot-notation
      this['addListener'](eventName, onceWrapped)
    }
    return this
  }

  // eslint-disable-next-line dot-notation
  EventEmitter.prototype['on'] = EventEmitter.prototype['addListener']
  // eslint-disable-next-line dot-notation
  EventEmitter.prototype['off'] = EventEmitter.prototype['removeListener']

  return EventEmitter

  function _once (state) {
    // eslint-disable-next-line dot-notation
    this['removeListener'](state.eventName, state.wrappedListener)
    state.listener.apply(this, _getArgs(arguments, 1))
  }

  /**
   * @param {Arguments} args
   * @param {number} offset
   * @returns {Array}
   */
  function _getArgs (args, offset) {
    var result, i, length
    result = []
    length = args.length
    for (i = offset; i < length; i++) result.push(args[i])
    return result
  }
}))
