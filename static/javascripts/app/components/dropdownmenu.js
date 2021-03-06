
var DropdownMenu = function DropdownMenu(options) {
    'use strict';
    return App.Common.View.call(this, options);
};

DropdownMenu.prototype = Object.create(App.Common.View.prototype);
DropdownMenu.prototype.constructor = DropdownMenu;

DropdownMenu.prototype.controller = function(opts) {
    if (!this.get('initialized')) {
        // Set item status as initialized
        this.set('initialized', true);
        // Patch component object
        this.component(opts);
        // Link stylesheet
        this.stylesheet(['components/dropdownmenu.css']);
    }
};

DropdownMenu.prototype.view = function() {
    return m('ul', {
        config: this.instance().autoconfig.bind(this.instance()),
        id: this.id(),
        class: [
            'dribbble-component',
            'component-dropdownmenu',
            'dropdownmenu-element',
            'mdl-menu',
            'mdl-js-menu',
            'mdl-js-ripple-effect'
        ].join(' '),
        for: this.get('for')
    }, [
        this.get('items').map(function(item) {
            if (typeof item === 'object' && item instanceof App.Components.SubMenu) {
                return item.view.call(item, this.self());
            }
        }.bind(this))
    ]);
};

App.Components.DropdownMenu = DropdownMenu;





