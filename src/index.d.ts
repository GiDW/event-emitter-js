export = EventEmitter
declare class EventEmitter {
  constructor()
  _events: {[eventName: string]: ((...args: any) => void)[]}
  emit(eventName: string, ...args: any): this
  addListener(eventName: string, listener: (...args: any) => void): this
  removeListener(eventName: string, listener: (...args: any) => void): this
  removeAllListeners(): this
  on(eventName: string, listener: (...args: any) => void): this
  off(eventName: string, listener: (...args: any) => void): this
  once(eventName: string, listener: (...args: any) => void): this
}
