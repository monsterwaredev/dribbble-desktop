
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
        // Check if for attribute exists
        if (!this.get('for')) {
            this.throw('Dropdown Element requires "for" attribute');
        }
    }
};

DropdownMenu.prototype.view = function() {
    return m('ul', {
        id: this.id(),
        class: [
            'dribbble-component',
            'component-dropdownmenu',
            'dropdownmenu-element',
            'mdl-menu',
            'mdl-menu--bottom-left',
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





