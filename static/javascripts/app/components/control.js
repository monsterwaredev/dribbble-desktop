
var Control = function Control(options) {
    'use strict';
    return App.Common.View.call(this, options);
};

Control.prototype = Object.create(App.Common.View.prototype);
Control.prototype.constructor = Control;

Control.prototype.controller = function(opts) {
    if (!this.get('initialized')) {
        // Set item status as initialized
        this.set('initialized', true);
        // Patch component object
        this.component(opts);
        // Link stylesheet
        this.stylesheet(['components/control.css']);
        // Create and modifiy element
    }
};

Control.prototype.view = function() {
    return m('div', {
        config: this.instance().autoconfig.bind(this.instance()),
        class: [
            'dribbble-component',
            'component-control',
            'control-element'
        ].join(' ')
    });
};

App.Components.Control = Control;


