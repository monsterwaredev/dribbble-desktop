
var Grid = function Grid(options) {
    'use strict';
    return App.Common.View.call(this, options);
};

Grid.prototype = Object.create(App.Common.View.prototype);
Grid.prototype.constructor = Grid;

Grid.prototype.controller = function(opts) {
    var ui = this.instance();
    if (!this.get('initialized')) {
        // set item status as initialized
        this.set('initialized', true);
        // Patch component object
        this.component(opts);
        // link stylesheet
        this.stylesheet(['components/grid.css']);
        // listen to data changes
        this.on(App.Common.View.EVENT.ATTRIBUTE_CHANGED, function(key, value) {
            m.redraw();
        });
    }
};

Grid.prototype.view = function() {
    return m('div', {
        config: this.autoconfig.bind(this.instance()),
        class: [
            'dribbble-component',
            'component-grid',
            'grid-element'
        ].join(' ')
    }, [
        ((typeof this.get('items') === 'object' && this.get('items') instanceof Array && this.get('items').length > 0) ? m('ul', {
            class: [
                'dribbble-component',
                'component-grid',
                'grid-list'
            ].join(' ')
        }, [
            this.get('items').map(function(item) {
                if (typeof item === 'object' && item instanceof App.Components.GridItem) {
                    return item.view();
                }
            })
        ]) : undefined)
    ]);
};

Grid.prototype.unload = function() {

};

App.Components.Grid = Grid;
