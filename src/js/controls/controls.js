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

        Preferences.enableSMS ? Effect.show(this.tr.outboundsms) : Effect.hide(this.tr.outboundsms);

        Preferences.enableChat ? Effect.show(this.tr.subscription) : Effect.hide(this.tr.subscription);
        Preferences.enableChat ? Effect.show(this.tr.chat) : Effect.hide(this.tr.chat);

        Preferences.enablePresence ? Effect.show(this.tr.callpresence) : Effect.hide(this.tr.callpresence);
        Preferences.enablePresence ? Effect.show(this.tr.callpresencelistsubscriptions) : Effect.hide(this.tr.callpresencelistsubscriptions);
        Preferences.enablePresence ? Effect.show(this.tr.updateownstatus) : Effect.hide(this.tr.updateownstatus);
        Preferences.enablePresence ? Effect.show(this.tr.watchuserstatus) : Effect.hide(this.tr.watchuserstatus);
        Preferences.enablePresence ? Effect.show(this.tr.adhocPresenceList) : Effect.hide(this.tr.adhocPresenceList);

        Preferences.enableAddressBook ? Effect.show(this.tr.contactstatus) : Effect.hide(this.tr.contactstatus);
        Preferences.enableAddressBook ? Effect.show(this.tr.searchcontact) : Effect.hide(this.tr.searchcontact);
        Preferences.enableAddressBook ? Effect.show(this.tr.updatecontact) : Effect.hide(this.tr.updatecontact);

        Preferences.enableVoice ? Effect.show(this.tr.webrtcSubscription) : Effect.hide(this.tr.webrtcSubscription);
        Preferences.enableVoice ? Effect.show(this.tr.webrtcVoiceCall) : Effect.hide(this.tr.webrtcVoiceCall);
    }
    save(evt) {
        Preferences.enableSMS = !!this.enableSMS.checked;
        Preferences.enableChat = !!this.enableChat.checked;
        Preferences.enablePresence = !!this.enablePresence.checked;
        Preferences.enableAddressBook = !!this.enableAddressBook.checked;
        Preferences.enableVoice = !!this.enableVoice.checked;

        Preferences.baseUrl = this.baseUrl.value;
        Preferences.projectName = this.projectName.value;
        Preferences.username = this.username.value;
        Preferences.password = this.password.value;
        Preferences.smstext = this.smstext.value;
        Preferences.sendernumber = this.sendernumber.value;
        Preferences.receivernumber = this.receivernumber.value;
        Preferences.chattext = this.chattext.value;
        Preferences.chatreceiverid = this.chatreceiverid.value;
        Preferences.setstatuspresence = this.setstatuspresence.value;
        Preferences.presentityUserId = this.presentityUserId.value;
        Preferences.primaryContact = this.primaryContact.value;
        Preferences.firstName = this.firstName.value;
        Preferences.lastName = this.lastName.value;
        Preferences.emailAddress = this.emailAddress.value;
        Preferences.homePhoneNumber = this.homePhoneNumber.value;
        Preferences.businessPhoneNumber = this.businessPhoneNumber.value;
        Preferences.buddy = this.buddy.value;
        Preferences.contactId = this.contactId.value;
        Preferences.searchfirstname = this.searchfirstname.value;
        Preferences.callToUser = this.callToUser.value;

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
        this.smstext.value = Preferences.smstext;
        this.sendernumber.value = Preferences.sendernumber;
        this.receivernumber.value = Preferences.receivernumber;
        this.chattext.value = Preferences.chattext;
        this.chatreceiverid.value = Preferences.chatreceiverid;
        this.setstatuspresence.value = Preferences.setstatuspresence;
        this.presentityUserId.value = Preferences.presentityUserId;
        this.primaryContact.value = Preferences.primaryContact;
        this.firstName.value = Preferences.firstName;
        this.lastName.value = Preferences.lastName;
        this.emailAddress.value = Preferences.emailAddress;
        this.homePhoneNumber.value = Preferences.homePhoneNumber;
        this.businessPhoneNumber.value = Preferences.businessPhoneNumber;
        this.buddy.value = Preferences.buddy;
        this.contactId.value = Preferences.contactId;
        this.searchfirstname.value = Preferences.searchfirstname;
        this.callToUser.value = Preferences.callToUser;

        this.render();
    }
    defaultState() {
        this.controlsDepot.onLoad = this.onDefaultState.bind(this);
        this.controlsDepot.load();
    }
    attachEvents() {
        this.activateNext.addEventListener('click', (evt) => this.next(evt));
        this.savePreference.addEventListener('click', (evt) => this.save(evt));
    }
    initialize() {
        this.controlsTab = new ControlsTab('pc-tabs');
        this.controlsMenu = new ControlsMenu('pc-menu');

        this.tr = {};
        this.tr.token = document.getElementById('token');
        this.tr.channel = document.getElementById('channel');
        this.tr.websocket = document.getElementById('websocket');
        this.tr.outboundsms = document.getElementById('outboundsms');
        this.tr.subscription = document.getElementById('subscription');
        this.tr.chat = document.getElementById('chat');
        this.tr.callpresence = document.getElementById('callpresence');
        this.tr.callpresencelistsubscriptions = document.getElementById('callpresencelistsubscriptions');
        this.tr.updateownstatus = document.getElementById('updateownstatus');
        this.tr.watchuserstatus = document.getElementById('watchuserstatus');
        this.tr.adhocPresenceList = document.getElementById('adhocPresenceList');
        this.tr.contactstatus = document.getElementById('contactstatus');
        this.tr.searchcontact = document.getElementById('searchcontact');
        this.tr.updatecontact = document.getElementById('updatecontact');
        this.tr.webrtcSubscription = document.getElementById('webrtcSubscription');
        this.tr.webrtcVoiceCall = document.getElementById('webrtcVoiceCall');

        this.enableSMS = document.getElementById('enablesms');
        this.enableChat = document.getElementById('enablechat');
        this.enablePresence = document.getElementById('enablepresence');
        this.enableAddressBook = document.getElementById('enableaddressbook');
        this.enableVoice = document.getElementById('enablevoice');

        this.baseUrl = document.getElementById('baseurl');
        this.projectName = document.getElementById('projectname');
        this.username = document.getElementById('username');
        this.password = document.getElementById('password');
        this.smstext = document.getElementById('smstext');
        this.sendernumber = document.getElementById('sendernumber');
        this.receivernumber = document.getElementById('receivernumber');
        this.chattext = document.getElementById('chattext');
        this.chatreceiverid = document.getElementById('chatreceiverid');
        this.setstatuspresence = document.getElementById('setstatuspresence');
        this.presentityUserId = document.getElementById('presentityUserId');
        this.primaryContact = document.getElementById('primaryContact');
        this.firstName = document.getElementById('firstName');
        this.lastName = document.getElementById('lastName');
        this.emailAddress = document.getElementById('emailAddress');
        this.homePhoneNumber = document.getElementById('homePhoneNumber');
        this.businessPhoneNumber = document.getElementById('businessPhoneNumber');
        this.buddy = document.getElementById('buddy');
        this.contactId = document.getElementById('contactId');
        this.searchfirstname = document.getElementById('searchfirstname');
        this.callToUser = document.getElementById('callToUser');

        this.activateNext = document.getElementById('activatenext');
        this.savePreference = document.getElementById('savepreference');
        this.attachEvents();

        this.defaultState();
    }
}