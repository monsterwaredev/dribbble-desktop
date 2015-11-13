
var ListItem = function ListItem(options) {
    'use strict';
    return App.Common.View.call(this, options);
};

ListItem.prototype = Object.create(App.Common.View.prototype);
ListItem.prototype.constructor = ListItem;

ListItem.prototype.controller = function(opts) {
    if (!this.get('initialized')) {
        // Set item status as initialized
        this.set('initialized', true);
        // Patch component object
        this.component(opts);
        // Link stylesheet
        this.stylesheet(['components/listitem.css']);
        // Create and modifiy element
    }
};

ListItem.prototype.view = function() {
    return m('li', {
        class: [
            'dribbble-component',
            'component-listitem',
            'listitem-element'
        ].join(' ')
    }, [
        this.get('name')
    ]);
};

App.Components.ListItem = ListItem;


