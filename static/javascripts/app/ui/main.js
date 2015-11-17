
var MainUI = function MainUI(options) {
    'use strict';
    return App.Common.View.call(this, options);
};

MainUI.prototype = Object.create(App.Common.View.prototype);
MainUI.prototype.constructor = MainUI;

MainUI.prototype.controller = function() {
    var ui = this.instance();
    if (!this.get('initialized')) {
        // set item status as initialized
        this.set('initialized', true);
        // link stylesheet
        this.stylesheet(['core/application.css', 'ui/main.css']);
        // create and modifiy element
        this.set('ui.component.sidebar', new App.Components.Sidebar({
            'name': 'sidebar'
        }));
        this.set('ui.component.statusbar', new App.Components.Statusbar({
            'name': 'statusbar'
        }));
        this.set('ui.component.toolbar', new App.Components.Toolbar({
            'name': 'toolbar'
        }));
        this.set('ui.component.gallery', new App.Components.Grid({
            items: []
        }));
        // listen to main process events
        this.register('shots', ui._retrieveShots.bind(ui));
    }
};

MainUI.prototype.view = function() {
    return [
        m.component(this.get('ui.component.sidebar')),
        m.component(this.get('ui.component.statusbar')),
        m.component(this.get('ui.component.toolbar')),
        m.component(this.get('ui.component.gallery'))
    ];
};

MainUI.prototype.unload = function() {
    // get ui "MainUI" instance
    var ui = this.instance();
    // remove listeners from render process
    this.unregister('shots', ui._retrieveShots.bind(ui));
    // default action for unload
    App.Common.View.prototype.unload.call(this);
};

MainUI.prototype._retrieveShots = function(event, err, res) {
    if (err) {
        this.log(err);
    } else {
        this.get('ui.component.gallery').append('items', res.map(function(item) {
            return new App.Components.GridItem(item);
        }));
    }
};

App.UI.MainUI = MainUI;

