// @file main.js
whenReady(function() {
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
    var webrtcSubscriptionStatus = new WebrtcSubscription();
    var smsSend = new SmsSend();
    var smsVerify = new SmsVerify();
    var emailSend = new EmailSend();
    var emailVerify = new EmailVerify();

    var controls = new Controls();
    controls.initialize();

    var appBar = new AppBar();
    appBar.execute = function() {
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
        webrtcSubscriptionStatus.destroy();
        smsSend.destroy();
        smsVerify.destroy();
        emailSend.destroy();
        emailVerify.destroy();

        emailVerify.proceedTo = function (data) {
            console.log('email verify Status:' + JSON.stringify(data));
            appBar.abortMonitor();
        }

        emailVerify.skipTo = function(){
            console.log('email verify skipped');
            appBar.abortMonitor();
        }

        emailSend.proceedTo = function (data) {
            console.log('email send Status:' + JSON.stringify(data));
            let url = 'https://' + Preferences.baseUrl + data.code.resourceURL;
            (Preferences.toMonitor) ? emailVerify.initialize(url,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token
            ): appBar.abortMonitor();
        }

        emailSend.skipTo = function(){
            console.log('email send skipped');
            appBar.abortMonitor();
        }

        smsVerify.proceedTo = function (data) {
            console.log('Sms verify Status:' + JSON.stringify(data));
            (Preferences.toMonitor) ? emailSend.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token
            ): appBar.abortMonitor();
        }

        smsVerify.skipTo = function(){
            console.log('Sms verify skipped');
            appBar.abortMonitor();
        }

        smsSend.proceedTo = function (data) {
            console.log('Sms send Status:' + JSON.stringify(data));
            let url = 'https://' + Preferences.baseUrl+data.code.resourceURL;
            (Preferences.toMonitor) ? smsVerify.initialize(url,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token
            ): appBar.abortMonitor();
        }

        smsSend.skipTo = function(){
            console.log('Sms send skipped');
            appBar.abortMonitor();
        }

        webrtcSubscriptionStatus.proceedTo = function(data) {
            console.log('webrtcSubscriptionStatus:', data);
            (Preferences.toMonitor) ? smsSend.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token
            ): appBar.abortMonitor();
        };
        webrtcSubscriptionStatus.skipTo = function () {
            console.log('webrtcSubscription: skipped');
            (Preferences.toMonitor) ? smsSend.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token
            ): appBar.abortMonitor();
        };
        updatecontact.proceedTo = function(data) {
            console.log('updatecontact:', data);
            (Preferences.toMonitor) ? webrtcSubscriptionStatus.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,
                userChannel.channel.notificationChannel.callbackURL
            ): appBar.abortMonitor();
            
        };
        updatecontact.skipTo = function() {
            console.log('updatecontact:skipped');
            (Preferences.toMonitor) ? webrtcSubscriptionStatus.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,
                userChannel.channel.notificationChannel.callbackURL
            ): appBar.abortMonitor();
            
        };
        
        searchcontacts.proceedTo = function(data) {
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
            ): appBar.abortMonitor();
        };

        searchcontacts.skipTo = function() {
            console.log('searchcontacts:skipped');
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
            ): appBar.abortMonitor();
        };

        contacts.proceedTo = function(data) {
            console.log('contacts:', data);
            (Preferences.toMonitor) ? searchcontacts.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token, Preferences.searchFirstName
            ): appBar.abortMonitor();
        };
        contacts.skipTo = function() {
            console.log('contacts skipped');
            (Preferences.toMonitor) ? searchcontacts.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token, Preferences.searchFirstName
            ): appBar.abortMonitor();
        };
        adhocPresenceList.skipTo = function() {
            console.log('adhocPresenceList, skipped');
            initiateAddressBook(contacts, cpaasUrl, userToken, appBar);
        };
        adhocPresenceList.proceedTo = function(data) {
            console.log('adhocPresenceList:', data);
            initiateAddressBook(contacts, cpaasUrl, userToken, appBar);
        };
        watchUserStatus.skipTo = function() {
            console.log('watchUserStatus, skipped');
            initiateAddressBook(contacts, cpaasUrl, userToken, appBar);
        };
        watchUserStatus.proceedTo = function(data) {
            console.log('watchUserStatus:', data);
            (Preferences.toMonitor) ? adhocPresenceList.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token, Preferences.presentityUserId
            ): appBar.abortMonitor();
        };
        updateOwnStatus.skipTo = function() {
            console.log('updateOwnStatus, skipped');
            initiateAddressBook(contacts, cpaasUrl, userToken, appBar);
        };
        updateOwnStatus.proceedTo = function(data) {
            console.log('updateOwnStatus:', data);
            (Preferences.toMonitor) ? watchUserStatus.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,
                callPresence.connectorCode, Preferences.presentityUserId
            ): appBar.abortMonitor();
        };

        callPresenceListSubscriptions.proceedTo = function(data) {
            console.log('callPresenceListSubscriptions:', data);
            (Preferences.toMonitor) ? updateOwnStatus.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token, Preferences.setStatusPresence
            ): appBar.abortMonitor();
        };
        callPresenceListSubscriptions.skipTo = function() {
            console.log('callPresenceListSubscriptions, skipped');
            initiateAddressBook(contacts, cpaasUrl, userToken, appBar)
        };
        callPresence.skipTo = function(data) {
            console.log('callPresence:', "skipped");
            initiateAddressBook(contacts, cpaasUrl, userToken, appBar)
        };
        callPresence.proceedTo = function(data) {
            console.log('callPresence:', data);
            (Preferences.toMonitor) ? callPresenceListSubscriptions.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,
                userChannel.channel.notificationChannel.callbackURL,
                callPresence.connectorCode
            ): appBar.abortMonitor();
        };

        sendMessage.skipTo = function() {
            console.log('sendMessage, skipped');
            initiatePresence(callPresence, cpaasUrl, userToken, appBar, contacts);
        };
        sendMessage.proceedTo = function(data) {
            console.log('sendMessage:', data);
            initiatePresence(callPresence, cpaasUrl, userToken, appBar, contacts);
        };

        callSubscription.proceedTo = function(data) {
            console.log('callSubscription:', data);
            (Preferences.toMonitor) ? sendMessage.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token, Preferences.chatReceiverId, Preferences.chatText
            ): appBar.abortMonitor();

        };
        callSubscription.skipTo = function() {
            console.log('callSubscription: skipped');
            initiatePresence(callPresence, cpaasUrl, userToken, appBar, contacts);
        };
        outBoundSMS.proceedTo = function(data) {
            console.log('outBoundSMS:', data);
            initiateChat(callSubscription, cpaasUrl, userToken, appBar, callPresence, contacts, userChannel);
        };
        outBoundSMS.skipTo = function(data) {
            console.log('outBoundSMS, skipped');
            initiateChat(callSubscription, cpaasUrl, userToken, appBar, callPresence, contacts, userChannel);
        };
        webSocketConnection.proceedTo = function(data) {
            console.log('webSocketConnection:', data);
            initiateSMS(outBoundSMS, userToken, cpaasUrl, appBar, callSubscription, callPresence, contacts, userChannel);
        };
        userChannel.proceedTo = function(data) {
            console.log('userChannel:', data);
            (Preferences.toMonitor) ? webSocketConnection.initialize(Preferences.baseUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,
                data.notificationChannel.callbackURL
            ): appBar.abortMonitor();
        };
        userToken.proceedTo = function(data) {
            console.log('userToken:', data);
            (Preferences.toMonitor) ? userChannel.initialize(cpaasUrl,
                data.id_token,
                data.access_token
            ): appBar.abortMonitor();
        };

        if (Preferences.passwordGrant) {
            (Preferences.toMonitor) ? userToken.initialize(cpaasUrl, 
                Preferences.projectName, 
                Preferences.username, 
                Preferences.password
            ): appBar.abortMonitor();
        } else {
            (Preferences.toMonitor) ? userToken.initializeSecret(cpaasUrl, 
                Preferences.privateKey, 
                Preferences.privateSecret
            ): appBar.abortMonitor();
        }
    }
    appBar.initialize();
});

function initiateSMS(outBoundSMS, userToken, cpaasUrl, appBar, callSubscription, callPresence, contacts, userChannel) {
    if (Preferences.enableSMS) {
        (Preferences.toMonitor) ? outBoundSMS.initialize(cpaasUrl,
            userToken.tokenData.id_token,
            userToken.tokenData.access_token,
            Preferences.smsText, Preferences.receiverNumber, Preferences.senderNumber
        ): appBar.abortMonitor();
    } else {
        initiateChat(callSubscription, cpaasUrl, userToken, appBar, callPresence, contacts, userChannel);
    }
}

function initiateChat(callSubscription, cpaasUrl, userToken, appBar, callPresence, contacts, userChannel) {
    if (Preferences.enableChat) {
        (Preferences.toMonitor) ? callSubscription.initialize(cpaasUrl,
            userToken.tokenData.id_token,
            userToken.tokenData.access_token,
            userChannel.channel.notificationChannel.callbackURL
        ): appBar.abortMonitor();
    } else {
        initiatePresence(callPresence, cpaasUrl, userToken, appBar, contacts);
    }
}

function initiatePresence(callPresence, cpaasUrl, userToken, appBar, contacts) {
    if (Preferences.enablePresence) {
        (Preferences.toMonitor) ? callPresence.initialize(cpaasUrl,
            userToken.tokenData.id_token,
            userToken.tokenData.access_token
        ): appBar.abortMonitor();
    } else {
        initiateAddressBook(contacts, cpaasUrl, userToken, appBar);
    }
}

function initiateAddressBook(contacts, cpaasUrl, userToken, appBar) {
    if (Preferences.enableAddressBook) {
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
        ): appBar.abortMonitor();
    } else {
        appBar.abortMonitor();
    }
}