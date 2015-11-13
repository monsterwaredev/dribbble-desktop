
var List = function List(options) {
    'use strict';
    return App.Common.View.call(this, options);
};

List.prototype = Object.create(App.Common.View.prototype);
List.prototype.constructor = List;

List.prototype.controller = function(opts) {
    if (!this.get('initialized')) {
        // Set item status as initialized
        this.set('initialized', true);
        // Patch component object
        this.component(opts);
        // Link stylesheet
        this.stylesheet(['components/list.css']);
        // Create and modifiy element
    }
};

List.prototype.view = function() {
    return m('div', [
        ((typeof this.get('name') === 'string' && this.get('name').trim().length > 0) ? m('h5', {
            class: [
                'dribbble-component',
                'component-list',
                'list-title'
            ].join(' ')
        }, this.get('name')) : undefined),
        ((typeof this.get('items') === 'object' && this.get('items') instanceof Array && this.get('items').length > 0) ? m('ul', {
            class: [
                'dribbble-component',
                'component-list',
                'list-items-container'
            ].join(' ')
        }, [

        ]) : undefined)
    ]);
};

App.Components.List = List;

