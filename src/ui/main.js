
var Window = require('../common/window.js');

var MainUI = function MainUI(options) {
    'use strict';
    if (!(this instanceof MainUI)) {
        return new MainUI(options);
    }
    Window.call(this, options);
    // Set template
    this.template('main');
    return this;
};

MainUI.prototype = Object.create(Window.prototype);
MainUI.prototype.constructor = MainUI;

module.exports = exports = MainUI;
