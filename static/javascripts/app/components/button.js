
var Button = function Button(options) {
    'use strict';
    return App.Common.View.call(this, options);
};

Button.prototype = Object.create(App.Common.View.prototype);
Button.prototype.constructor = Button;

Button.prototype.controller = function(opts) {
    if (!this.get('initialized')) {
        // Set item status as initialized
        this.set('initialized', true);
        // Patch component object
        this.component(opts);
        // Link stylesheet
        this.stylesheet(['components/button.css']);
    console.log('hei', this);
    }
};

Button.prototype.component = function(opts) {
    App.Common.View.prototype.component.call(this, opts);
    if (typeof this.get('menu') === 'object' && this.get('menu') instanceof App.Components.DropdownMenu) {
        this.get('menu').set('for', this.id());
    }
};

Button.prototype.view = function() {
    return m('div', {
        class: 'component-button button-container'
    }, [
        m('button', {
            id: this.id(),
            class: [
                'dribbble-component',
                'component-button',
                'button-element',
                'mdl-button',
                'mdl-js-button',
                'mdl-js-ripple-effect'
            ].join(' '),
            style: this.get('style') ? this.get('style') : '',
            onclick: function(e) {
                if (typeof this.get('events') === 'object' && typeof this.get('events').onclick === 'function') {
                    this.get('events').onclick.call(this, e);
                }
            }.bind(this)
        }, [
            ((typeof this.get('icon') === 'string' && this.get('icon').trim().length > 0) ? m('div', {
                style: [
                    '-webkit-mask-image: url(' + ([ '..', 'images', this.get('icon') ].join('/')) + ')',
                    '-webkit-mask-repeat: no-repeat',
                    'mask-image: url(' + ([ '..', 'images', this.get('icon') ].join('/')) + ')',
                    'mask-repeat: no-repeat'
                ].join(';'),
                class: 'component-button button-icon'
            }) : undefined),
            ((typeof this.get('name') === 'string' && this.get('name').trim().length > 0) ? m('span', {
                class: 'component-button button-text'
            }, this.get('name').toUpperCase()) : 'BUTTON'),
            ((typeof this.get('menu') === 'object' && this.get('menu') instanceof App.Components.DropdownMenu) ? m('div', {
                class: 'component-button button-dropdown-arrow'
            }) : undefined)
        ]),
        ((typeof this.get('menu') === 'object' && this.get('menu') instanceof App.Components.DropdownMenu) ? this.get('menu').view() : undefined)
    ]);
};

App.Components.Button = Button;





