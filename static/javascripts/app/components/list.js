
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
    return m('ul', [

    ]);
};

App.Components.List = List;

