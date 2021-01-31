class EventEmitter {
  constructor () {
    this._events = {}
  }

  emit (eventName, ...args) {
    const listeners = this._events[eventName]
    if (listeners) {
      const length = listeners.length
      for (let i = 0; i < length; i++) listeners[i].apply(this, args)
    }
    return this
  }

  addListener (eventName, listener) {
    if (typeof listener === 'function') {
      if (!this._events[eventName]) this._events[eventName] = []
      this._events[eventName].push(listener)
    }
    return this
  }

  removeListener (eventName, listener) {
    const listeners = this._events[eventName]
    if (listeners && typeof listener === 'function') {
      const idx = listeners.lastIndexOf(listener)
      if (idx > -1) listeners.splice(idx, 1)
    }
    return this
  }

  removeAllListeners () {
    this._events = {}
    return this
  }

  once (eventName, listener) {
    if (typeof listener === 'function') {
      const state = {
        eventName: eventName,
        listener: listener,
        wrappedListener: undefined
      }
      const onceWrapped = this._once.bind(this, state)
      state.wrappedListener = onceWrapped
      this.addListener(eventName, onceWrapped)
    }
    return this
  }

  _once (state, ...args) {
    if (state.wrappedListener) {
      this.removeListener(state.eventName, state.wrappedListener)
      state.listener.apply(this, args)
    }
  }
}

EventEmitter.prototype.on = EventEmitter.prototype.addListener
EventEmitter.prototype.off = EventEmitter.prototype.removeListener

export default EventEmitter
