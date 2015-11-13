
var Sidebar = function Sidebar(options) {
    'use strict';
    App.Common.View.call(this, options);
    // Set debugging mode
    this.set('debugging', true);
    return this;
};

Sidebar.prototype = Object.create(App.Common.View.prototype);
Sidebar.prototype.constructor = Sidebar;

Sidebar.prototype.controller = function(opts) {
    // Patch component object
    this.component(opts);
    // Link stylesheet
    this.stylesheet(['components/sidebar.css']);
    // Create and modifiy element
    this.set('ui.component.newbutton', {
        el: new App.Components.Button,
        attributes: {
            icon : 'icon_add.svg',
            name : 'New Shot',
            style: {
                'padding': '0px',
                'margin' : '10px'
            },
            menu : [
                {
                    attributes: {
                        name: 'Bucket'
                    },
                    events: {
                        click: function(e) {
                        }
                    }
                }
            ]
        },
        events: {
            click: function(e) {
            }
        }
    });
};

Sidebar.prototype.view = function() {
    return m('nav', [
        m.component(this.get('ui.component.newbutton').el, this.get('ui.component.newbutton').attributes)
    ]);
};

App.Components.Sidebar = Sidebar;

