(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventEmitter = /** @class */ (function () {
        function EventEmitter() {
            this._events = {};
        }
        EventEmitter.prototype.emit = function (eventName) {
            if (typeof eventName === 'string' &&
                eventName &&
                this._events[eventName]) {
                var args = EventEmitter._getArgs(arguments, 1);
                var listeners = this._events[eventName];
                var length_1 = listeners.length;
                for (var i = 0; i < length_1; i++) {
                    listeners[i].apply(this, args);
                }
            }
            return this;
        };
        EventEmitter.prototype.addListener = function (eventName, listener) {
            if (typeof eventName === 'string' &&
                eventName &&
                typeof listener === 'function') {
                if (!this._events[eventName])
                    this._events[eventName] = [];
                this._events[eventName].push(listener);
            }
            return this;
        };
        EventEmitter.prototype.once = function (eventName, listener) {
            if (typeof eventName === 'string' &&
                eventName &&
                typeof listener === 'function') {
                var state = {
                    eventName: eventName,
                    listener: listener,
                    wrappedListener: undefined
                };
                var onceWrapped = this._once.bind(this, state);
                state.wrappedListener = onceWrapped;
                this.addListener(eventName, onceWrapped);
            }
            return this;
        };
        EventEmitter.prototype.removeListener = function (eventName, listener) {
            if (typeof eventName === 'string' &&
                eventName &&
                typeof listener === 'function' &&
                this._events[eventName]) {
                var listeners = this._events[eventName];
                var idx = listeners.indexOf(listener);
                while (idx > -1) {
                    listeners.splice(idx, 1);
                    idx = listeners.indexOf(listener);
                }
            }
            return this;
        };
        EventEmitter.prototype.removeAllListeners = function () {
            this._events = {};
            return this;
        };
        EventEmitter.prototype._once = function (state) {
            if (state.wrappedListener) {
                this.removeListener(state.eventName, state.wrappedListener);
                state.listener.apply(this, EventEmitter._getArgs(arguments, 1));
            }
        };
        EventEmitter._getArgs = function (args, offset) {
            var result, i, length;
            result = [];
            length = args.length;
            for (i = offset; i < length; i++)
                result.push(args[i]);
            return result;
        };
        return EventEmitter;
    }());
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    exports.default = EventEmitter;
});
