# EventEmitter

Simplified EventEmitter

[![NPM version](https://img.shields.io/npm/v/@gidw/event-emitter-js.svg)](https://www.npmjs.com/package/@gidw/event-emitter-js)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License](https://img.shields.io/github/license/GiDW/event-emitter-js.svg)](https://github.com/GiDW/event-emitter-js/blob/master/LICENSE)

## Installation

UMD

## Usage

```js
var emitter = new EventEmitter()

emitter.on('event', function (data) {
    console.log('on event', data)
})

emitter.emit('event', 'data')
```
