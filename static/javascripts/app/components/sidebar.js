
var Sidebar = function Sidebar(options) {
    'use strict';
    return App.Common.View.call(this, options);
};

Sidebar.prototype = Object.create(App.Common.View.prototype);
Sidebar.prototype.constructor = Sidebar;

Sidebar.prototype.controller = function(opts) {
    if (!this.get('initialized')) {
        // Set item status as initialized
        this.set('initialized', true);
        // Patch component object
        this.component(opts);
        // Link stylesheet
        this.stylesheet(['components/sidebar.css']);
        // Create and modifiy element
        this.set('ui.component.newbutton', new App.Components.Button({
            icon : 'icon_add.svg',
            name : 'New Shot',
            style: {
                'padding': '0px',
                'margin' : '10px'
            },
            menu: new App.Components.DropdownMenu({
                items: [
                    new App.Components.SubMenu({
                        name: 'New Bucket',
                        events: {
                            onclick: function(e) {
                                this.log('bucket');
                            }
                        }
                    }),
                    new App.Components.SubMenu({
                        name: 'New List',
                        events: {
                            onclick: function(e) {
                                this.log('list');
                            }
                        }
                    })
                ]
            }),
            events: {
                onclick: function(e) {
                    console.log(this);
                }
            }
        }));
        this.set('ui.component.filterinput', new App.Components.TextInput({
            placeholder: 'Filter buckets'
        }));
        this.set('ui.component.buckets', new App.Components.List({
            name: 'Buckets',
            items: [
                new App.Components.ListItem({
                    name: 'Logo'
                }),
                new App.Components.ListItem({
                    name: 'Drawings'
                }),
                new App.Components.ListItem({
                    name: 'Animations'
                }),
                new App.Components.ListItem({
                    name: 'Websites'
                })
            ],
            bullet: true
        }));
    }
};

Sidebar.prototype.view = function() {
    return m('nav', {
        config: this.instance().autoconfig.bind(this.instance()),
        id: this.id(),
        class: [
            'dribbble-component',
            'component-sidebar'
        ].join(' ')
    }, [
        m.component(this.get('ui.component.newbutton')),
        m.component(this.get('ui.component.filterinput')),
        m.component(this.get('ui.component.buckets'))
    ]);
};

App.Components.Sidebar = Sidebar;

