
var Tabview = function Tabview(options) {
    'use strict';
    return App.Common.View.call(this, options);
};

Tabview.prototype = Object.create(App.Common.View.prototype);
Tabview.prototype.constructor = Tabview;

Tabview.prototype.controller = function(opts) {
    if (!this.get('initialized')) {
        // Set item status as initialized
        this.set('initialized', true);
        // Patch component object
        this.component(opts);
        // Link stylesheet
        this.stylesheet(['components/tabview.css']);
        // Create and modifiy element
    }
};

Tabview.prototype.view = function() {
    return m('div', {
        class: [
            'dribbble-component',
            'component-tabview',
            'tabview-element'
        ].join(' ')
    });
};

App.Components.Tabview = Tabview;


