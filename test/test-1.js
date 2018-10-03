'use strict';

var EventEmitter = require('../index');

var a = new EventEmitter();

a.on('evt1', onEvt1);
a.on('evt2', onEvt2);
a.once('evt1', onEvt1Once);
a.on('evt1', onEvt1Alt);
a.on('evt1', onEvt1Alt2);

console.log('EventEmitter', a._events);

a.emit('evt1', 12);
a.emit('evt2', 'lol');
a.emit('evt1', 'abc');

function onEvt1 () {
    console.log('EVT 1', arguments);
}

function onEvt2 () {
    console.log('EVT 2', arguments);
}

function onEvt1Once () {
    console.log('EVT 1 once', arguments);
}

function onEvt1Alt () {
    console.log('EVT 1 ALT 1', arguments);
}

function onEvt1Alt2 () {
    console.log('EVT 1 ALT 2', arguments);
}
