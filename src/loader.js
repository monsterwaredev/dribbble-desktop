
// Electron application library
var app = require('app');

// Window class
var MainUI = require('./ui/main.js');

app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {
    // Create a window
    new MainUI();
});
