// @file main.js
whenReady(function () {
    console.log('begin');

    var cpaasUrl = 'https://' + Preferences.baseUrl + '/cpaas/';

    var userToken = new UserToken(cpaasUrl, Preferences.projectName, Preferences.username, Preferences.password);
    var userChannel = new UserChannel(cpaasUrl);
    var webSocketConnection = new WebSocketConnection(Preferences.baseUrl);
    var outBoundSMS = new OutBoundSMS(cpaasUrl);
    var callSubscription = new CallSubscription(cpaasUrl);
    var sendMessage = new SendMessage(cpaasUrl);
    var callPresence = new CallPresence(cpaasUrl);
    var callpresenceListSubscriptions = new CallPresenceListSubscriptions(cpaasUrl);
    var updateOwnStatus = new UpdateOwnStatus(cpaasUrl);
    var watchUserStatus = new WatchUserStatus(cpaasUrl);
    var controls = new Controls();
    controls.initialize();

    var appBar = new AppBar();
    appBar.execute = function () {
        userToken.destroy();
        userChannel.destroy();
        webSocketConnection.destroy();
        outBoundSMS.destroy(); 
        callSubscription.destroy();
        sendMessage.destroy();
        callPresence.destroy();
        callpresenceListSubscriptions.destroy();
        updateOwnStatus.destroy();
        watchUserStatus.destroy();
        watchUserStatus.proceedTo = function (data) {
            console.log('watchUserStatus:', data);

        };
        updateOwnStatus.proceedTo = function (data) {
            console.log('updateOwnStatus:', data);
            var responsepresenceLists = callPresence.presence.presenceListCollection.presenceList[0].resourceURL;
            responsepresenceLists = responsepresenceLists.substr(responsepresenceLists.lastIndexOf('/') + 1);

            (Preferences.toMonitor) ? watchUserStatus.initialize
                (userToken.token.id_token, userToken.token.access_token, responsepresenceLists) : appBar.finishMonitor();
        };

        callpresenceListSubscriptions.proceedTo = function (data) {
            console.log('callpresenceListSubscriptions:', data);

            (Preferences.toMonitor) ? updateOwnStatus.initialize
                (userToken.token.id_token, userToken.token.access_token) : appBar.finishMonitor();
        };
        callPresence.proceedTo = function (data) {
            console.log('callPresence:', data);
            var responsepresenceLists = data.presenceListCollection.presenceList[0].resourceURL;
            responsepresenceLists = responsepresenceLists.substr(responsepresenceLists.lastIndexOf('/') + 1);
            (Preferences.toMonitor) ? callpresenceListSubscriptions.initialize
                (userToken.token.id_token, userToken.token.access_token,
                userChannel.channel.notificationChannel.callbackURL, responsepresenceLists) : appBar.finishMonitor();
        };
       
        sendMessage.proceedFailureTo = function () {
            console.log('sendMessage:', "failure");
           (Preferences.toMonitor) ? callPresence.initialize(userToken.token.id_token, userToken.token.access_token)
                : appBar.finishMonitor();
        };
         sendMessage.proceedTo = function (data) {
            console.log('sendMessage:', data);
            (Preferences.toMonitor) ? callPresence.initialize(userToken.token.id_token, userToken.token.access_token)
                : appBar.finishMonitor();
        };

        callSubscription.proceedTo = function (data) {
            console.log('callSubscription:', data);
            (Preferences.toMonitor) ? sendMessage.initialize(userToken.token.id_token, userToken.token.access_token) : appBar.finishMonitor();

        };
        callSubscription.proceedFailureTo = function () {
            console.log('callSubscription:', "failure");
           (Preferences.toMonitor) ? callPresence.initialize(userToken.token.id_token, userToken.token.access_token)
                : appBar.finishMonitor();
        };
        outBoundSMS.proceedTo = function (data) {
            console.log('outBoundSMS:', data);
            (Preferences.toMonitor) ? callSubscription.initialize(userToken.token.id_token, userToken.token.access_token,
                userChannel.channel.notificationChannel.callbackURL) : appBar.finishMonitor();
        };
         outBoundSMS.proceedFailureTo = function (data) {
            console.log('outBoundSMS:', data);
            (Preferences.toMonitor) ? callSubscription.initialize(userToken.token.id_token, userToken.token.access_token,
                userChannel.channel.notificationChannel.callbackURL) : appBar.finishMonitor();
        };
        webSocketConnection.proceedTo = function (data) {
            console.log('webSocketConnection:', data);
            (Preferences.toMonitor) ? outBoundSMS.initialize(userToken.token.id_token, userToken.token.access_token) : appBar.finishMonitor();
        };
        userChannel.proceedTo = function (data) {
            console.log('UserChannel:', data);
            (Preferences.toMonitor) ? webSocketConnection.initialize(userToken.token.id_token, userToken.token.access_token,
                data.notificationChannel.callbackURL) : appBar.finishMonitor();

        };
        userToken.proceedTo = function (data) {
            console.log('UserToken:', data);
            (Preferences.toMonitor) ? userChannel.initialize(data.id_token, data.access_token) : appBar.finishMonitor();
        };
        (Preferences.toMonitor) ? userToken.initialize() : appBar.finishMonitor();
    }
    appBar.initialize();
});