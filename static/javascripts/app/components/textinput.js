
var TextInput = function TextInput(options) {
    'use strict';
    return App.Common.View.call(this, options);
};

TextInput.prototype = Object.create(App.Common.View.prototype);
TextInput.prototype.constructor = TextInput;

TextInput.prototype.controller = function(opts) {
    if (!this.get('initialized')) {
        // Set item status as initialized
        this.set('initialized', true);
        // Patch component object
        this.component(opts);
        // Link stylesheet
        this.stylesheet(['components/textinput.css']);
    }
};

TextInput.prototype.placeholder = function() {
    if (typeof this.get('placeholder') === 'string') {
        return this.get('placeholder');
    }
    return '';
};

TextInput.prototype.view = function() {
    return m('div', {
        config: this.instance().autoconfig.bind(this.instance()),
        class: 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label'
    }, [
        m('input', {
            id: this.id(),
            class: [
                'dribbble-component',
                'component-textinput',
                'textinput-element',
                'mdl-textfield__input'
            ].join(' '),
            type: (typeof this.get('type') === 'string' && ['text', 'password', 'email'].indexOf(this.get('type')) > -1) ? this.get('type') : 'text'
        }),
        m('label', {
            class: [
                'dribbble-component',
                'component-textinput',
                'textinput-placeholder',
                'mdl-textfield__label',
            ].join(' '),
        }, ((typeof this.get('placeholder') === 'string' && this.get('placeholder').trim().length > 0) ? this.get('placeholder') : '').toUpperCase())
    ]);
};

App.Components.TextInput = TextInput;





