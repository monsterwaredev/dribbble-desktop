
var Toolbar = function Toolbar(options) {
    'use strict';
    return App.Common.View.call(this, options);
};

Toolbar.prototype = Object.create(App.Common.View.prototype);
Toolbar.prototype.constructor = Toolbar;

Toolbar.prototype.controller = function(opts) {
    if (!this.get('initialized')) {
        // Set item status as initialized
        this.set('initialized', true);
        // Patch component object
        this.component(opts);
        // Link stylesheet
        this.stylesheet(['components/toolbar.css']);
        // Create and modifiy element
    }
};

Toolbar.prototype.view = function() {
    return m('div', {
        class: [
            'dribbble-component',
            'component-toolbar',
            'toolbar-element'
        ].join(' ')
    }, '');
};

App.Components.Toolbar = Toolbar;


