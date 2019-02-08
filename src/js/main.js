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

    var sdpGenerate = new SdpGenerate();
    sdpGenerate.initialize();
    //sdpGenerate.startStream();

    var voiceCall = new VoiceCall();
    var endCall = new EndCall();
    var answerCall = new AnswerCall();
    var holdCall = new HoldCall();

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
        contacts.destroy();
        searchContact.destroy();
        updateContact.destroy();
        webrtcSubscription.destroy();
        voiceCall.destroy();
        endCall.destroy();
        answerCall.destroy();

        holdCall.proceedTo = function (data) {
            console.log('Hold Call Status:' + JSON.stringify(data));
            appBar.abortMonitor(); 
        }

        holdCall.skipTo = function(){
            console.log('Hold Call skipped');
            appBar.abortMonitor();
        }

        answerCall.proceedTo = function (data) {
            console.log('End Call Status:' + JSON.stringify(data));
            let resourceUrl = voiceCall.getCallResponse.wrtcsSession.resourceURL;
            let sdp = sdpGenerate.sdpData;
            let url = 'https://' + Preferences.baseUrl;
            (Preferences.toMonitor && Preferences.enableVoice) ? holdCall.initialize(url,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token, resourceUrl,sdp
            ): appBar.abortMonitor();
        }

        answerCall.skipTo = function(){
            console.log('Answer Call skipped');
            appBar.abortMonitor();
        }

        endCall.proceedTo = function (data) {
            console.log('End Call Status:' + JSON.stringify(data));
            let resourceUrl = voiceCall.getCallResponse.wrtcsSession.resourceURL;
            let sdp = voiceCall.getCallResponse.wrtcsSession.offer.sdp;
            let url = 'https://' + Preferences.baseUrl;
            (Preferences.toMonitor && Preferences.enableVoice) ? answerCall.initialize(url,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token, resourceUrl,sdp
            ): appBar.abortMonitor();
        }

        endCall.skipTo = function(){
            console.log('End Call skipped');
            appBar.abortMonitor();
        }

        voiceCall.proceedTo = function (data) {
            console.log('VoiceCallStatus:',data);
            let resourceUrl = data.wrtcsSession.resourceURL;
            let url = 'https://' + Preferences.baseUrl;
            (Preferences.toMonitor && Preferences.enableVoice) ? endCall.initialize(url,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token, resourceUrl
            ): appBar.abortMonitor();
        }
        voiceCall.skipTo = function () {
            console.log('voiceCall skipped');
            appBar.abortMonitor();
        }

        webrtcSubscription.proceedTo = function (data) {
            console.log('webrtcSubscription:', data);
            (Preferences.toMonitor && Preferences.enableVoice) ? voiceCall.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,
                userChannel.channel.notificationChannel.callbackURL,
                sdpGenerate.sdpData
            ): appBar.abortMonitor();
        };
        webrtcSubscription.skipTo = function () {
            console.log('webrtcSubscription: skipped');
            (Preferences.toMonitor && Preferences.enableVoice) ? voiceCall.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,
                userChannel.channel.notificationChannel.callbackURL,
                sdpGenerate.sdpData
            ): appBar.abortMonitor();
        };

        updateContact.proceedTo = function (data) {
            console.log('updateContact:', data);
            (Preferences.toMonitor) ? webrtcSubscription.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,
                userChannel.channel.notificationChannel.callbackURL
            ): appBar.abortMonitor();
        };
        updateContact.skipTo = function () {
            console.log('updateContact, skipped');
            (Preferences.toMonitor) ? webrtcSubscription.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,
                userChannel.channel.notificationChannel.callbackURL
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
                Preferences.contactId
            ): appBar.abortMonitor();
        };

        contacts.proceedTo = function (data) {
            console.log('contacts:', data);
            (Preferences.toMonitor) ? searchContact.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token, Preferences.searchfirstname
            ): appBar.abortMonitor();
        };

        contacts.skipTo = function () {
            console.log('contacts: skipped');
            (Preferences.toMonitor) ? searchContact.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token, Preferences.searchfirstname
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
                userToken.tokenData.access_token, Preferences.presentityUserId
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
                callPresence.connectorCode, Preferences.presentityUserId
            ): appBar.abortMonitor();
        };

        callPresenceListSubscriptions.proceedTo = function (data) {
            console.log('callPresenceListSubscriptions:', data);
            (Preferences.toMonitor) ? updateOwnStatus.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token, Preferences.setstatuspresence
            ): appBar.abortMonitor();
        };
        callPresenceListSubscriptions.skipTo = function () {
            console.log('callPresenceListSubscriptions, skipped');
            initiateAddressBook(contacts, cpaasUrl, userToken, appBar)
        };
        callPresence.skipTo = function (data) {
            console.log('callPresence:', "skipped");
            initiateAddressBook(contacts, cpaasUrl, userToken, appBar)
        };
        callPresence.proceedTo = function (data) {
            console.log('callPresence:', data);
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
                userToken.tokenData.access_token, Preferences.chatreceiverid, Preferences.chattext
            ): appBar.abortMonitor();

        };
        callSubscription.skipTo = function () {
            console.log('callSubscription: skipped');
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
        webSocketConnection.proceedTo = function (data) {
            console.log('webSocketConnection:', data);
            initiateSMS(outBoundSMS, userToken, cpaasUrl, appBar, callSubscription, callPresence, contacts, userChannel);
        };
        userChannel.proceedTo = function (data) {
            console.log('userChannel:', data);
            (Preferences.toMonitor) ? webSocketConnection.initialize(Preferences.baseUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token,
                data.notificationChannel.callbackURL
            ): appBar.abortMonitor();
        };
        userToken.proceedTo = function (data) {
            console.log('userToken:', data);
            (Preferences.toMonitor) ? userChannel.initialize(cpaasUrl,
                data.id_token,
                data.access_token
            ): appBar.abortMonitor();
        };
        (Preferences.toMonitor) ? userToken.initialize(cpaasUrl, Preferences.projectName, Preferences.username, Preferences.password): appBar.abortMonitor();
    }
    appBar.initialize();
});

function initiateSMS(outBoundSMS, userToken, cpaasUrl, appBar, callSubscription, callPresence, contacts, userChannel) {
    if (Preferences.enableSMS) {
        (Preferences.toMonitor) ? outBoundSMS.initialize(cpaasUrl,
            userToken.tokenData.id_token,
            userToken.tokenData.access_token,
            Preferences.smstext, Preferences.receivernumber, Preferences.sendernumber
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

    function openWebsocket(access_token) {
        console.log("Websocket options",options);
        let webSocketUrl = "wss://"+Preferences.baseUrl+"/cpaas/notificationchannel/v1/"+access_token;
      // Create the websocket.
      let ws = new WebSocket(`wss://${options.server}:${options.port}${options.url}` + (0, _utils.toQueryString)(options.params));
    console.log("Websocket initilization",ws);
      // Use a promise to wait for the first message from the websocket.
      // This indicates whether the WS opened successfully or not.
      let validateWS = new _promise2.default((resolve, reject) => {
        const onOpen = function () {
          ws.onopen = null;
          ws.onerror = null;
          resolve(ws);
        };
        const onError = function () {
          ws.onopen = null;
          ws.onerror = null;
    
          // TODO: Fix this?
          /* eslint-disable-next-line prefer-promise-reject-errors */
          reject({
            error: true,
            message: 'Could not connect to websocket. Received error on open.'
          });
        };
        ws.onopen = onOpen;
        ws.onerror = onError;
      });
      return validateWS;
    }
}