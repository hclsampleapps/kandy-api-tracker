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
    var callPresenceListSubscriptions = new CallPresenceListSubscriptions(cpaasUrl);
    var updateOwnStatus = new UpdateOwnStatus(cpaasUrl);
    var watchUserStatus = new WatchUserStatus(cpaasUrl);
    var contacts = new Contacts(cpaasUrl);

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
        callPresenceListSubscriptions.destroy();
        updateOwnStatus.destroy();
        watchUserStatus.destroy();
        contacts.destroy();
        contacts.proceedTo = function (data) {
            console.log('contacts:', data);
        };
        watchUserStatus.skipTo = function () {
            console.log('watchUserStatus, skipped');
           (Preferences.toMonitor) ? contacts.initialize(
                userToken.tokenData.id_token,
                userToken.tokenData.access_token) : appBar.abortMonitor();
        };
        watchUserStatus.proceedTo = function (data) {
            console.log('watchUserStatus:', data);
            (Preferences.toMonitor) ? contacts.initialize(
                userToken.tokenData.id_token,
                userToken.tokenData.access_token) : appBar.abortMonitor();

        };
         updateOwnStatus.skipTo = function () {
            console.log('updateOwnStatus, skipped');
           (Preferences.toMonitor) ? contacts.initialize(
                userToken.tokenData.id_token,
                userToken.tokenData.access_token) : appBar.abortMonitor();
        };
        updateOwnStatus.proceedTo = function (data) {
            console.log('updateOwnStatus:', data);
            (Preferences.toMonitor) ? watchUserStatus.initialize(
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,
                callPresence.connectorCode
            ) : appBar.abortMonitor();
        };

        callPresenceListSubscriptions.proceedTo = function (data) {
            console.log('callPresenceListSubscriptions:', data);
            (Preferences.toMonitor) ? updateOwnStatus.initialize(
                userToken.tokenData.id_token,
                userToken.tokenData.access_token
            ) : appBar.abortMonitor();
        };
        callPresenceListSubscriptions.skipTo = function () {
            console.log('callPresenceListSubscriptions, skipped');
           (Preferences.toMonitor) ? contacts.initialize(
                userToken.tokenData.id_token,
                userToken.tokenData.access_token) : appBar.abortMonitor();
        };
        callPresence.skipTo = function (data) {
            console.log('callPresence:', "skipped");
            (Preferences.toMonitor) ? contacts.initialize(
                userToken.tokenData.id_token,
                userToken.tokenData.access_token) : appBar.abortMonitor();
        };
        callPresence.proceedTo = function (data) {
            console.log('callPresence:', data);
            (Preferences.toMonitor) ? callPresenceListSubscriptions.initialize(
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,
                userChannel.channel.notificationChannel.callbackURL,
                callPresence.connectorCode
            ) : appBar.abortMonitor();
        };

        sendMessage.skipTo = function () {
            console.log('sendMessage, skipped');
            (Preferences.toMonitor) ? callPresence.initialize(
                userToken.tokenData.id_token,
                userToken.tokenData.access_token
            ) : appBar.abortMonitor();
        };
        sendMessage.proceedTo = function (data) {
            console.log('sendMessage:', data);
            (Preferences.toMonitor) ? callPresence.initialize(
                userToken.tokenData.id_token,
                userToken.tokenData.access_token
            ) : appBar.abortMonitor();
        };

        callSubscription.proceedTo = function (data) {
            console.log('callSubscription:', data);
            (Preferences.toMonitor) ? sendMessage.initialize(
                userToken.tokenData.id_token,
                userToken.tokenData.access_token
            ) : appBar.abortMonitor();

        };
        callSubscription.skipTo = function () {
            console.log('callSubscription: skipped');
            (Preferences.toMonitor) ? callPresence.initialize(
                userToken.tokenData.id_token,
                userToken.tokenData.access_token
            ) : appBar.abortMonitor();
        };
        outBoundSMS.proceedTo = function (data) {
            console.log('outBoundSMS:', data);
            (Preferences.toMonitor) ? callSubscription.initialize(
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,
                userChannel.channel.notificationChannel.callbackURL
            ) : appBar.abortMonitor();
        };
        outBoundSMS.skipTo = function (data) {
            console.log('outBoundSMS, skipped');
            (Preferences.toMonitor) ? callSubscription.initialize(
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,
                userChannel.channel.notificationChannel.callbackURL
            ) : appBar.abortMonitor();
        };
        webSocketConnection.proceedTo = function (data) {
            console.log('webSocketConnection:', data);
            (Preferences.toMonitor) ? outBoundSMS.initialize(
                userToken.tokenData.id_token,
                userToken.tokenData.access_token
            ) : appBar.abortMonitor();
        };
        userChannel.proceedTo = function (data) {
            console.log('userChannel:', data);
            (Preferences.toMonitor) ? webSocketConnection.initialize(
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,
                data.notificationChannel.callbackURL
            ) : appBar.abortMonitor();
        };
        userToken.proceedTo = function (data) {
            console.log('userToken:', data);
            (Preferences.toMonitor) ? userChannel.initialize(
                data.id_token,
                data.access_token
            ) : appBar.abortMonitor();
        };
        (Preferences.toMonitor) ? userToken.initialize() : appBar.abortMonitor();
    }
    appBar.initialize();
});