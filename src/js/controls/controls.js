// @file controls.js
class Controls {

    constructor() {
        this.controlsDepot = new ControlsDepot('KandyAPITrackerPreferences');
    }
    next(evt) {
        this.controlsTab.activateNext();
    }
    render() {
        Effect.show(this.tr.token);
        Effect.show(this.tr.channel);
        Effect.show(this.tr.websocket);

        Preferences.enableSMS ? Effect.show(this.tr.outboundSms) : Effect.hide(this.tr.outboundSms);

        Preferences.enableChat ? Effect.show(this.tr.subscription) : Effect.hide(this.tr.subscription);
        Preferences.enableChat ? Effect.show(this.tr.chat) : Effect.hide(this.tr.chat);

        Preferences.enablePresence ? Effect.show(this.tr.callPresence) : Effect.hide(this.tr.callPresence);
        Preferences.enablePresence ? Effect.show(this.tr.callPresenceListSubscriptions) : Effect.hide(this.tr.callPresenceListSubscriptions);
        Preferences.enablePresence ? Effect.show(this.tr.updateOwnStatus) : Effect.hide(this.tr.updateOwnStatus);
        Preferences.enablePresence ? Effect.show(this.tr.watchUserStatus) : Effect.hide(this.tr.watchUserStatus);
        Preferences.enablePresence ? Effect.show(this.tr.adhocPresenceList) : Effect.hide(this.tr.adhocPresenceList);

        Preferences.enableAddressBook ? Effect.show(this.tr.contactStatus) : Effect.hide(this.tr.contactStatus);
        Preferences.enableAddressBook ? Effect.show(this.tr.searchContact) : Effect.hide(this.tr.searchContact);
        Preferences.enableAddressBook ? Effect.show(this.tr.updateContact) : Effect.hide(this.tr.updateContact);

        Preferences.enableVoice ? Effect.show(this.tr.webrtcSubscription) : Effect.hide(this.tr.webrtcSubscription);
        Preferences.enableVoice ? Effect.show(this.tr.webrtcVoiceCall) : Effect.hide(this.tr.webrtcVoiceCall);
        Preferences.enableVoice ? Effect.show(this.tr.webrtcEndCall) : Effect.hide(this.tr.webrtcEndCall);
        Preferences.enableVoice ? Effect.show(this.tr.webrtcAnswerCall) : Effect.hide(this.tr.webrtcAnswerCall);
        Preferences.enableVoice ? Effect.show(this.tr.webrtcHoldCall) : Effect.hide(this.tr.webrtcHoldCall);
    }
    save(evt) {
        Preferences.enableSMS = !!this.enableSMS.checked;
        Preferences.enableChat = !!this.enableChat.checked;
        Preferences.enablePresence = !!this.enablePresence.checked;
        Preferences.enableAddressBook = !!this.enableAddressBook.checked;
        Preferences.enableVoice = !!this.enableVoice.checked;

        Preferences.baseUrl = this.baseUrl.value;

        Preferences.privateKey = this.privateKey.value;
        Preferences.privateSecret = this.privateSecret.value;

        Preferences.projectName = this.projectName.value;
        Preferences.username = this.username.value;
        Preferences.password = this.password.value;

        Preferences.smsText = this.smsText.value;
        Preferences.senderNumber = this.senderNumber.value;
        Preferences.receiverNumber = this.receiverNumber.value;
        Preferences.chatText = this.chatText.value;
        Preferences.chatReceiverId = this.chatReceiverId.value;
        Preferences.setStatusPresence = this.setStatusPresence.value;
        Preferences.presentityUserId = this.presentityUserId.value;
        Preferences.primaryContact = this.primaryContact.value;
        Preferences.firstName = this.firstName.value;
        Preferences.lastName = this.lastName.value;
        Preferences.emailAddress = this.emailAddress.value;
        Preferences.homePhoneNumber = this.homePhoneNumber.value;
        Preferences.businessPhoneNumber = this.businessPhoneNumber.value;
        Preferences.buddy = this.buddy.value;
        Preferences.contactId = this.contactId.value;
        Preferences.searchFirstName = this.searchFirstName.value;
        Preferences.callToUser = this.callToUser.value;

        Preferences.smsVerificationNumber = this.smsVerificationNumber.value;
        Preferences.emailVerificationId = this.emailVerificationId.value;

        this.controlsDepot.save();
        this.render();
    }
    onDefaultState() {
        this.enableSMS.checked = Preferences.enableSMS;
        this.enableChat.checked = Preferences.enableChat;
        this.enablePresence.checked = Preferences.enablePresence;
        this.enableAddressBook.checked = Preferences.enableAddressBook;
        this.enableVoice.checked = Preferences.enableVoice;

        this.baseUrl.value = Preferences.baseUrl;

        this.projectName.value = Preferences.projectName;
        this.username.value = Preferences.username;
        this.password.value = Preferences.password;

        this.privateSecret.value = Preferences.privateSecret;
        this.privateKey.value = Preferences.privateKey;

        this.smsText.value = Preferences.smsText;
        this.senderNumber.value = Preferences.senderNumber;
        this.receiverNumber.value = Preferences.receiverNumber;
        this.chatText.value = Preferences.chatText;
        this.chatReceiverId.value = Preferences.chatReceiverId;
        this.setStatusPresence.value = Preferences.setStatusPresence;
        this.presentityUserId.value = Preferences.presentityUserId;
        this.primaryContact.value = Preferences.primaryContact;
        this.firstName.value = Preferences.firstName;
        this.lastName.value = Preferences.lastName;
        this.emailAddress.value = Preferences.emailAddress;
        this.homePhoneNumber.value = Preferences.homePhoneNumber;
        this.businessPhoneNumber.value = Preferences.businessPhoneNumber;
        this.buddy.value = Preferences.buddy;
        this.contactId.value = Preferences.contactId;
        this.searchFirstName.value = Preferences.searchFirstName;
        this.callToUser.value = Preferences.callToUser;

        this.smsVerificationNumber.value = Preferences.smsVerificationNumber;
        this.emailVerificationId.value = Preferences.emailVerificationId;

        this.render();
    }
    defaultState() {
        this.controlsDepot.onLoad = this.onDefaultState.bind(this);
        this.controlsDepot.load();
        this.showPasswordGrant();
    }
    attachEvents() {
        this.activateNext.addEventListener('click', (evt) => this.next(evt));
        this.savePreference.addEventListener('click', (evt) => this.save(evt));
        this.authWays.radioPasswordGrant.addEventListener('click', (evt) => this.showPasswordGrant(evt));
        this.authWays.radioClientCredentials.addEventListener('click', (evt) => this.showClientCredentials(evt));
    }
    showPasswordGrant() {
        Preferences.passwordGrant = true;
        Effect.hide(this.authWays.panelClientCredentials);
        Effect.show(this.authWays.panelPasswordGrant);
    }
    showClientCredentials() {
        Preferences.passwordGrant = false;
        Effect.show(this.authWays.panelClientCredentials);
        Effect.hide(this.authWays.panelPasswordGrant);
    }
    initialize() {
        this.controlsTab = new ControlsTab('pc-tabs');
        this.controlsMenu = new ControlsMenu('pc-menu');

        this.tr = {};
        this.tr.token = document.getElementById('token');
        this.tr.channel = document.getElementById('channel');
        this.tr.websocket = document.getElementById('websocket');
        this.tr.outboundSms = document.getElementById('outboundsms');
        this.tr.subscription = document.getElementById('subscription');
        this.tr.chat = document.getElementById('chat');
        this.tr.callPresence = document.getElementById('callpresence');
        this.tr.callPresenceListSubscriptions = document.getElementById('callpresencelistsubscriptions');
        this.tr.updateOwnStatus = document.getElementById('updateownstatus');
        this.tr.watchUserStatus = document.getElementById('watchuserstatus');
        this.tr.adhocPresenceList = document.getElementById('adhocpresencelist');
        this.tr.contactStatus = document.getElementById('contactstatus');
        this.tr.searchContact = document.getElementById('searchcontact');
        this.tr.updateContact = document.getElementById('updatecontact');
        this.tr.webrtcSubscription = document.getElementById('webrtcsubscription');
        this.tr.webrtcVoiceCall = document.getElementById('webrtcvoicecall');
        this.tr.webrtcEndCall = document.getElementById('webrtcendcall');
        this.tr.webrtcAnswerCall = document.getElementById('webrtcanswercall');
        this.tr.webrtcHoldCall = document.getElementById('webrtcholdcall');

        this.enableSMS = document.getElementById('enablesms');
        this.enableChat = document.getElementById('enablechat');
        this.enablePresence = document.getElementById('enablepresence');
        this.enableAddressBook = document.getElementById('enableaddressbook');
        this.enableVoice = document.getElementById('enablevoice');

        this.baseUrl = document.getElementById('baseurl');

        this.privateKey = document.getElementById('privatekey');
        this.privateSecret = document.getElementById('privatesecret');

        this.projectName = document.getElementById('projectname');
        this.username = document.getElementById('username');
        this.password = document.getElementById('password');

        this.smsText = document.getElementById('smstext');
        this.senderNumber = document.getElementById('sendernumber');
        this.receiverNumber = document.getElementById('receivernumber');
        this.chatText = document.getElementById('chattext');
        this.chatReceiverId = document.getElementById('chatreceiverid');
        this.setStatusPresence = document.getElementById('setstatuspresence');
        this.presentityUserId = document.getElementById('presentityuserid');
        this.primaryContact = document.getElementById('primarycontact');
        this.firstName = document.getElementById('firstname');
        this.lastName = document.getElementById('lastname');
        this.emailAddress = document.getElementById('emailaddress');
        this.homePhoneNumber = document.getElementById('homephonenumber');
        this.businessPhoneNumber = document.getElementById('businessphonenumber');
        this.buddy = document.getElementById('buddy');
        this.contactId = document.getElementById('contactid');
        this.searchFirstName = document.getElementById('searchfirstname');
        this.callToUser = document.getElementById('calltouser');
        this.smsVerificationNumber = document.getElementById('smsverificationnumber');
        this.emailVerificationId = document.getElementById('emailverificationid');

        this.activateNext = document.getElementById('activatenext');
        this.savePreference = document.getElementById('savepreference');

        this.authWays = {};
        this.authWays.radioPasswordGrant = document.getElementById('authwaysradiopasswordgrant');
        this.authWays.radioClientCredentials = document.getElementById('authwaysradioclientcredentials');
        this.authWays.panelPasswordGrant = document.getElementById('authwayspanelpasswordgrant');
        this.authWays.panelClientCredentials = document.getElementById('authwayspanelclientcredentials');

        this.attachEvents();
        this.defaultState();
    }

}