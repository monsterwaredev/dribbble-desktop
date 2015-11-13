
var Button = function Button(options) {
    'use strict';
    App.Common.View.call(this, options);
    // Set debugging mode
    this.set('debugging', true);
    return this;
};

Button.prototype = Object.create(App.Common.View.prototype);
Button.prototype.constructor = Button;

Button.prototype.controller = function(opts) {
    // Patch component object
    this.component(opts);
    // Link stylesheet
    this.stylesheet(['components/button.css']);
};

Button.prototype.view = function() {
    return m('button', {
        class: 'dribbble-component component-button button-element mdl-button mdl-js-button mdl-js-ripple-effect',
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
        }, this.get('name').toUpperCase()) : 'BUTTON')
    ]);
};

App.Components.Button = Button;





