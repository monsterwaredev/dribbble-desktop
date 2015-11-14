
var MainUI = function MainUI(options) {
    'use strict';
    App.Common.View.call(this, options);
    // Set debugging mode
    this.set('debugging', true);
    return this;
};

MainUI.prototype = Object.create(App.Common.View.prototype);
MainUI.prototype.constructor = MainUI;

MainUI.prototype.controller = function() {
    // Link stylesheet
    this.stylesheet(['core/application.css', 'ui/main.css']);
    // Create and modifiy element
    this.set('ui.component.sidebar', new App.Components.Sidebar({
        'name': 'sidebar'
    }));
    this.set('ui.component.statusbar', new App.Components.Statusbar({
        'name': 'statusbar'
    }));
    this.set('ui.component.toolbar', new App.Components.Toolbar({
        'name': 'toolbar'
    }));
};

MainUI.prototype.view = function() {
    return [
        m.component(this.get('ui.component.sidebar')),
        m.component(this.get('ui.component.statusbar')),
        m.component(this.get('ui.component.toolbar'))
    ];
};

App.UI.MainUI = MainUI;

