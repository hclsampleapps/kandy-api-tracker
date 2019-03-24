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
    var searchContact = new SearchContact();
    var updateContact = new UpdateContact();
    var webrtcSubscription = new WebrtcSubscription();
    var voiceCall = new VoiceCall();
    var endCall = new EndCall();
    var answerCall = new AnswerCall();
    var holdCall = new HoldCall();
    var smsSend = new SmsSend();
    var smsVerify = new SmsVerify();
    var emailSend = new EmailSend();
    var emailVerify = new EmailVerify();
    var websocketconnectionSecondUser = new WebSocketConnectionSecondUser();

    var sdpGenerate = new SdpGenerate();
    sdpGenerate.initialize();

    var controls = new Controls();
    controls.initialize();

    var appBar = new AppBar();
    appBar.startStream = function () {
        sdpGenerate.startStream();
    };
    appBar.stopStream = function () {
        sdpGenerate.stopStream();
    };

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
        contacts.destroy();;
        updateContact.destroy();
        webrtcSubscription.destroy();
        voiceCall.destroy();
        endCall.destroy();
        answerCall.destroy();
        smsSend.destroy();
        smsVerify.destroy();
        emailSend.destroy();
        emailVerify.destroy();
        websocketconnectionSecondUser.destroy();

        emailVerify.proceedTo = function (data) {
            console.log('emailVerify:', data);
            appBar.abortMonitor();
        };
        emailVerify.skipTo = function() {
            console.log('emailVerify, skipped');
            appBar.abortMonitor();
        };

        emailSend.proceedTo = function (data) {
            console.log('emailSend:', data);
            let url = 'https://' + Preferences.baseUrl + data.code.resourceURL;
            (Preferences.toMonitor) ? emailVerify.initialize(url,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token
            ): appBar.abortMonitor();
        };
        emailSend.skipTo = function() {
            console.log('emailSend, skipped');
            appBar.abortMonitor();
        };

        smsVerify.proceedTo = function (data) {
            console.log('smsVerify:', data);
            (Preferences.toMonitor) ? emailSend.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token
            ): appBar.abortMonitor();
        }
        smsVerify.skipTo = function() {
            console.log('smsVerify, skipped');
            appBar.abortMonitor();
        }

        smsSend.proceedTo = function (data) {
            console.log('smsSend:', data);
            let url = 'https://' + Preferences.baseUrl + data.code.resourceURL;
            (Preferences.toMonitor) ? smsVerify.initialize(url,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token
            ): appBar.abortMonitor();
        }
        smsSend.skipTo = function() {
            console.log('smsSend, skipped');
            appBar.abortMonitor();
        }

        holdCall.proceedTo = function (data) {
            console.log('holdCall:', data);
            (Preferences.toMonitor) ? smsSend.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token
            ): appBar.abortMonitor();
        }
        holdCall.skipTo = function() {
            console.log('holdCall, skipped');
            appBar.abortMonitor();
        }

        answerCall.proceedTo = function (data) {
            console.log('answerCall:', data);
            appBar.abortMonitor();
        }
        answerCall.skipTo = function() {
            console.log('answerCall, skipped');
            appBar.abortMonitor();
        }

        endCall.proceedTo = function (data) {
            console.log('endCall:', data);
            appBar.abortMonitor();
        }
        endCall.skipTo = function() {
            console.log('endCall, skipped');
            appBar.abortMonitor();
        }

        voiceCall.proceedTo = function (data) {
            console.log('VoiceCallStatus:', data);
            (Preferences.toMonitor) ? smsSend.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token
            ): appBar.abortMonitor();
        }
        voiceCall.skipTo = function () {
            console.log('voiceCall, skipped');
            (Preferences.toMonitor) ? smsSend.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token
            ): appBar.abortMonitor();
        }

        updateContact.proceedTo = function (data) {
            console.log('updateContact:', data);
            (Preferences.toMonitor) ? webrtcSubscription.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,
                userChannel.channel.notificationChannel.callbackURL,
                Preferences.userFirst
            ): appBar.abortMonitor();
        };
        updateContact.skipTo = function() {
            console.log('updateContact, skipped');
            (Preferences.toMonitor) ? webrtcSubscription.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,
                userChannel.channel.notificationChannel.callbackURL,
                Preferences.userFirst
            ): appBar.abortMonitor();
        };

        searchContact.proceedTo = function (data) {
            console.log('searchContact:', data);
            (Preferences.toMonitor) ? updateContact.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,
                Preferences.primaryContact,
                Preferences.firstName,
                Preferences.lastName,
                Preferences.emailAddress,
                Preferences.homePhoneNumber,
                Preferences.businessPhoneNumber,
                Preferences.buddy,
                contacts.contactData.contact.contactId
            ): appBar.abortMonitor();
        };
        searchContact.skipTo = function() {
            console.log('searchContact, skipped');
            (Preferences.toMonitor) ? updateContact.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,
                Preferences.primaryContact,
                Preferences.firstName,
                Preferences.lastName,
                Preferences.emailAddress,
                Preferences.homePhoneNumber,
                Preferences.businessPhoneNumber,
                Preferences.buddy,
                contacts.contactData.contact.contactId
            ): appBar.abortMonitor();
        };

        contacts.proceedTo = function (data) {
            console.log('contacts:', data);
            (Preferences.toMonitor) ? searchContact.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token, 
                Preferences.searchFirstName
            ): appBar.abortMonitor();
        };
        contacts.skipTo = function() {
            console.log('contacts, skipped');
            (Preferences.toMonitor) ? searchContact.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token, 
                Preferences.searchFirstName
            ): appBar.abortMonitor();
        };

        adhocPresenceList.skipTo = function () {
            console.log('adhocPresenceList, skipped');
            initiateAddressBook(contacts, cpaasUrl, userToken, appBar);
        };
        adhocPresenceList.proceedTo = function (data) {
            console.log('adhocPresenceList:', data);
            initiateAddressBook(contacts, cpaasUrl, userToken, appBar);
        };

        watchUserStatus.skipTo = function () {
            console.log('watchUserStatus, skipped');
            initiateAddressBook(contacts, cpaasUrl, userToken, appBar);
        };
        watchUserStatus.proceedTo = function (data) {
            console.log('watchUserStatus:', data);
            (Preferences.toMonitor) ? adhocPresenceList.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token, 
                Preferences.presentityUserId
            ): appBar.abortMonitor();
        };

        updateOwnStatus.skipTo = function () {
            console.log('updateOwnStatus, skipped');
            initiateAddressBook(contacts, cpaasUrl, userToken, appBar);
        };
        updateOwnStatus.proceedTo = function (data) {
            console.log('updateOwnStatus:', data);
            (Preferences.toMonitor) ? watchUserStatus.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,
                callPresence.connectorCode, 
                Preferences.presentityUserId
            ): appBar.abortMonitor();
        };

        callPresenceListSubscriptions.proceedTo = function (data) {
            console.log('callPresenceListSubscriptions:', data);
            (Preferences.toMonitor) ? updateOwnStatus.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token, 
                Preferences.setStatusPresence
            ): appBar.abortMonitor();
        };
        callPresenceListSubscriptions.skipTo = function () {
            console.log('callPresenceListSubscriptions, skipped');
            initiateAddressBook(contacts, cpaasUrl, userToken, appBar)
        };

        callPresence.skipTo = function(data) {
            console.log('callPresence, skipped');
            initiateAddressBook(contacts, cpaasUrl, userToken, appBar)
        };
        callPresence.proceedTo = function (data) {
            console.log('callPresence:', data);
            console.log('callPresence.connectorCode: ', callPresence.connectorCode);
            (Preferences.toMonitor) ? callPresenceListSubscriptions.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,
                userChannel.channel.notificationChannel.callbackURL,
                callPresence.connectorCode
            ): appBar.abortMonitor();
        };

        sendMessage.skipTo = function () {
            console.log('sendMessage, skipped');
            initiatePresence(callPresence, cpaasUrl, userToken, appBar, contacts);
        };
        sendMessage.proceedTo = function (data) {
            console.log('sendMessage:', data);
            initiatePresence(callPresence, cpaasUrl, userToken, appBar, contacts);
        };

        callSubscription.proceedTo = function (data) {
            console.log('callSubscription:', data);
            (Preferences.toMonitor) ? sendMessage.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token, 
                Preferences.chatReceiverId, 
                Preferences.chatText
            ): appBar.abortMonitor();

        };
        callSubscription.skipTo = function() {
            console.log('callSubscription, skipped');
            initiatePresence(callPresence, cpaasUrl, userToken, appBar, contacts);
        };

        outBoundSMS.proceedTo = function (data) {
            console.log('outBoundSMS:', data);
            initiateChat(callSubscription, cpaasUrl, userToken, appBar, callPresence, contacts, userChannel);
        };
        outBoundSMS.skipTo = function (data) {
            console.log('outBoundSMS, skipped');
            initiateChat(callSubscription, cpaasUrl, userToken, appBar, callPresence, contacts, userChannel);
        };

        websocketconnectionSecondUser.messageTo = function (data) {
            console.log('websocketconnectionSecondUser received message: ' + JSON.stringify(data));

            if (data.hasOwnProperty('wrtcsSessionInvitationNotification')) {

                let resourceUrl = data.wrtcsSessionInvitationNotification.link[0].href;
                let sdp = sdpGenerate.sdpData;
                let url = 'https://' + Preferences.baseUrl;
                (Preferences.toMonitor && Preferences.enableVoice) ? answerCall.initialize(url,
                    userToken.tokenDataSecondUser.id_token,
                    userToken.tokenDataSecondUser.access_token, resourceUrl, sdp
                ): appBar.abortMonitor();

            } else if (data.hasOwnProperty('wrtcsOfferNotification')) {

                let resourceUrl = data.wrtcsOfferNotification.link[0].href;
                let url = 'https://' + Preferences.baseUrl;
                (Preferences.toMonitor && Preferences.enableVoice) ? endCall.initialize(url,
                    userToken.tokenDataSecondUser.id_token,
                    userToken.tokenDataSecondUser.access_token, resourceUrl
                ): appBar.abortMonitor();

            } else {
                appBar.abortMonitor();
            }
        };

        websocketconnectionSecondUser.proceedTo = function (data) {
            console.log('websocketconnectionSecondUser:', data);
            appBar.closeWebsocketUser2 = function () {
                console.log('AppBar CloseSocketUser2:');
                websocketconnectionSecondUser.closeSocket();
            };
            (Preferences.toMonitor) ? webrtcSubscription.initialize(cpaasUrl,
                userToken.tokenDataSecondUser.id_token,
                userToken.tokenDataSecondUser.access_token,
                userChannel.channelSecondUser.notificationChannel.callbackURL
            ): appBar.abortMonitor();
        };

        webrtcSubscription.proceedTo = function (data, userType) {
            console.log('webrtcSubscription: ' + userType, data);
            if (userType == Preferences.userFirst) {
                (Preferences.toMonitor) ? userToken.initialize(cpaasUrl,
                    Preferences.projectNameSecondUser,
                    Preferences.usernameSecondUser,
                    Preferences.passwordSecondUser,
                    Preferences.userSecond
                ): appBar.abortMonitor();
            } else {
                (Preferences.toMonitor && Preferences.enableVoice) ? voiceCall.initialize(cpaasUrl,
                    userToken.tokenData.id_token,
                    userToken.tokenData.access_token,
                    userChannel.channel.notificationChannel.callbackURL,
                    sdpGenerate.sdpData
                ): appBar.abortMonitor();
            }
        };
        webrtcSubscription.skipTo = function () {
            console.log('webrtcSubscription, skipped');
            appBar.abortMonitor();
        };

        webSocketConnection.messageTo = function (data) {
            console.log('websocketconnection user 1 received message: ' + JSON.stringify(data));
            if (data.hasOwnProperty('wrtcsAcceptanceNotification')) {
                let resourceUrl = data.wrtcsAcceptanceNotification.link[0].href;
                console.log('websocketconnection user 1 resourceUrl: ' + resourceUrl);
                let sdp = sdpGenerate.sdpData;
                let url = 'https://' + Preferences.baseUrl;
                (Preferences.toMonitor && Preferences.enableVoice) ? holdCall.initialize(url,
                    userToken.tokenData.id_token,
                    userToken.tokenData.access_token, resourceUrl, sdp
                ): appBar.abortMonitor();
            }else if (data.hasOwnProperty('wrtcsEventNotification')) {
                    console.log("Ringing notification");
            }
        };

        webSocketConnection.proceedTo = function (data) {
            console.log('webSocketConnection: ', data);
            appBar.closeWebsocketUser1 = function () {
                webSocketConnection.closeSocket();
            };
            initiateSMS(outBoundSMS, userToken, cpaasUrl, appBar, callSubscription, callPresence, contacts, userChannel);
        };

        userChannel.proceedTo = function (data, userType) {
            console.log('userChannel: ' + userType, data);
            if (userType == Preferences.userFirst) {
                (Preferences.toMonitor) ? webSocketConnection.initialize(Preferences.baseUrl,
                    userToken.tokenData.id_token,
                    userToken.tokenData.access_token,
                    data.notificationChannel.callbackURL
                ): appBar.abortMonitor();
            } else {
                (Preferences.toMonitor) ? websocketconnectionSecondUser.initialize(Preferences.baseUrl,
                    userToken.tokenDataSecondUser.id_token,
                    userToken.tokenDataSecondUser.access_token,
                    data.notificationChannel.callbackURL
                ): appBar.abortMonitor();
            }
        };

        userToken.proceedTo = function (data, userType) {
            console.log('userToken: ' + userType, data);
            if (userType == Preferences.userFirst) {
                (Preferences.toMonitor) ? userChannel.initialize(cpaasUrl,
                    data.id_token,
                    data.access_token,
                    Preferences.userFirst
                ): appBar.abortMonitor();
            } else {
                (Preferences.toMonitor) ? userChannel.initialize(cpaasUrl,
                    data.id_token,
                    data.access_token,
                    Preferences.userSecond
                ): appBar.abortMonitor();
            }
        };

        if (Preferences.passwordGrant) {
            console.log("Preferences.userFirst " + Preferences.userFirst);
            (Preferences.toMonitor) ? userToken.initialize(cpaasUrl,
                Preferences.projectName,
                Preferences.username,
                Preferences.password,
                Preferences.userFirst
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
            Preferences.smsText, 
            Preferences.receiverNumber, 
            Preferences.senderNumber
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