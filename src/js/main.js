// @file main.js


whenReady(function () {
    console.log('begin');

    
    var userToken = new UserToken();
    var userChannel = new UserChannel();
    var webSocketConnection = new WebSocketConnection();
    var outBoundSMS = new OutBoundSMS();
    var callSubscription = new CallSubscription();
    var sendMessage = new SendMessage();
    var callPresence = new CallPresence();
    var callPresenceListSubscriptions = new CallPresenceListSubscriptions();
    var updateOwnStatus = new UpdateOwnStatus();
    var watchUserStatus = new WatchUserStatus();
    var adhocPresenceList = new AdhocPresenceList();
    var contacts = new Contacts();
    var searchcontacts = new SearchContact();
    var updatecontact = new UpdateContact();

    var controls = new Controls();
    controls.initialize();

    var appBar = new AppBar();
    appBar.execute = function () {
        var cpaasUrl = 'https://' + Preferences.baseUrl + '/cpaas/';
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
        adhocPresenceList.destroy();
        contacts.destroy();
        searchcontacts.destroy();
        updatecontact.destroy();
        updatecontact.proceedTo = function (data) {
            console.log('updatecontact:', data);
            appBar.abortMonitor();
        };
        searchcontacts.proceedTo = function (data) {
            console.log('searchcontacts:', data);
            (Preferences.toMonitor) ? updatecontact.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,
                Preferences.primaryContact,
                Preferences.firstName,
                Preferences.lastName,
                Preferences.emailAddress,
                Preferences.homePhoneNumber,
                Preferences.businessPhoneNumber,
                Preferences.buddy,
                Preferences.contactId
            ) : appBar.abortMonitor();
        };
        contacts.proceedTo = function (data) {
            console.log('contacts:', data);
            (Preferences.toMonitor) ? searchcontacts.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,Preferences.searchfirstname
            ) : appBar.abortMonitor();
        };
        adhocPresenceList.skipTo = function () {
            console.log('adhocPresenceList, skipped');
            (Preferences.toMonitor) ? contacts.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,
                Preferences.primaryContact,
                Preferences.firstName,
                Preferences.lastName,
                Preferences.emailAddress,
                Preferences.homePhoneNumber,
                Preferences.businessPhoneNumber,
                Preferences.buddy,
                Preferences.contactId
            ) : appBar.abortMonitor();
        };
        adhocPresenceList.proceedTo = function (data) {
            console.log('adhocPresenceList:', data);
            (Preferences.toMonitor) ? contacts.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,
                Preferences.primaryContact,
                Preferences.firstName,
                Preferences.lastName,
                Preferences.emailAddress,
                Preferences.homePhoneNumber,
                Preferences.businessPhoneNumber,
                Preferences.buddy,
                Preferences.contactId
            ) : appBar.abortMonitor();

        };
        watchUserStatus.skipTo = function () {
            console.log('watchUserStatus, skipped');
            (Preferences.toMonitor) ? contacts.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,
                Preferences.primaryContact,
                Preferences.firstName,
                Preferences.lastName,
                Preferences.emailAddress,
                Preferences.homePhoneNumber,
                Preferences.businessPhoneNumber,
                Preferences.buddy,
                Preferences.contactId
            ) : appBar.abortMonitor();
        };
        watchUserStatus.proceedTo = function (data) {
            console.log('watchUserStatus:', data);
            (Preferences.toMonitor) ? adhocPresenceList.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token, Preferences.presentityUserId
            ) : appBar.abortMonitor();

        };
        updateOwnStatus.skipTo = function () {
            console.log('updateOwnStatus, skipped');
           (Preferences.toMonitor) ? contacts.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,
                Preferences.primaryContact,
                Preferences.firstName,
                Preferences.lastName,
                Preferences.emailAddress,
                Preferences.homePhoneNumber,
                Preferences.businessPhoneNumber,
                Preferences.buddy,
                Preferences.contactId
            ) : appBar.abortMonitor();
        };
        updateOwnStatus.proceedTo = function (data) {
            console.log('updateOwnStatus:', data);
            (Preferences.toMonitor) ? watchUserStatus.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,
                callPresence.connectorCode, Preferences.presentityUserId
            ) : appBar.abortMonitor();
        };

        callPresenceListSubscriptions.proceedTo = function (data) {
            console.log('callPresenceListSubscriptions:', data);
            (Preferences.toMonitor) ? updateOwnStatus.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token, Preferences.setstatuspresence
            ) : appBar.abortMonitor();
        };
        callPresenceListSubscriptions.skipTo = function () {
            console.log('callPresenceListSubscriptions, skipped');
           (Preferences.toMonitor) ? contacts.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,
                Preferences.primaryContact,
                Preferences.firstName,
                Preferences.lastName,
                Preferences.emailAddress,
                Preferences.homePhoneNumber,
                Preferences.businessPhoneNumber,
                Preferences.buddy,
                Preferences.contactId
            ) : appBar.abortMonitor();
        };
        callPresence.skipTo = function (data) {
            console.log('callPresence:', "skipped");
            (Preferences.toMonitor) ? contacts.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,
                Preferences.primaryContact,
                Preferences.firstName,
                Preferences.lastName,
                Preferences.emailAddress,
                Preferences.homePhoneNumber,
                Preferences.businessPhoneNumber,
                Preferences.buddy,
                Preferences.contactId
            ) : appBar.abortMonitor();
        };
        callPresence.proceedTo = function (data) {
            console.log('callPresence:', data);
            (Preferences.toMonitor) ? callPresenceListSubscriptions.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,
                userChannel.channel.notificationChannel.callbackURL,
                callPresence.connectorCode
            ) : appBar.abortMonitor();
        };

        sendMessage.skipTo = function () {
            console.log('sendMessage, skipped');
            (Preferences.toMonitor) ? callPresence.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token
            ) : appBar.abortMonitor();
        };
        sendMessage.proceedTo = function (data) {
            console.log('sendMessage:', data);
            (Preferences.toMonitor) ? callPresence.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token
            ) : appBar.abortMonitor();
        };

        callSubscription.proceedTo = function (data) {
            console.log('callSubscription:', data);
            (Preferences.toMonitor) ? sendMessage.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token, Preferences.chatreceiverid, Preferences.chattext
            ) : appBar.abortMonitor();

        };
        callSubscription.skipTo = function () {
            console.log('callSubscription: skipped');
            (Preferences.toMonitor) ? callPresence.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token
            ) : appBar.abortMonitor();
        };
        outBoundSMS.proceedTo = function (data) {
            console.log('outBoundSMS:', data);
            (Preferences.toMonitor) ? callSubscription.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,
                userChannel.channel.notificationChannel.callbackURL
            ) : appBar.abortMonitor();
        };
        outBoundSMS.skipTo = function (data) {
            console.log('outBoundSMS, skipped');
            (Preferences.toMonitor) ? callSubscription.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,
                userChannel.channel.notificationChannel.callbackURL
            ) : appBar.abortMonitor();
        };
        webSocketConnection.proceedTo = function (data) {
            console.log('webSocketConnection:', data);
            (Preferences.toMonitor) ? outBoundSMS.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,
                Preferences.smstext,Preferences.receivernumber,Preferences.sendernumber
            ) : appBar.abortMonitor();
        };
        userChannel.proceedTo = function (data) {
            console.log('userChannel:', data);
            (Preferences.toMonitor) ? webSocketConnection.initialize(Preferences.baseUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,
                data.notificationChannel.callbackURL
            ) : appBar.abortMonitor();
        };
        userToken.proceedTo = function (data) {
            console.log('userToken:', data);
            (Preferences.toMonitor) ? userChannel.initialize(cpaasUrl,
                data.id_token,
                data.access_token
            ) : appBar.abortMonitor();
        };
        (Preferences.toMonitor) ? userToken.initialize(cpaasUrl,Preferences.projectName, Preferences.username, Preferences.password) : appBar.abortMonitor();
    }
    appBar.initialize();
});