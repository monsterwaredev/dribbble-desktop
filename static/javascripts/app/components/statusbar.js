
var Statusbar = function Statusbar(options) {
    'use strict';
    return App.Common.View.call(this, options);
};

Statusbar.prototype = Object.create(App.Common.View.prototype);
Statusbar.prototype.constructor = Statusbar;

Statusbar.prototype.controller = function(opts) {
    if (!this.get('initialized')) {
        // Set item status as initialized
        this.set('initialized', true);
        // Patch component object
        this.component(opts);
        // Link stylesheet
        this.stylesheet(['components/statusbar.css']);
        // Create and modifiy element
    }
};

Statusbar.prototype.view = function() {
    return m('div', {
        class: [
            'dribbble-component',
            'component-statusbar',
            'statusbar-element'
        ].join(' ')
    }, m('p', {
        class: [
            'dribbble-component',
            'component-statusbar',
            'statusbar-message'
        ].join(' ')
    }, [ 'Fetched successfully' ]
    ));
};

App.Components.Statusbar = Statusbar;


