
var Base = require('./base.js');

var electron = require('electron');

var Window = function Window(options) {
    'use strict';
    if (!(this instanceof Window)) {
        return new Window(options);
    }
    Base.call(this, options);
    if (!this.opts.hasOwnProperty('minWidth')) {
        this.opts.minWidth = 1000;
    }
    if (!this.opts.hasOwnProperty('minHeight')) {
        this.opts.minHeight = 600;
    }
    if (!this.opts.hasOwnProperty('width')) {
        this.opts.width = 1000;
    }
    if (!this.opts.hasOwnProperty('height')) {
        this.opts.height = 600;
    }
    if (!this.opts.hasOwnProperty('template')) {
        this.opts.template = 'default';
    }
    if (!this.opts.hasOwnProperty('transparent')) {
        this.opts.transparent = false;
    }
    if (!this.opts.hasOwnProperty('frame')) {
        this.opts.frame = false;
    }
    if (!this.opts.hasOwnProperty('fullscreen')) {
        this.opts.fullscreen = false;
    }
    if (!this.opts.hasOwnProperty('resizable')) {
        this.opts.resizable = true;
    }
    if (!this.opts.hasOwnProperty('center')) {
        this.opts.center = true;
    }
    // Set debugging mode
    this.set('debugging', false);
    // Create window
    this.set('window', new electron.BrowserWindow(this.opts));
    // Set window property
    this.get('window').setMenu(null);
    this.get('window').loadURL('file://' + __dirname + '/../../static/templates/' + this.opts.template + '.html');
    // Set IPC module
    this.set('ipc', electron.ipcMain);
    // init
    if (typeof this._init === 'function') {
        this._init.call(this);
    }
};

Window.prototype = Object.create(Base.prototype);
Window.prototype.constructor = Window;

Window.prototype.template = function(name) {
    this.get('window').loadURL('file://' + __dirname + '/../../static/templates/' + name + '.html');
};

Window.prototype.debug = function() {
    this.set('debugging', true);
    this.get('window').webContents.openDevTools();
};

Window.prototype.ui = function() {
    return this.get('window');
};

Window.prototype.web = function() {
    var scope = this;
    return {
        on: function(event, cb) {
            scope.get('window').webContents.on(event, cb.bind(scope));
        },
        off: function(event, cb) {
            scope.get('window').webContents.removeListener(event, cb.bind(scope));
        },
        emit: function(event) {
            var web = scope.get('window').webContents;
            web.send.apply(web, arguments);
        }
    };
};

Window.prototype.register = function(event, cb) {
    this.get('ipc').on(event, cb.bind(this));
};

Window.prototype.unregister = function(event, cb) {
    this.get('ipc').removeListener(event, cb.bind(this));
};

module.exports = exports = Window;

