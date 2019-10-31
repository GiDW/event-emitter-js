interface TEvents {
    [key: string]: ((...args: any) => void)[];
}
declare class EventEmitter {
    _events: TEvents;
    emit(eventName: string): this;
    addListener(eventName: string, listener: (...args: any) => void): this;
    once(eventName: string, listener: (...args: any) => void): this;
    removeListener(eventName: string, listener: (...args: any) => void): this;
    removeAllListeners(): this;
    private _once;
    private static _getArgs;
}
interface EventEmitter {
    on: typeof EventEmitter.prototype.addListener;
    off: typeof EventEmitter.prototype.removeListener;
}
export default EventEmitter;
