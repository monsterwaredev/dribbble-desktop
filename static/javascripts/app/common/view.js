
var View = function View(options) {
    'use strict';
    // Set options to an empty object if passed options is empty
    if (typeof options !== 'object') {
        options = {};
    }
    // Create a new instance if object is not a instance of Base
    if (!(this instanceof View)) {
        return new View(options);
    }
    // Defined pre-default values
    this.attributes = {};
    // Set options to `this.attributes` object
    for (var i in options) {
        this.attributes[i] = options[i];
    }
    // Set debugging mode
    this.set('debugging', true);
    // Set intialized status
    this.set('initialized', false);
    // Patch view
    if (typeof this.patch === 'function') {
        this.patch();
    }
    // Return self object
    if (typeof this.controller === 'function') {
        this.controller();
    }
    EventEmitter.call(this);
    return this;
};

View.EVENT = {
    ATTRIBUTE_CHANGED: 'change',
    ATTRIBUTE_DELETED: 'delete',
    ATTRIBUTE_CREATED: 'create'
};

View.prototype = Object.create(EventEmitter.prototype);
View.prototype.constructor = View;

View.prototype.id = function() {
    if (!(this instanceof View)) {
        View.prototype.throw.call(this, 'NOT_VIEW_INSTANCE');
    }
    if (typeof this.get('_id') !== 'string' || (typeof this.get('_id') && this.get('_id').trim().length === 0)) {
        this.set('_id', Math.random().toString(36).substring(7));
    }
    return this.get('_id');
};

View.prototype.self = View.prototype.instance = function() {
    if (!(this instanceof View)) {
        View.prototype.throw.call(this, 'NOT_VIEW_INSTANCE');
    }
    return this;
};

View.prototype.get = function(key) {
    if (!(this instanceof View)) {
        View.prototype.throw.call(this, 'NOT_VIEW_INSTANCE');
    }
    if (typeof key === 'string') {
        return this.attributes[key];
    }
    return this.attributes;
};

View.prototype.set = function(key, value) {
    if (!(this instanceof View)) {
        View.prototype.throw.call(this, 'NOT_VIEW_INSTANCE');
    }
    if (typeof key === 'string') {
        this.attributes[key] = value;
        this.instance().emit(View.EVENT.ATTRIBUTE_CREATED, key, this.attributes[key]);
    }
    return this;
};

View.prototype.unset = function(key) {
    if (!(this instanceof View)) {
        View.prototype.throw.call(this, 'NOT_VIEW_INSTANCE');
    }
    if (typeof key === 'string') {
        delete this.attributes[key];
    }
    this.instance().emit(View.EVENT.ATTRIBUTE_DELETED, key, this.attributes[key]);
    return this;
};

View.prototype.append = function(key, value) {
    if (!(this instanceof View)) {
        View.prototype.throw.call(this, 'NOT_VIEW_INSTANCE');
    }
    var previous;
    if (typeof key === 'string' && typeof value === 'string') {
        if (typeof this.attributes[key] !== 'string') {
            this.attributes[key] = '';
        }
        this.attributes[key] += value;
        this.instance().emit(View.EVENT.ATTRIBUTE_CHANGED, key, this.attributes[key]);
    } else if (typeof key === 'string' && typeof value === 'object' && value instanceof Array) {
        if (!(typeof this.attributes[key] === 'object' && this.attributes[key] instanceof Array)) {
            this.attributes[key] = [];
        }
        Array.prototype.push.apply(this.attributes[key], value);
        this.instance().emit(View.EVENT.ATTRIBUTE_CHANGED, key, this.attributes[key]);
    }
    return this.attributes[key];
};

View.prototype.register = function(event, cb) {
    require('electron').ipcRenderer.on(event, cb.bind(this));
};

View.prototype.unregister = View.prototype.removeListener = function(event, cb) {
    require('electron').ipcRenderer.removeListener(event, cb.bind(this));
};

View.prototype.send = function(event) {
    var ipc = require('electron').ipcRenderer;
    if (typeof event !== 'string') {
        this.throw('missing event name');
    }
    ipc.send.apply(ipc, arguments);
};

View.prototype.log = function(str) {
    if (this.get('debugging') === true) {
        var args;
        if ((typeof str === 'string' && str.indexOf('{0}') == -1) || (typeof str !== 'string')) {
            args = ['[' + this.constructor.name + ']'];
            for (var i = 0; i < arguments.length; i++) {
                args.push(arguments[i]);
            }
            console.log(args.join(' '));
        } else if (typeof str === 'string' && str.indexOf('{0}') > -1) {
            args = arguments;
            str = str.replace(/\{([0-9]+)\}/g, function (match, index) {
                return args[parseInt(index) + 1];
            });
            console.log('[' + this.constructor.name + ']', str);
        }
    }
    return this;
};

View.prototype.throw = function(str) {
    var args;
    if ((typeof str === 'string' && str.indexOf('{0}') == -1) || (typeof str !== 'string')) {
        args = ['[' + this.constructor.name + ']'];
        for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        throw args.join(' ');
    } else if (typeof str === 'string' && str.indexOf('{0}') > -1) {
        args = arguments;
        str = str.replace(/\{([0-9]+)\}/g, function (match, index) {
            return args[parseInt(index) + 1];
        });
        throw ('[' + this.constructor.name + ']' + str);
    }
};

View.prototype.component = function(options) {
    if (typeof options !== 'object') {
        options = {};
    }
    for (var i in options) {
        this.attributes[i] = options[i];
    }
};

View.prototype.patch = function() {
    // Patch targets
    var targets = [ 'controller', 'view' ],
        prototypes = Object.keys(View.prototype);
    for (var i = 0; i < targets.length; i++) {
        var target = targets[i];
        if (typeof this[target] === 'function') {
            for (var j = 0; j < prototypes.length; j++) {
                this[target].prototype[prototypes[j]] = this[prototypes[j]].bind(this);
            }
        }
    }
};

View.prototype.stylesheet = function(list) {
    var args = [];
    if (list instanceof Array) {
        args = list;
    } else {
        args = arguments;
    }
    for (var i = 0; i < args.length; i++) {
        // Get stylesheet path
        var path  = [ '..', 'styles', 'dist', args[i] ].join('/'),
            links = document.head.querySelectorAll('link[href="' + path + '"]');
        // Only link css if stylesheet is not present in the current html
        if (links.length === 0) {
            // Generate a link element
            var link = document.createElement('link');
            link.setAttribute('href', path);
            link.setAttribute('rel', 'stylesheet');
            // Append the stylesheet to html head
            document.head.appendChild(link);
        }
    }
};

View.prototype.autoconfig = function(element, isInit, context) {
    if (!(this instanceof View)) {
        View.prototype.throw.call(this, 'NOT_VIEW_INSTANCE');
    }
    if (typeof this.unload === 'function') {
        context.onunload = this.unload.call(this);
    }
};

View.prototype.unload = function() {
    this.set('initialized', false);
};

App.Common.View = View;

