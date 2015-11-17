
var SubMenu = function SubMenu(options) {
    'use strict';
    return App.Common.View.call(this, options);
};

SubMenu.prototype = Object.create(App.Common.View.prototype);
SubMenu.prototype.constructor = SubMenu;

SubMenu.prototype.controller = function(opts) {
    if (!this.get('initialized')) {
        // Set item status as initialized
        this.set('initialized', true);
        // Patch component object
        this.component(opts);
        // Link stylesheet
        this.stylesheet(['components/submenu.css']);
    }
};

SubMenu.prototype.view = function() {
    return m('li', {
        config: this.instance().autoconfig.bind(this.instance()),
        id: this.id(),
        class: [
            'dribbble-component',
            'component-submenu',
            'submenu-element',
            'mdl-menu__item'
        ].join(' '),
        onclick: function(e) {
            if (typeof this.get('events') === 'object' && typeof this.get('events').onclick === 'function') {
                this.get('events').onclick.call(this, e);
            }
        }.bind(this)
    }, [
        m('span', (this.get('name') || '').toUpperCase())
    ]);
};

App.Components.SubMenu = SubMenu;





