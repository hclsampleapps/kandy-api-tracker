// @file main.js
whenReady(function() {
    console.log('begin');

    var cpaasUrl = 'https://' + Preferences.baseUrl + '/cpaas/';

    var userToken = new UserToken(cpaasUrl, Preferences.projectName, Preferences.username, Preferences.password);
    var userChannel = new UserChannel(cpaasUrl);

    var controls = new Controls();
    controls.initialize();

    var appBar = new AppBar();
    appBar.execute = function() {
        userToken.destroy();
        userChannel.destroy();

        userChannel.proceedTo = function(data) {
            console.log('UserChannel:', data);
            appBar.finishMonitor();
        };
        userToken.proceedTo = function(data) {
            console.log('UserToken:', data);
            (Preferences.toMonitor) ? userChannel.initialize(data.id_token, data.access_token) : appBar.finishMonitor();
        };
        (Preferences.toMonitor) ? userToken.initialize() : appBar.finishMonitor();
    }
    appBar.initialize();
});