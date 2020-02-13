declare class EventEmitter {
  constructor()
  _events: {[eventName: string]: (() => any)[]}
  emit(eventName: string, ...args: any)
  addListener(eventName: string, listener: (...args: any) => any)
  removeListener(eventName: string, listener: (...args: any) => any)
  removeAllListeners()
  on(eventName: string, listener: (...args: any) => any)
  off(eventName: string, listener: (...args: any) => any)
  once(eventName: string, listener: (...args: any) => any)
}
