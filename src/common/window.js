
var Base = require('./base.js');

var BrowserWindow = require('browser-window');

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
    this.set('window', new BrowserWindow(this.opts));
    // Set window property
    this.get('window').setMenu(null);
    this.get('window').loadUrl('file://' + __dirname + '/../../static/templates/' + this.opts.template + '.html');
    return this;
};

Window.prototype = Object.create(Base.prototype);
Window.prototype.constructor = Window;

Window.prototype.template = function(name) {
    this.get('window').loadUrl('file://' + __dirname + '/../../static/templates/' + name + '.html');
};

Window.prototype.debug = function() {
    this.get('window').webContents.openDevTools();
};

Window.prototype.ui = function() {
    return this.get('window');
};

module.exports = exports = Window;

