!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).EventEmitter=t()}(this,function(){"use strict";var e=(t.prototype.emit=function(e){if("string"==typeof e&&e&&this._events[e])for(var t=r(arguments,1),n=this._events[e],i=n.length,o=0;o<i;o++)n[o].apply(this,t);return this},t.prototype.addListener=function(e,t){return"string"==typeof e&&e&&"function"==typeof t&&(this._events[e]||(this._events[e]=[]),this._events[e].push(t)),this},t.prototype.removeListener=function(e,t){if("string"==typeof e&&e&&"function"==typeof t&&this._events[e]){var n=this._events[e],i=n.lastIndexOf(t);-1<i&&n.splice(i,1)}return this},t.prototype.removeAllListeners=function(){return this._events={},this},t.prototype.once=function(e,t){if("string"==typeof e&&e&&"function"==typeof t){var n={eventName:e,listener:t,wrappedListener:void 0},i=this._once.bind(this,n);n.wrappedListener=i,this.addListener(e,i)}return this},t.prototype._once=function(e){e.wrappedListener&&(this.removeListener(e.eventName,e.wrappedListener),e.listener.apply(this,r(arguments,1)))},t);function t(){this._events={}}function r(e,t){for(var n=[],i=e.length,o=t;o<i;o++)n.push(e[o]);return n}return e.prototype.on=e.prototype.addListener,e.prototype.off=e.prototype.removeListener,e});