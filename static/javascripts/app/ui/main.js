
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
    this.set('ui.component.sidebar', {
        el: new App.Components.Sidebar,
        attributes: { }
    });
};

MainUI.prototype.view = function() {
    return [
        m.component(this.get('ui.component.sidebar').el, this.get('ui.component.sidebar').attributes)

    ];
};

App.UI.MainUI = MainUI;

