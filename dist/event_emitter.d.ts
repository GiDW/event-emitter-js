interface EventEmitterEvents {
    [key: string]: ((...args: any) => void)[];
}
declare class EventEmitter {
    _events: EventEmitterEvents;
    emit(eventName: string): this;
    addListener(eventName: string, listener: (...args: any) => void): this;
    removeListener(eventName: string, listener: (...args: any) => void): this;
    removeAllListeners(): this;
    once(eventName: string, listener: (...args: any) => void): this;
    private _once;
}
interface EventEmitter {
    on: typeof EventEmitter.prototype.addListener;
    off: typeof EventEmitter.prototype.removeListener;
}
export default EventEmitter;
