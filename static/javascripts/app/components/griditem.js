
var GridItem = function GridItem(options) {
    'use strict';
    return App.Common.View.call(this, options);
};

GridItem.prototype = Object.create(App.Common.View.prototype);
GridItem.prototype.constructor = GridItem;

GridItem.prototype.controller = function(opts) {
    var ui = this.instance();
    if (!this.get('initialized')) {
        // set item status as initialized
        this.set('initialized', true);
        // Patch component object
        this.component(opts);
        // link stylesheet
        this.stylesheet(['components/griditem.css']);
    }
};

GridItem.prototype.view = function() {
    return m('li', {
        config: this.autoconfig.bind(this.instance()),
        class: [
            'dribbble-component',
            'component-griditem',
            'griditem-element'
        ].join(' ')
    }, [
        m('img', {
            src: this.get('images').hidpi,
            class: [
                'dribbble-component',
                'component-griditem',
                'griditem-image'
            ].join(' ')
        }),
        m('h5', {
            class: [
                'dribbble-component',
                'component-griditem',
                'griditem-title'
            ].join(' ')
        }, this.get('title'))
    ]);
};

GridItem.prototype.unload = function() {

};

App.Components.GridItem = GridItem;
