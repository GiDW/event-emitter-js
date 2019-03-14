declare class EventEmitter {
  constructor();
  _events: {[eventName: string]: (() => void)[]};
  emit(eventName: string, ...args: any);
  addListener(eventName: string, listener: (...args: any) => void);
  removeListener(eventName: string, listener: (...args: any) => void);
  removeAllListeners();
  on(eventName: string, listener: (...args: any) => void);
  off(eventName: string, listener: (...args: any) => void);
  once(eventName: string, listener: (...args: any) => void);
}
