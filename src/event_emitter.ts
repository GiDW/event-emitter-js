interface TEvents {
  [key: string]: ((...args: any) => void)[]
}

interface TEventState {
  eventName: string
  listener: (...args: any) => void
  wrappedListener?: (...args: any) => void
}

class EventEmitter {

  _events: TEvents = {}

  public emit (eventName: string) {
    if (typeof eventName === 'string' &&
        eventName &&
        this._events[eventName]) {
      const args = EventEmitter._getArgs(arguments, 1)
      const listeners = this._events[eventName]
      const length = listeners.length
      for (let i = 0; i < length; i++) {
        listeners[i].apply(this, args)
      }
    }
    return this
  }

  public addListener (eventName: string, listener: (...args: any) => void) {
    if (typeof eventName === 'string' &&
        eventName &&
        typeof listener === 'function') {
      if (!this._events[eventName]) this._events[eventName] = []
      this._events[eventName].push(listener)
    }
    return this
  }

  public removeListener (eventName: string, listener: (...args: any) => void) {
    if (typeof eventName === 'string' &&
        eventName &&
        typeof listener === 'function' &&
        this._events[eventName]) {
      const listeners = this._events[eventName]
      let idx = listeners.lastIndexOf(listener)
      if (idx > -1) listeners.splice(idx, 1)
    }
    return this
  }

  public removeAllListeners () {
    this._events = {}
    return this
  }

  public once (eventName: string, listener: (...args: any) => void) {
    if (typeof eventName === 'string' &&
        eventName &&
        typeof listener === 'function') {
      const state: TEventState = {
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

  private _once (state: TEventState) {
    if (state.wrappedListener) {
      this.removeListener(state.eventName, state.wrappedListener)
      state.listener.apply(this, EventEmitter._getArgs(arguments, 1))
    }
  }

  private static _getArgs (args: IArguments, offset: number): any[] {
   var result, i, length
   result = []
   length = args.length
   for (i = offset; i < length; i++) result.push(args[i])
   return result
 }
}

interface EventEmitter {
  on: typeof EventEmitter.prototype.addListener
  off: typeof EventEmitter.prototype.removeListener
}

EventEmitter.prototype.on = EventEmitter.prototype.addListener
EventEmitter.prototype.off = EventEmitter.prototype.removeListener

export default EventEmitter
