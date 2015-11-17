
var MainUI = function MainUI(options) {
    'use strict';
    return App.Common.View.call(this, options);
};

MainUI.prototype = Object.create(App.Common.View.prototype);
MainUI.prototype.constructor = MainUI;

MainUI.prototype.controller = function() {
    var ui = this.instance();
    if (!this.get('initialized')) {
        // Set item status as initialized
        this.set('initialized', true);
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
        this.on('shots', ui._retrieveShots.bind(ui));
    }
};

MainUI.prototype.view = function() {
    return [
        m.component(this.get('ui.component.sidebar')),
        m.component(this.get('ui.component.statusbar')),
        m.component(this.get('ui.component.toolbar'))
    ];
};

MainUI.prototype.unload = function() {
    var ui = this.instance();
    this.off('shots', ui._retrieveShots.bind(ui));
};

MainUI.prototype._retrieveShots = function(event, err, res) {
    console.log(err, res);
};

App.UI.MainUI = MainUI;

