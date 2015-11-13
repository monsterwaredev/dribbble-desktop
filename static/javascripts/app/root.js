
(function() {

    'use strict';

    this.App = {
        Attributes: {},
        Common: {},
        Components: {},
        UI: {},
        Utility: {}
    };

    this.App.Utility.set = function(key, value) {
        this.App.Attributes[key] = value;
    };

    this.App.Utility.get = function(key) {
        return this.App.Attributes[key];
    };

}).call(this || window);

