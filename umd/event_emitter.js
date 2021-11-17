/* global module, self */
(function (root) {
  function EventEmitter () {
    this._events = []
  }

  EventEmitter.prototype.emit = function (eventName) {
    var listeners, args, length, i
    listeners = this._events[eventName]
    if (listeners) {
      args = getArgs(arguments, 1)
      length = listeners.length
      for (i = 0; i < length; i++) listeners[i].apply(this, args)
    }
    return this
  }

  EventEmitter.prototype.addListener = function (eventName, listener) {
    if (typeof listener === 'function') {
      if (!this._events[eventName]) this._events[eventName] = []
      this._events[eventName].push(listener)
    }
    return this
  }

  EventEmitter.prototype.removeListener = function (eventName, listener) {
    var listeners, idx
    listeners = this._events[eventName]
    if (listeners && typeof listener === 'function') {
      idx = listeners.lastIndexOf(listener)
      if (idx > -1) listeners.splice(idx, 1)
    }
    return this
  }

  EventEmitter.prototype.removeAllListeners = function () {
    this._events = {}
    return this
  }

  EventEmitter.prototype.once = function (eventName, listener) {
    var state
    if (typeof listener === 'function') {
      state = {
        eventName: eventName,
        listener: listener
      }
      state.wrappedListener = this._once.bind(this, state)
      this.addListener(eventName, state.wrappedListener)
    }
    return this
  }

  EventEmitter.prototype._once = function (state) {
    if (state.wrappedListener) {
      this.removeListener(state.eventName, state.wrappedListener)
      state.listener.apply(this, getArgs(arguments, 1))
    }
  }

  EventEmitter.prototype.on = EventEmitter.prototype.addListener
  EventEmitter.prototype.off = EventEmitter.prototype.removeListener

  if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = EventEmitter
    // To support TypeScript ES5 imports
    module.exports.default = EventEmitter
  } else {
    // Browser globals (root is window)
    root.EventEmitter = EventEmitter
  }

  function getArgs (args, offset) {
    var result, length, i
    result = []
    length = args.length
    for (i = offset; i < length; i++) result.push(args[i])
    return result
  }
}(typeof self !== 'undefined' ? self : this))
