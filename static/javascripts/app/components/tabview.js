
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
        this.set('index', 0);
    }
};

Tabview.prototype.view = function() {
    return m('div', {
        class: [
            'dribbble-component',
            'component-tabview',
            'tabview-element'
        ].join(' '),
        style: {
            width: ((this.get('items').length * 110) + 'px')
        }
    }, [
        ((typeof this.get('items') === 'object' && this.get('items') instanceof Array && this.get('items').length > 0) ? m('ul', {
            class: [
                'dribbble-component',
                'component-tabview',
                'tabview-container'
            ].join(' ')
        }, [
            this.get('items').map(function(item, index) {
                return m('li', {
                    class: [
                        'dribbble-component',
                        'component-tabview',
                        'tabview-item',
                        index === this.get('index') ? 'item-selected' : ''
                    ].join(' ')
                }, [
                    m('button', {
                        class: [
                            'dribbble-component',
                            'component-tabview',
                            'tabview-button',
                            'mdl-button',
                            'mdl-js-button',
                            'mdl-js-ripple-effect'
                        ].join(' ')
                    }, item)
                ]);
            }.bind(this))
        ]) : undefined)
    ]);
};

App.Components.Tabview = Tabview;


