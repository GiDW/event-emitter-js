declare class EventEmitter {
  private _events: { [key: string]: ((...args: any) => void)[] }
  emit(eventName: string, ...args: any[]): this
  addListener(eventName: string, listener: (...args: any) => void): this
  removeListener(eventName: string, listener: (...args: any) => void): this
  on(eventName: string, listener: (...args: any) => void): this
  off(eventName: string, listener: (...args: any) => void): this
  removeAllListeners(): this
  once(eventName: string, listener: (...args: any) => void): this
  private _once
}
export default EventEmitter
