// @file controls.js
class Controls {
    constructor() {}
    next(evt) {
        this.controlsTab.activateNext();
    }
    save(evt) {
        Preferences.enableSMS = !!this.enableSMS.checked;
        Preferences.enableChat = !!this.enableChat.checked;
        Preferences.enablePresence = !!this.enablePresence.checked;
        Preferences.enableAddressBook = !!this.enableAddressBook.checked;

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
    }
    defaultState() {
        this.enableSMS.checked = Preferences.enableSMS;
        this.enableChat.checked = Preferences.enableChat;
        this.enablePresence.checked = Preferences.enablePresence;
        this.enableAddressBook.checked = Preferences.enableAddressBook;


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
    }

    attachEvents() {
        this.activateNext.addEventListener('click', (evt) => this.next(evt));
        this.savePreference.addEventListener('click', (evt) => this.save(evt));
    }
    initialize() {
        this.controlsTab = new ControlsTab('pc-tabs');
        this.controlsMenu = new ControlsMenu('pc-menu');

        this.enableSMS = document.getElementById('enablesms');
        this.enableChat = document.getElementById('enablechat');
        this.enablePresence = document.getElementById('enablepresence');
        this.enableAddressBook = document.getElementById('enableaddressbook');

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

        this.activateNext = document.getElementById('activatenext');
        this.savePreference = document.getElementById('savepreference');
        this.attachEvents();

        this.defaultState();
    }
}

class ControlsTab {
    constructor(id) {
        this.currPos = 0;
        this.container = document.getElementById(id);
        this.tabElements = this.container.querySelectorAll('li a[data-mui-toggle="tab"]');
        this.prepareIdList();
        this.attachEvents();
    }
    prepareIdList() {
        this.tabList = [];
        for(let i=0; i<this.tabElements.length; i++) {
            let tabId = this.tabElements[i].getAttribute('data-mui-controls');
            this.tabList.push(tabId);
        }
    }
    onClick(evt) {
        let currId = evt.target.getAttribute('data-mui-controls');
        this.currPos = this.tabList.indexOf(currId);
    }
    attachEvents() {
        for(let i=0; i<this.tabElements.length; i++) {
            this.tabElements[i].addEventListener('click', (evt) => this.onClick(evt));
        }
    }
    activateNext() {
        this.currPos = (this.currPos + 1) % this.tabElements.length;
        let nextPosId = this.tabList[this.currPos];
        mui.tabs.activate(nextPosId);
    }
}

class ControlsMenu {
    constructor(id) {
        this.container = document.getElementById(id);
        this.menuElements = this.container.querySelectorAll('li a[data-toggle="tab"]');
        this.prepareIdList();
        this.attachEvents();
    }
    prepareIdList() {
        this.menuList = [];
        for(let i=0; i<this.menuElements.length; i++) {
            let tabId = this.menuElements[i].getAttribute('data-controls');
            this.menuList.push(tabId);
        }
    }
    onClick(evt) {
        let currId = evt.target.getAttribute('data-controls');
        mui.tabs.activate(currId);
    }
    attachEvents() {
        for(let i=0; i<this.menuElements.length; i++) {
            this.menuElements[i].addEventListener('click', (evt) => this.onClick(evt));
        }
    }
}