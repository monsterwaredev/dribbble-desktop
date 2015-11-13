
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
    if (typeof this.patch === 'function') {
        this.patch();
    }
    if (typeof this.controller === 'function') {
        this.controller();
    }
    return this;
};

View.prototype.constructor = View;

View.prototype.id = function() {
    if (typeof this.get('_id') !== 'string' || (typeof this.get('_id') && this.get('_id').trim().length === 0)) {
        this.set('_id', Math.random().toString(36).substring(7));
    }
    return this.get('_id');
};

View.prototype.self = function() {
    return this;
};

View.prototype.get = function(key) {
    if (typeof key === 'string') {
        return this.attributes[key];
    }
    return this.attributes;
};

View.prototype.set = function(key, value) {
    if (typeof key === 'string') {
        this.attributes[key] = value;
    }
    return this;
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
    var targets = [
        'controller',
        'view'
    ];
    for (var i = 0; i < targets.length; i++) {
        var target = targets[i];
        if (typeof this[target] === 'function') {
            if (typeof this[target].get !== 'function') {
                this[target].prototype.get = this.get.bind(this);
            }
            if (typeof this[target].set !== 'function') {
                this[target].prototype.set = this.set.bind(this);
            }
            if (typeof this[target].log !== 'function') {
                this[target].prototype.log = this.log.bind(this);
            }
            if (typeof this[target].throw !== 'function') {
                this[target].prototype.throw = this.throw.bind(this);
            }
            if (typeof this[target].component !== 'function') {
                this[target].prototype.component = this.component.bind(this);
            }
            if (typeof this[target].stylesheet !== 'function') {
                this[target].prototype.stylesheet = this.stylesheet.bind(this);
            }
            if (typeof this[target].self !== 'function') {
                this[target].prototype.self = this.self.bind(this);
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

App.Common.View = View;

