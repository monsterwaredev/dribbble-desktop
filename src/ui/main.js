
var Window = require('../common/window.js');

var MainUI = function MainUI(options) {
    'use strict';
    if (!(this instanceof MainUI)) {
        return new MainUI(options);
    }
    Window.call(this, options);
    // Set template
    this.template('main');
    this.debug();
    return this;
};

MainUI.prototype = Object.create(Window.prototype);
MainUI.prototype.constructor = MainUI;

MainUI.prototype._init = function() {
    // Require libs
    this.require([
        { id: 'dribbble' , ref: 'dribbble-node-api' }
    ]);
    this.require('api', new (this.require('dribbble')));
    this.require('api').set('access_token', 'ddd74328bb9bbf4645a5ced13514e3fefd6e7fafc1b8b0a9d3b8f27581ac7ce3');
    // Events
    this.web().on('did-finish-load', function() {
        this.getShots(0);
    });
};

MainUI.prototype.getShots = function() {
    var self = this;
    this.require('api').shots(function(err, res) {
        self.web().emit('shots', err, res);
    });
};

module.exports = exports = MainUI;
