// @file utility.js
function whenReady(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

var parseHTML = function(str) {
    var tmp = document.implementation.createHTMLDocument();
    tmp.body.innerHTML = str;
    return tmp.body.children;
};

var Effect = {
    hide: function(el) {
        el.style.display = 'none';
    },
    show: function(el) {
        el.style.display = '';
    },
    fadeIn: function(el) {
        el.style.opacity = 0;

        var last = +new Date();
        var tick = function() {
            el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
            last = +new Date();

            if (+el.style.opacity < 1) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
            }
        };

        tick();
    }
};

var Style = {
    addClass: function(el, className) {
        if (el.classList)
            el.classList.add(className);
        else
            el.className += ' ' + className;
    },
    removeClass: function(el, className) {
        if (el.classList)
            el.classList.remove(className);
        else
            el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    },
    hasClass: function(el, className) {
        if (el.classList)
            el.classList.contains(className);
        else
            new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    },
    toggleClass: function(className) {
        if (el.classList) {
            el.classList.toggle(className);
        } else {
            var classes = el.className.split(' ');
            var existingIndex = classes.indexOf(className);

            if (existingIndex >= 0)
                classes.splice(existingIndex, 1);
            else
                classes.push(className);

            el.className = classes.join(' ');
        }
    }
};

var Trigger = {
    _: function(eventName, cargoObj) {
        if (window.CustomEvent) {
            var event = new CustomEvent(eventName, { detail: cargoObj });
        } else {
            var event = document.createEvent('CustomEvent');
            event.initCustomEvent(eventName, true, true, cargoObj);
        }

        el.dispatchEvent(event);
    },
    custom: function(eventName) {
        var event = document.createEvent('HTMLEvents');
        event.initEvent(eventName, true, false);
        el.dispatchEvent(event);
    }
};

var Extend = {
    _: function(out) {
        out = out || {};

        for (var i = 1; i < arguments.length; i++) {
            if (!arguments[i])
                continue;

            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key))
                    out[key] = arguments[i][key];
            }
        }

        return out;
    },
    deep: function(out) {
        out = out || {};

        for (var i = 1; i < arguments.length; i++) {
            var obj = arguments[i];

            if (!obj)
                continue;

            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object')
                        out[key] = deepExtend(out[key], obj[key]);
                    else
                        out[key] = obj[key];
                }
            }
        }

        return out;
    }
};

var Convert = {
    jsonToUri: function(data) {
        let list = [];
        for (let i in data) {
            list.push(i + '=' + data[i]);
        }
        return list.join('&');
    }
};

String.prototype.autofit = function() {
    var formatted = this,
        list = arguments[0];
    for (var prop in list) {
        formatted = formatted.replace(new RegExp('\\[' + prop + '\\]', 'g'), list[prop]);
    }
    return formatted;
};

String.prototype.graft = function() {
    var formatted = this;
    for (var arg in arguments) {
        formatted = formatted.replace("[" + arg + "]", arguments[arg]);
    }
    return formatted;
};// @file preferences.js
var Preferences = {
    toMonitor: false,
    passwordGrant:true,
    enableSMS: true,
    enableChat: true,
    enablePresence: true,
    enableAddressBook: true,
    enableVoice: false,
    baseUrl: "nvs-cpaas-oauth.kandy.io",
    projectName: "PUB-test.ojfs",
    username: "vikas07@mail-cart.com",
    password: "Test@123",
    privateKey:  "PRIV-sample1",
    privateSecret: "b013f26f-329a-4156-a01c-38263505f965",
    smsText: "hello",
    senderNumber: "+16504256646",
    receiverNumber: "+15107311282",
    chatText: "hi",
    chatReceiverId: "arti07@test.ojfs.att.com",
    setStatusPresence: "Busy",
    presentityUserId: "arti07@mail-cart.com",
    primaryContact: "arti07@mail-cart.com",
    firstName: "ashish",
    lastName: "ashish",
    emailAddress: "arti07@mail-cart.com",
    homePhoneNumber: "+12074666511",
    businessPhoneNumber: "+17144850453",
    buddy: "true",
    contactId: "ashish@lx.in",
    searchFirstName: "ashish",
    callToUser: "sip:arti07@test.ojfs.att.com",
    smsVerificationNumber: '+19549510743',
    emailVerificationId: 'arti07@mail-cart.com',
    projectNameSecondUser: "PUB-test.ojfs",
    usernameSecondUser: "arti07@mail-cart.com",
    passwordSecondUser: "Test@123",
    userFirst: 'userFirst',
    userSecond: 'userSecond'
};// @file toast.js
class Toast {
    constructor() {
        this.initialize();
    }
    show(msg) {
        Effect.show(this.container);
        this.message.innerHTML = msg;
        setTimeout(this.hide.bind(this), 3000);
    }
    hide() {
        Effect.hide(this.container);
        this.message.innerHTML = '';
    }
    initialize() {
        this.container = document.getElementById('toastbox');
        this.message = this.container.querySelector('.toast-box-msg');

        this.hide();
    }
}// @file status.js
class Status {
    constructor(elmRef) {
        this.container = elmRef;
    }
    success() {
        Style.removeClass(this.container, 'symbol-error');
        Style.removeClass(this.container, 'symbol-failure');
        Style.addClass(this.container, 'symbol-success');
    }
    failure() {
        Style.removeClass(this.container, 'symbol-error');
        Style.removeClass(this.container, 'symbol-success');
        Style.addClass(this.container, 'symbol-failure');
    }
    error() {
        Style.removeClass(this.container, 'symbol-failure');
        Style.removeClass(this.container, 'symbol-success');
        Style.addClass(this.container, 'symbol-error');
    }
}// @file xhrlog.js
class XHRLog {
    constructor(elmRef) {
        this.container = elmRef;
    }
    createBox(msg) {
        this.modal = document.createElement('div');
        this.modal.setAttribute("class", "xhrlog");
        this.modal.innerHTML = '<div class="mui--text-title modal-title">Output</div><pre>' + msg + '</pre>';
    }
    openLog() {
        mui.overlay('on', this.modal);
    }
    destroy() {
        this.container.removeEventListener('click', this._openLog);
        Style.removeClass(this.container, 'clickable');
    }
    initialize(msg) {
        this.createBox(msg);
        this._openLog = this.openLog.bind(this);
        this.container.addEventListener('click', this._openLog);
        Style.addClass(this.container, 'clickable');
    }
}// @file extract.js
class Extract {
    static username(token) {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
}
// @file controlstab.js
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
}// @file controlsmenu.js
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
}// @file controlsdb.js
class ControlsDepot {
    constructor(id) {
        this.storageId = id;
        this.toast = new Toast();
    }
    set onLoad(fn) {
        this.proceed = fn;
    }
    onLoadInChrome(result) {
        if (!!result) {
            if (this.storageId in result) {
                Preferences = JSON.parse(result[this.storageId]);
                this.proceed();
            } else {
                this.toast.show("Preferences are not saved yet in chrome storage");
                this.proceed();
            }
        } else {
            this.toast.show("Failed to load Preferences from chrome storage!");
            this.proceed();
        }
    }
    load() {
        if (!!window.localStorage) {
            if (this.storageId in window.localStorage) {
                Preferences = JSON.parse(window.localStorage.getItem(this.storageId));
                this.proceed();
            } else {
                this.toast.show("Preferences are not saved yet in browser storage");
                this.proceed();
            }
        } else if (!!window.chrome && !!window.chrome.storage) {
            chrome.storage.local.get([this.storageId], this.onLoadInChrome.bind(this));
        } else {
            this.toast.show("Failed to load Preferences from browser storage!");
            this.proceed();
        }
    }
    onSaveInChrome() {
        this.toast.show('Preferences saved in chrome storage');
    }
    save() {
        if (!!window.localStorage) {
            window.localStorage.setItem(this.storageId, JSON.stringify(Preferences));
            this.toast.show('Preferences saved in browser storage');
        } else if (!!window.chrome && !!window.chrome.storage) {
            let cargo = {};
            cargo[this.storageId] = JSON.stringify(Preferences);
            chrome.storage.local.set(cargo, this.onSaveInChrome.bind(this));
        } else {
            this.toast.show("Failed to save in browser storage!");
        }
    }
}// @file controls.js
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
        Preferences.enableVoice ? Effect.show(this.tr.webrtcMakeCall) : Effect.hide(this.tr.webrtcMakeCall);
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

        Preferences.projectNameSecondUser = this.projectNameSecondUser.value;
        Preferences.usernameSecondUser = this.usernameSecondUser.value;
        Preferences.passwordSecondUser = this.passwordSecondUser.value;

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
        this.projectNameSecondUser.value = Preferences.projectNameSecondUser;
        this.usernameSecondUser.value = Preferences.usernameSecondUser;
        this.passwordSecondUser.value = Preferences.passwordSecondUser;
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
        this.tr.webrtcMakeCall = document.getElementById('webrtcmakecall');
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

        this.projectNameSecondUser = document.getElementById('projectNameSecondUser');
        this.usernameSecondUser = document.getElementById('usernameSecondUser');
        this.passwordSecondUser = document.getElementById('passwordSecondUser');

        this.authWays = {};
        this.authWays.radioPasswordGrant = document.getElementById('authwaysradiopasswordgrant');
        this.authWays.radioClientCredentials = document.getElementById('authwaysradioclientcredentials');
        this.authWays.panelPasswordGrant = document.getElementById('authwayspanelpasswordgrant');
        this.authWays.panelClientCredentials = document.getElementById('authwayspanelclientcredentials');

        this.attachEvents();
        this.defaultState();
    }

}// @file appbar.js
class AppBar {
    constructor() {
        this.toast = new Toast();
    }
    openHome(evt) {
        evt.preventDefault();
        this.defaultState();
    }
    openSetting(evt) {
        evt.preventDefault();
        Effect.hide(this.menuSetting);
        Effect.show(this.menuHome);
        Effect.show(this.viewSetting);
        Effect.hide(this.viewHome);
    }
    set execute(fn) {
        this.proceed = fn;
    }

    set stopStream(fn) {
        this.stopCall = fn;
    }

    set startStream(fn) {
        this.startCall = fn;
    }

    set closeWebsocketUser1(fn){
        console.log("closewebsocket of user 1 function ",fn);
            this.closeSocketUser1 = fn;
    }

    set closeWebsocketUser2(fn){
        console.log("closewebsocket of user 2 function ",fn);
        this.closeSocketUser2 = fn;
    }

    startMonitor(evt) {
        evt.preventDefault();
        this.defaultState();
        Preferences.toMonitor = true;
        if (Preferences.enableVoice) {
            this.startCall();
        }
        this.proceed();
        Effect.hide(this.menuPlay);
        Effect.show(this.menuPause);
        this.toast.show('Monitoring started');
    }
    stopMonitor(evt) {
        evt.preventDefault();
        Preferences.toMonitor = false;
        Effect.hide(this.menuPause);
        Effect.show(this.menuPlay);
        this.toast.show('Monitoring stopped');
        this.stopCall();
        this.closeSocketUser1();
        this.closeSocketUser2();
    }
    abortMonitor() {
        Effect.show(this.menuPlay);
        Effect.hide(this.menuPause);
        Preferences.toMonitor = false;
        this.toast.show('Monitoring over');
        this.stopCall();
        this.closeSocketUser1();
        this.closeSocketUser2();
    }
    showPasswordGrant() {
        Preferences.passwordGrant = true;
        Effect.hide(this.accountClientCredentials);
        Effect.show(this.accountPasswordGrant);
    }
    showClientCredentials() {
        Preferences.passwordGrant = false;
        Effect.show(this.accountClientCredentials);
        Effect.hide(this.accountPasswordGrant);
    }
    defaultState() {
        Effect.show(this.menuSetting);
        Effect.hide(this.menuHome);
        Effect.hide(this.viewSetting);
        Effect.show(this.viewHome);
        Effect.show(this.menuPlay);
        Effect.hide(this.menuPause);
    }
    initialize() {
        this.viewHome = document.getElementById('checkupreport');
        this.viewSetting = document.getElementById('preferencecontrols');

        this.menuHome = document.getElementById('menuhome');
        this.menuHome.addEventListener('click', (evt) => this.openHome(evt));

        this.menuSetting = document.getElementById('menusetting');
        this.menuSetting.addEventListener('click', (evt) => this.openSetting(evt));

        this.menuPlay = document.getElementById('menuplay');
        this.menuPlay.addEventListener('click', (evt) => this.startMonitor(evt));

        this.menuPause = document.getElementById('menupause');
        this.menuPause.addEventListener('click', (evt) => this.stopMonitor(evt));

        this.defaultState();
    }
}// @file usertoken.js
class UserToken {
    constructor() {
        this.container = document.querySelector("#token");
        this.xhrLog = new XHRLog(this.container);
        this.status = new Status(this.container.querySelector(".status"));
    }
    set proceedTo(fn) {
        this.proceed = fn;
    }
    get tokenData() {
        return this.token;
    }

    get tokenDataSecondUser() {
        return this.tokenSecondUser;
    }

    onSuccess(data,userType) {
        
        if(userType == Preferences.userFirst){
            this.token = data;
            this.status.success();
            this.xhrLog.initialize(JSON.stringify(data, null, 4));
        }else{
            this.tokenSecondUser = data;
        }        
        this.proceed(data,userType);
    }
    onFailure() {
        this.status.failure();
    }
    onError() {
        this.status.error();
    }
    request(url, cargo,userType) {
        var self = this;
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 400)
                self.onSuccess(JSON.parse(this.responseText),userType);
            else
                self.onFailure();
        };
        xhr.onerror = this.onError;
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.timeout = 15000; // in milliseconds
        xhr.ontimeout = function() {
            console.log('UserToken, timeout');
            self.onError();
        }
        xhr.send(Convert.jsonToUri(cargo));
    }
    destroy() {
        this.status.failure();
        this.xhrLog.destroy();
    }
    initialize(cpaasUrl, projectName, username, password,userType) {
        console.log('UserToken '+ userType +' initialize');

        let cargo = {
            client_id: encodeURIComponent(projectName),
            username: username,
            password: password,
            grant_type: 'password',
            scope: 'openid'
        };
        this.request(cpaasUrl + "auth/v1/token", cargo,userType);

    }
    initializeSecret(cpaasUrl, client_id, client_secret) {
        console.log('UserToken, initialize');

        let cargo = {
            client_id: client_id,
            client_secret: client_secret,
            grant_type: 'client_credentials',
            scope: 'openid'
        };
        this.request(cpaasUrl + "auth/v1/token", cargo);
    }
}// @file sendmessage.js
class SendMessage {
    constructor() {
        this.container = document.querySelector("#chat");
        this.xhrLog = new XHRLog(this.container);
        this.status = new Status(this.container.querySelector(".status"));
    }
    set proceedTo(fn) {
        this.proceed = fn;
    }
    set skipTo(fn) {
        this.skip = fn;
    }
    onSuccess(data) {
        this.status.success();
        this.xhrLog.initialize(JSON.stringify(data, null, 4));
        this.proceed(data);
    }
    onFailure() {
        this.status.failure();
        this.skip();
    }
    onError() {
        this.status.error();
        this.skip();
    }
    destroy() {
        this.status.failure();
        this.xhrLog.destroy();
    }
    request(url, accessToken, cargo) {
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 400)
                self.onSuccess(JSON.parse(this.responseText));
            else
                self.onFailure();
        };
        xhr.onerror = self.onError;
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.timeout = 15000; // in milliseconds
        xhr.ontimeout = function() {
            console.log('SendMessage, timeout');
            self.onError();
        }
        xhr.send(JSON.stringify(cargo));
    }
    initialize(cpaasUrl, idToken, accessToken, chatreceiverid, chattext) {
        console.log('SendMessage, initialize');
        let username = Extract.username(idToken);
        let url = "[0]chat/v1/[1]/oneToOne/[2]/adhoc/messages".graft(
            cpaasUrl,
            username.preferred_username,
            chatreceiverid
        );
        var cargo = {
            "chatMessage": {
                "text": chattext
            }
        };
        this.request(url, accessToken, cargo);
    }
}// @file outboundsms.js
class OutBoundSMS {
    constructor() {
        this.container = document.querySelector("#outboundsms");
        this.xhrLog = new XHRLog(this.container);
        this.status = new Status(this.container.querySelector(".status"));
    }
    set proceedTo(fn) {
        this.proceed = fn;
    }
    set skipTo(fn) {
        this.skip = fn;
    }
    onSuccess(data) {
        this.status.success();
        this.xhrLog.initialize(JSON.stringify(data, null, 4));
        this.proceed(data);
    }
    onFailure() {
        this.status.failure();
        this.skip();
    }
    onError() {
        this.status.error();
        this.skip();
    }
    destroy() {
        this.status.failure();
        this.xhrLog.destroy();
    }
    request(url, accessToken, cargo) {
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 400)
                self.onSuccess(JSON.parse(this.responseText));
            else
                self.onFailure();
        };
        xhr.onerror = self.onError;
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.timeout = 15000; // Set timeout to 4 seconds (4000 milliseconds)
        xhr.ontimeout = function() {
            console.log("timeout");
            self.onError();
        }
        xhr.send(JSON.stringify(cargo));
    }
    initialize(cpaasUrl, idToken, accessToken, smstext, receivernumber, sendernumber) {
        console.log('OutBoundSMS, initialize');
        let username = Extract.username(idToken);
        let url = cpaasUrl + "smsmessaging/v1/" + username.preferred_username + "/outbound/" + sendernumber + "/requests";
        let cargo = {
            "outboundSMSMessageRequest": {
                "address": [receivernumber],
                "clientCorrelator": username.preferred_username,
                "outboundSMSTextMessage": {
                    "message": smstext
                }
            }
        }
        this.request(url, accessToken, cargo);
    }
}// @file callsubsciption.js
class CallSubscription {
    constructor() {
        this.container = document.querySelector("#subscription");
        this.xhrLog = new XHRLog(this.container);
        this.status = new Status(this.container.querySelector(".status"));
    }
    set proceedTo(fn) {
        this.proceed = fn;
    }
    set skipTo(fn) {
        this.skip = fn;
    }
    onSuccess(data) {
        this.status.success();
        this.xhrLog.initialize(JSON.stringify(data, null, 4));
        this.proceed(data);
    }
    onFailure() {
        this.status.failure();
        this.skip();
    }
    onError() {
        this.status.error();
        this.skip();
    }
    destroy() {
        this.status.failure();
        this.xhrLog.destroy();
    }
    request(url, accessToken, cargo) {
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 400)
                self.onSuccess(JSON.parse(this.responseText));
            else
                self.onFailure();
        };
        xhr.onerror = self.onError;
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.timeout = 15000; // in milliseconds
        xhr.ontimeout = function() {
            console.log('CallSubscription, timeout');
            self.onError();
        }
        xhr.send(JSON.stringify(cargo));
    }
    initialize(cpaasUrl, idToken, accessToken, callbackURL) {
        console.log('CallSubscription, initialize');
        let username = Extract.username(idToken);
        let url = cpaasUrl + "chat/v1/" + username.preferred_username + "/subscriptions";
        let cargo = {
            "chatNotificationSubscription": {
                "callbackReference": { "notifyURL": callbackURL },
                "clientCorrelator": username.preferred_username
            }
        };
        this.request(url, accessToken, cargo);
    }
}// @file callpresence.js
class CallPresence {
    constructor() {
        this.container = document.querySelector("#callpresence");
        this.xhrLog = new XHRLog(this.container);
        this.status = new Status(this.container.querySelector(".status"));
    }
    set proceedTo(fn) {
        this.proceed = fn;
    }
    get presenceData() {
        return this.presence;
    }
    get connectorCode() {
        console.log("CallPresense, presence:", this.presence);
        var collection = this.presence.presenceListCollection;
        if (collection.presenceList.length > 0 && collection.presenceList[0].hasOwnProperty('resourceURL')) {
            let resourceUrl = collection.presenceList[0].resourceURL;
            console.log("CallPresence, connectorCode, resourceURL:", resourceUrl);
            return resourceUrl.substr(resourceUrl.lastIndexOf('/') + 1);
        }
    }
    onSuccess(data) {
        this.status.success();
        this.xhrLog.initialize(JSON.stringify(data, null, 4));
        this.presence = data;
        this.proceed(data);
    }
    set skipTo(fn) {
        this.skip = fn;
    }
    onFailure() {
        this.status.failure();
        this.skip();
    }
    onError() {
        this.status.error();
        this.skip();
    }
    destroy() {
        this.status.failure();
        this.xhrLog.destroy();
    }
    request(url, accessToken, cargo) {
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 400)
                self.onSuccess(JSON.parse(this.responseText));
            else
                self.onFailure();
        };
        xhr.onerror = self.onError;
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.timeout = 15000; // Set timeout to 4 seconds (4000 milliseconds)
        xhr.ontimeout = function() {
            console.log("timeout");
            self.onError();
        }
        xhr.send(JSON.stringify(cargo));
    }
    
    initialize(cpaasUrl, idToken, accessToken) {
        console.log('CallPresence, initialize');
        let username = Extract.username(idToken);
        let url = ("[0]presence/v1/[1]/presenceLists").graft(
            cpaasUrl,
            username.preferred_username
        );

        let cargo = {
            "presenceList": {
                "x-listName": "myList",
                "presenceContact": [{
                        "presentityUserId": "bob@myapp.com"
                    }, {
                        "presentityUserId": "alice@myapp.com"
                    }
                ]
            }
        }

        this.request(url, accessToken, cargo);
    }

}// @file callpresencelistsubscriptions.js
class CallPresenceListSubscriptions {
    constructor() {
        this.container = document.querySelector("#callpresencelistsubscriptions");
        this.xhrLog = new XHRLog(this.container);
        this.status = new Status(this.container.querySelector(".status"));
    }
    set proceedTo(fn) {
        this.proceed = fn;
    }
    set skipTo(fn) {
        this.skip = fn;
    }
    onSuccess(data) {
        this.status.success();
        this.xhrLog.initialize(JSON.stringify(data, null, 4));
        this.proceed(data);
    }
    onFailure() {
        this.status.failure();
        this.skip();
    }
    onError() {
        this.status.error();
        this.skip();
    }
    destroy() {
        this.status.failure();
        this.xhrLog.destroy();
    }
    request(url, accessToken, cargo) {
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 400)
                self.onSuccess(JSON.parse(this.responseText));
            else
                self.onFailure();
        };
        xhr.onerror = self.onError;
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.timeout = 15000; // Set timeout to 4 seconds (4000 milliseconds)
        xhr.ontimeout = function() {
            console.log("timeout");
            self.onError();
        }
        xhr.send(JSON.stringify(cargo));
    }
    initialize(cpaasUrl, idToken, accessToken, callbackURL, connectorCode) {
        console.log('CallPresenceListSubscriptions, initialize');
        let username = Extract.username(idToken);
        let url = "[0]presence/v1/[1]/subscriptions/presenceListSubscriptions/[2]".graft(
            cpaasUrl,
            username.preferred_username,
            connectorCode
        );
        var cargo = {
            "presenceListSubscription": {
                "callbackReference": {
                    "notifyURL": callbackURL
                },
                "clientCorrelator": "sampleCorrelator",
                "duration": 86400
            }
        };
        this.request(url, accessToken, cargo);
    }
}// @file updateownstatus.js
class UpdateOwnStatus {
    constructor() {
        this.container = document.querySelector("#updateownstatus");
        this.xhrLog = new XHRLog(this.container);
        this.status = new Status(this.container.querySelector(".status"));
    }
    set proceedTo(fn) {
        this.proceed = fn;
    }
    onSuccess(data) {
        this.status.success();
        this.xhrLog.initialize(JSON.stringify(data, null, 4));
        this.proceed(data);
    }
    set skipTo(fn) {
        this.skip = fn;
    }
    onFailure() {
        this.status.failure();
        this.skip();
    }
    onError() {
        this.status.error();
        this.skip();
    }
    destroy() {
        this.status.failure();
        this.xhrLog.destroy();
    }
    request(url, accessToken, cargo) {
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 400)
                self.onSuccess(JSON.parse(this.responseText));
            else
                self.onFailure();
        };
        xhr.onerror = self.onError;
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.timeout = 15000; // Set timeout to 4 seconds (4000 milliseconds)
        xhr.ontimeout = function() {
            console.log("timeout");
            self.onError();
        }
        xhr.send(JSON.stringify(cargo));
    }
    initialize(cpaasUrl, idToken, accessToken, setstatuspresence) {
        console.log('UpdateOwnStatus, initialize');
        let username = Extract.username(idToken);
        let url = ("[0]presence/v1/[1]/presenceSources").graft(
            cpaasUrl,
            username.preferred_username
        );
        var cargo = {
            "presenceSource": {
                "presence": {
                    "person": {
                        "overriding-willingness": {
                            "overridingWillingnessValue": "Open"
                        },
                        "activities": {
                            "activityValue": setstatuspresence
                        }
                    }
                },
                "clientCorrelator": username.preferred_username
            }
        };
        this.request(url, accessToken, cargo);
    }
}// @file watchuserstatus.js
class WatchUserStatus {
    constructor() {
        this.container = document.querySelector("#watchuserstatus");
        this.xhrLog = new XHRLog(this.container);
        this.status = new Status(this.container.querySelector(".status"));
    }
    set proceedTo(fn) {
        this.proceed = fn;
    }
    onSuccess(data) {
        this.status.success();
        this.xhrLog.initialize(JSON.stringify(data, null, 4));
        this.proceed(data);
    }
    set skipTo(fn) {
        this.skip = fn;
    }
    onFailure() {
        this.status.failure();
        this.skip();
    }
    onError() {
        this.status.error();
        this.skip();
    }
    destroy() {
        this.status.failure();
        this.xhrLog.destroy();
    }
    request(url, accessToken, cargo) {
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", url, true);
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 400)
                self.onSuccess(JSON.parse(this.responseText));
            else
                self.onFailure();
        };
        xhr.onerror = self.onError;
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.timeout = 15000; // Set timeout to 4 seconds (4000 milliseconds)
        xhr.ontimeout = function() {
            console.log("timeout");
            self.onError();
        }
        xhr.send(JSON.stringify(cargo));
    }
    initialize(cpaasUrl, idToken, accessToken, connectorCode, presentityUserId) {
        console.log('WatchUserStatus, initialize');
        let username = Extract.username(idToken);
        let url = ("[0]presence/v1/[1]/presenceLists/[2]/presenceContacts/[3]").graft(
            cpaasUrl,
            username.preferred_username,
            connectorCode,
            presentityUserId
        );
        var cargo = {
            "presenceContact": {
                "presentityUserId": presentityUserId
            }
        };
        this.request(url, accessToken, cargo);
    }
}// @file adhocPresenceList.js
class AdhocPresenceList {
    constructor() {
        this.container = document.querySelector("#adhocpresencelist");
        this.xhrLog = new XHRLog(this.container);
        this.status = new Status(this.container.querySelector(".status"));
    }
    set proceedTo(fn) {
        this.proceed = fn;
    }
    onSuccess(data) {
        this.status.success();
        this.xhrLog.initialize(JSON.stringify(data, null, 4));
        this.proceed(data);
    }
    set skipTo(fn) {
        this.skip = fn;
    }
    onFailure() {
        this.status.failure();
        this.skip();
    }
    onError() {
        this.status.error();
        this.skip();
    }
    destroy() {
        this.status.failure();
        this.xhrLog.destroy();
    }
    request(url, accessToken, cargo) {
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 400)
                self.onSuccess(JSON.parse(this.responseText));
            else
                self.onFailure();
        };
        xhr.onerror = self.onError;
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.timeout = 15000; // Set timeout to 4 seconds (4000 milliseconds)
        xhr.ontimeout = function() {
            console.log("timeout");
            self.onError();
        }
        xhr.send(JSON.stringify(cargo));
    }
    initialize(cpaasUrl, idToken, accessToken, presentityUserId) {
        console.log('AdhocPresenceList, initialize');
        let username = Extract.username(idToken);
        let url = ("[0]presence/v1/[1]/adhocPresenceList").graft(
            cpaasUrl,
            username.preferred_username
        );
        var cargo = { 
            "adhocPresenceList": { 
                "presentityUserId": [
                    presentityUserId
                ] 
            } 
        };

        this.request(url, accessToken, cargo);
    }
}// @file contacts.js
class Contacts {
    constructor() {
        this.container = document.querySelector("#contactstatus");
        this.xhrLog = new XHRLog(this.container);
        this.status = new Status(this.container.querySelector(".status"));
    }
    set proceedTo(fn) {
        this.proceed = fn;
    }
    set skipTo(fn) {
        this.skip = fn;
    }
    get contactData() {
        return this.contact;
    }
    onSuccess(data) {
        this.status.success();
        this.contact = data;
        this.xhrLog.initialize(JSON.stringify(data, null, 4));
        this.proceed(data);
    }
    onFailure() {
        this.status.failure();
        this.skip();
    }
    onError() {
        this.status.error();
        this.skip();
    }
    destroy() {
        this.status.failure();
        this.xhrLog.destroy();
    }
    request(url, accessToken, cargo) {
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 400)
                self.onSuccess(JSON.parse(this.responseText));
            else
                self.onFailure();
        };
        xhr.onerror = self.onError;
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.timeout = 15000; // in milliseconds
        xhr.ontimeout = function() {
            console.log('Contacts, timeout');
            self.onError();
        }
        xhr.send(JSON.stringify(cargo));
    }
    initialize(cpaasUrl, idToken, accessToken, primaryContact, firstName, lastName, emailAddress, homePhoneNumber, businessPhoneNumber,
        buddy, contactId) {
        console.log('Contacts, initialize');
        let username = Extract.username(idToken);
        let url = cpaasUrl + "addressbook/v1/" + username.preferred_username + "/default/contacts";
        let cargo = {
            "contact": {
                "attributeList": {
                    "attribute": [{
                            "name": "primaryContact",
                            "value": primaryContact
                        },
                        {
                            "name": "firstName",
                            "value": firstName
                        },
                        {
                            "name": "lastName",
                            "value": lastName
                        },
                        {
                            "name": "emailAddress",
                            "value": emailAddress
                        },
                        {
                            "name": "homePhoneNumber",
                            "value": homePhoneNumber
                        },
                        {
                            "name": "businessPhoneNumber",
                            "value": businessPhoneNumber
                        },
                        {
                            "name": "buddy",
                            "value": buddy
                        }
                    ]
                },
                "contactId": contactId + Math.random()
            }
        };
        this.request(url, accessToken, cargo);
    }
}// @file searchcontact.js
class SearchContact {
    constructor() {
        this.container = document.querySelector("#searchcontact");
        this.xhrLog = new XHRLog(this.container);
        this.status = new Status(this.container.querySelector(".status"));
    }
    set proceedTo(fn) {
        this.proceed = fn;
    }
    set skipTo(fn) {
        this.skip = fn;
    }
    onSuccess(data) {
        this.status.success();
        this.xhrLog.initialize(JSON.stringify(data, null, 4));
        this.proceed(data);
    }
    onFailure() {
        this.status.failure();
        this.skip();
    }
    onError() {
        this.status.error();
        this.skip();
    }
    destroy() {
        this.status.failure();
        this.xhrLog.destroy();
    }
    request(url, accessToken) {
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 400)
                self.onSuccess(JSON.parse(this.responseText));
            else
                self.onFailure();
        };
        xhr.onerror = self.onError;
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.timeout = 15000; // in milliseconds
        xhr.ontimeout = function() {
            console.log('SearchContact, timeout');
            self.onError();
        }
        xhr.send();
    }
    initialize(cpaasUrl, idToken, accessToken, searchfirstname) {
        console.log('SearchContact, initialize');
        let username = Extract.username(idToken);
        let url = "[0]directory/v1/[1]/default/search?order=asc&sortBy=name&userName=[2]".graft(
            cpaasUrl,
            username.preferred_username,
            searchfirstname
        );

        this.request(url, accessToken);
    }
}// @file updatecontact.js
class UpdateContact {
    constructor() {
        this.container = document.querySelector("#updatecontact");
        this.xhrLog = new XHRLog(this.container);
        this.status = new Status(this.container.querySelector(".status"));
    }
    set proceedTo(fn) {
        this.proceed = fn;
    }
    set skipTo(fn) {
        this.skip = fn;
    }
    onSuccess(data) {
        this.status.success();
        this.xhrLog.initialize(JSON.stringify(data, null, 4));
        this.proceed(data);
    }
    onFailure() {
        this.status.failure();
        this.skip();
    }
    onError() {
        this.status.error();
        this.skip();
    }
    destroy() {
        this.status.failure();
        this.xhrLog.destroy();
    }
    request(url, accessToken, cargo) {
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", url, true);
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 400)
                self.onSuccess(JSON.parse(this.responseText));
            else
                self.onFailure();
        };
        xhr.onerror = self.onError;
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.timeout = 15000; // in milliseconds
        xhr.ontimeout = function() {
            console.log('UpdateContact, timeout');
            self.onError();
        }
        xhr.send(JSON.stringify(cargo));
    }
    initialize(cpaasUrl, idToken, accessToken, primaryContact, firstName, lastName, emailAddress, homePhoneNumber, businessPhoneNumber,
        buddy, contactId) {
        console.log('UpdateContact, initialize');
        let username = Extract.username(idToken);
        let url = "[0]addressbook/v1/[1]/default/contacts/[2]".graft(
            cpaasUrl,
            username.preferred_username,
            contactId
        );
        let cargo = {
            "contact": {
                "attributeList": {
                    "attribute": [{
                            "name": "primaryContact",
                            "value": primaryContact
                        },
                        {
                            "name": "firstName",
                            "value": firstName
                        },
                        {
                            "name": "lastName",
                            "value": lastName
                        },
                        {
                            "name": "emailAddress",
                            "value": emailAddress
                        },
                        {
                            "name": "homePhoneNumber",
                            "value": homePhoneNumber
                        },
                        {
                            "name": "businessPhoneNumber",
                            "value": businessPhoneNumber
                        },
                        {
                            "name": "buddy",
                            "value": buddy
                        },
                        {
                            "name": "name",
                            "value": contactId
                        }
                    ]
                },
                "contactId": contactId,
                "link": [{
                    "href": "/cpaas/addressbook/v1/"+username.preferred_username+"/default/lists/friends/members/"+contactId,
                    "rel": "Member"
                }]
            }
        };
        this.request(url, accessToken, cargo);
    }
}// @file websocketconnection.js
class WebSocketConnection {
    constructor() {
        this.container = document.querySelector("#websocket");
        this.xhrLog = new XHRLog(this.container);
        this.status = new Status(this.container.querySelector(".status"));
        this.ws = null;
    }
    set proceedTo(fn) {
        this.proceed = fn;
    }
    set messageTo(fn) {
        this.messageResponse = fn;
    }

    onMessage(data) {
        this.messageResponse(data);
    }

    onSuccess(data) {
        this.status.success();
        this.xhrLog.initialize(data);
        this.proceed(data);
    }
    onFailure() {
        this.status.failure();
    }
    onError() {
        this.status.error();
    }
    destroy() {
        this.status.failure();
        this.xhrLog.destroy();

    }

    closeSocket() {
        console.log("close websockt of user 1");
        if (this.ws.close) {
            console.log("close websockt of user 1 If condition");
            this.ws.close();
          } else {
            console.log("close websockt of user 1 Else condition");
            this.ws.onclose = null;
          }
        
          this.ws.onmessage = null;
          this.ws.onopen = null;
          this.ws.onerror = null;
    }

    request(url) {
        var self = this;
        if ("WebSocket" in window) {
            console.log("WebSocket is supported by your browser!");
            this.ws = new WebSocket(url);
            let status = {
                status: "success"
            };
            this.ws.onopen = function () {
                // Web Socket is connected, send data using send()
                // ws.send("Message to send");
                self.onSuccess(JSON.stringify(status));
            };

            this.ws.onmessage = function (evt) {
                var received_msg = evt.data;
                console.log("user 1 Message is received...");
                self.onMessage(JSON.parse(received_msg));
            };

            this.ws.onerror = function () {
                self.onError();
            };

            console.log("this.ws ",this.ws);
        } else {
            self.onError();
            console.log("WebSocket is not supported by your browser!");
        }
    }
    initialize(baseUrl, idToken, accessToken, callbackURL) {
        console.log("WebSocketConnection, initialize");
        let username = Extract.username(idToken);
        let url = "wss://[0]/cpaas/notificationchannel/v1/[1]/channels/[2]/websocket?access_token=[3]".graft(
            baseUrl,
            username.preferred_username,
            callbackURL,
            accessToken
        );
        console.log("websocket url " + url);
        this.request(url);
    }
}// @file userchannel.js
class UserChannel {
    constructor() {
        this.container = document.querySelector("#channel");
        this.xhrLog = new XHRLog(this.container);
        this.status = new Status(this.container.querySelector(".status"));
    }
    set proceedTo(fn) {
        this.proceed = fn;
    }
    get channelData() {
        return this.channel;
    }
    get channelDataSecondUser() {
        return this.channelSecondUser;
    }
    onSuccess(data,userType) {
        
        if(userType == Preferences.userFirst){
            this.channel = data;
            this.status.success();
            this.xhrLog.initialize(JSON.stringify(data, null, 4));     
        }else{
            this.channelSecondUser = data;
        }
        this.proceed(data,userType);
        
    }
    onFailure() {
        this.status.failure();
    }
    onError() {
        this.status.error();
    }
    request(url, accessToken, cargo,userType) {
        var self = this;
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 400)
                self.onSuccess(JSON.parse(this.responseText),userType);
            else{
                if(userType == Preferences.userFirst){
                    self.onFailure();
                }
            }
                
        };
        xhr.onerror = self.onError;
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.timeout = 15000; // in milliseconds
        xhr.ontimeout = function() {
            console.log('UserChannel, timeout');
            self.onError();
        }
        xhr.send(JSON.stringify(cargo));
    }
    destroy() {
        this.status.failure();
        this.xhrLog.destroy();
    }
    initialize(cpaasUrl, idToken, accessToken,userType) {
        console.log('UserChannel, initialize');
        let username = Extract.username(idToken);
        let url = cpaasUrl + "notificationchannel/v1/" + username.preferred_username + "/channels";
        let cargo = {
            notificationChannel: {
                channelLifetime: 3600,
                channelType: "Websockets",
                clientCorrelator: username.preferred_username,
                'x-connCheckRole': "client"
            }
        };
        this.request(url, accessToken, cargo,userType);
    }
}class WebrtcSubscription {
    constructor() {
        this.container = document.querySelector("#webrtcsubscription");
        this.xhrLog = new XHRLog(this.container);
        this.status = new Status(this.container.querySelector(".status"));
    }
    set proceedTo(fn) {
        this.proceed = fn;
    }
    set skipTo(fn) {
        this.skip = fn;
    }
    onSuccess(data,userType) {
        if(userType == Preferences.userFirst){
            this.status.success();
            this.xhrLog.initialize(JSON.stringify(data, null, 4));
        }
        this.proceed(data,userType);
    }
    onFailure() {
        this.status.failure();
        this.skip();
    }
    onError() {
        this.status.error();
    }
    destroy() {
        this.status.failure();
        this.xhrLog.destroy();
    }
    request(url, accessToken, cargo,userType) {
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 400)
                self.onSuccess(JSON.parse(this.responseText),userType);
            else
                self.onFailure();
        };
        xhr.onerror = self.onError;
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.send(JSON.stringify(cargo));
    }
    initialize(cpaasUrl,idToken, accessToken, callbackURL,userType) {
        console.log('WebrtcSubscription, initialize');
        console.log("idToken",idToken);
        let username = Extract.username(idToken);
        let url = ("[0]webrtcsignaling/v1/[1]/subscriptions").graft(
            cpaasUrl,
            username.preferred_username
        );
        let cargo = {
           "wrtcsNotificationSubscription": {
             "callbackReference": {
              "notifyURL": callbackURL
             },
             "clientCorrelator": username.preferred_username
           }
        };
        this.request(url, accessToken, cargo,userType);
    }
}// @file sdpgenerate.js
class SdpGenerate {
    constructor() {
        window.IceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate || window.RTCIceCandidate;
        window.RTCPeerConnection = webkitRTCPeerConnection || mozRTCPeerConnection;
        var pc_config = {
            "iceServers": [{
                "url": "stun:stun1.l.google.com:19302"
            }]
        };
        this.pc = "";
        this.streamReference = null;
    }
    startStream() {
        navigator.getUserMedia({
                audio: true,
                video: true
            },
            (stream) => this.dumpOffer(stream),
            (err) => this.errorCallback(err)
        );
    }
    stopStream() {
        console.log("SdpGenerate, stopStream");
        if (!this.streamReference) return;
        this.streamReference.getAudioTracks().forEach(function(track) {
            track.stop();
        });
        this.streamReference.getVideoTracks().forEach(function(track) {
            track.stop();
        });
        this.streamReference = null;
    }
    dumpOffer(stream) {
        console.log("SdpGenerate, dumpOffer, stream", stream);
        this.streamReference = stream;
        this.pc.addStream(stream);
        this.pc.createOffer((offer) => this.rtpOffer(offer), (err) => this.errorCallback(err));
    };
    rtpOffer(offer) {
        this.pc.setLocalDescription(offer);
        console.log("SdpGenerate, rtpOffer, sdp", offer.sdp);
        this.sdpData = offer.sdp;
    }
    errorCallback(e) {
        if (e.code == 1) {
            alert('User denied access to their camera');
        } else {
            alert('getUserMedia() not supported in your browser.');
        }
    }
    set sdpData(sdp) {
        this.sdpValue = sdp;
    }
    get sdpData() {
        return this.sdpValue;
    }
    initialize() {
        try {
            this.pc = new RTCPeerConnection(this.pc_config);
            console.log("SdpGenerate, initialize, pc", this.pc);
            this.pc.onicecandidate = function(evt) {
                if (evt.candidate) {
                    console.log('SdpGenerate, ICE candidate:', evt.candidate);
                } else {
                    console.log("SdpGenerate, End of candidates.");
                    if (this.pc != null) {
                        var sdp = pc.localDescription;
                        console.log("SdpGenerate, initialize, sdp", sdp);
                    }
                }
            };
        } catch (e) {
            console.log("SdpGenerate, initialize, Failed to create PeerConnection, exception", e.message);
        }
    }
}// @file makecall.js
class MakeCall {
    constructor() {
        this.container = document.querySelector("#webrtcmakecall");
        this.xhrLog = new XHRLog(this.container);
        this.status = new Status(this.container.querySelector(".status"));
    }
    set proceedTo(fn) {
        this.proceed = fn;
    }
    set skipTo(fn) {
        this.skip = fn;
    }

    get callResponse() {
        return this.makeCallResponse;
    }
    onSuccess(data) {
        this.makeCallResponse = data;
        this.status.success();
        this.xhrLog.initialize(JSON.stringify(data, null, 4));
        this.proceed(data);
    }
    onCallEndSuccess(data) {
        this.status.success();
        this.xhrLog.initialize(JSON.stringify(data, null, 4));
        this.proceedEnd(data);
    }
    onSuccessAnswerCall(data) {
        this.status.success();
        this.xhrLog.initialize(JSON.stringify(data, null, 4));
        this.proceedAnswer(data);
    }
    onFailure() {
        this.status.failure();
        this.skip();
    }
    onError() {
        this.status.error();
    }
    destroy() {
        this.status.failure();
        this.xhrLog.destroy();
    }
    request(url, accessToken, cargo) {
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 400)
                self.onSuccess(JSON.parse(this.responseText));
            else
                self.onFailure();
        };
        xhr.onerror = self.onError;
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.send(JSON.stringify(cargo));
    }

    initialize(cpaasUrl, idToken, accessToken, callbackURL, sdp) {
        console.log('Voice Call, initialize');
        let username = Extract.username(idToken);
        let url = cpaasUrl + "webrtcsignaling/v1/" + username.preferred_username + "/sessions";
        let cargo = {
            "wrtcsSession": {
                "tParticipantAddress": Preferences.callToUser,
                "offer": {
                    "sdp": sdp
                },
                "clientCorrelator": username.preferred_username
            }
        };
        this.request(url, accessToken, cargo);
    }
}// @file answercall.js
class AnswerCall {
    constructor() {
        this.container = document.querySelector("#webrtcanswercall");
        this.xhrLog = new XHRLog(this.container);
        this.status = new Status(this.container.querySelector(".status"));
    }
    set proceedTo(fn) {
        this.proceed = fn;
    }
    set skipTo(fn) {
        this.skip = fn;
    }
    onSuccess(data) {
        this.makeCallResponse = data;
        this.status.success();
        this.xhrLog.initialize(JSON.stringify(data, null, 4));
        this.proceed(data);
    }
    onFailure() {
        this.status.failure();
        this.skip();
    }
    onError() {
        this.status.error();
    }
    destroy() {
        this.status.failure();
        this.xhrLog.destroy();
    }
    request(url, accessToken, cargo) {
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", url, true);
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 400)
                self.onSuccess(JSON.parse(this.responseText));
            else
                self.onFailure();
        };
        xhr.onerror = self.onError;
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.send(JSON.stringify(cargo));
    }
    initialize(cpaasUrl, idToken, accessToken, resourceUrl, sdp) {
        console.log('AnswerCall, initialize');

        let username = Extract.username(idToken);
        let url = cpaasUrl + resourceUrl + "/answer";
        let cargo = {
            "wrtcsAnswer": {
                "sdp": sdp,
                "clientCorrelator": username.preferred_username
            }
        };

        this.request(url, accessToken, cargo);
    }
}// @file endcall.js
class EndCall {
    constructor() {
        this.container = document.querySelector("#webrtcendcall");
        this.xhrLog = new XHRLog(this.container);
        this.status = new Status(this.container.querySelector(".status"));
    }
    set proceedTo(fn) {
        this.proceed = fn;
    }
    set skipTo(fn) {
        this.skip = fn;
    }
    onSuccess(data) {
        this.makeCallResponse = data;
        this.status.success();
        this.xhrLog.initialize(JSON.stringify(data, null, 4));
        this.proceed(data);
    }
    onFailure() {
        this.status.failure();
        this.skip();
    }
    onError() {
        this.status.error();
    }
    destroy() {
        this.status.failure();
        this.xhrLog.destroy();
    }
    request(url, accessToken, cargo) {
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", url, true);
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 400)
                self.onSuccess("NA");
            else
                self.onFailure();
        };
        xhr.onerror = self.onError;
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.send();
    }
    initialize(cpaasUrl, idToken, accessToken, resourceUrl) {
        console.log('EndCall, initialize');

        let username = Extract.username(idToken);
        let url = cpaasUrl + resourceUrl;

        this.request(url, accessToken, null);
    }
}// @file holdcall.js
class HoldCall {
    constructor() {
        this.container = document.querySelector("#webrtcholdcall");
        this.xhrLog = new XHRLog(this.container);
        this.status = new Status(this.container.querySelector(".status"));
    }
    set proceedTo(fn) {
        this.proceed = fn;
    }
    set skipTo(fn) {
        this.skip = fn;
    }
    onSuccess(data) {
        this.makeCallResponse = data;
        this.status.success();
        this.xhrLog.initialize(JSON.stringify(data, null, 4));
        this.proceed(data);
    }
    onFailure() {
        this.status.failure();
        this.skip();
    }
    onError() {
        this.status.error();
    }
    destroy() {
        this.status.failure();
        this.xhrLog.destroy();
    }
    request(url, accessToken, cargo) {
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", url, true);
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 401)
                self.onSuccess(JSON.parse(this.responseText));
            else
                self.onFailure();
        };
        xhr.onerror = self.onError;
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.send(JSON.stringify(cargo));
    }
    initialize(cpaasUrl, idToken, accessToken, resourceUrl, sdp) {
        console.log('HoldCall, initialize');

        let username = Extract.username(idToken);
        let url = cpaasUrl + resourceUrl + "/update";
        let cargo = {
            "wrtcsOffer": {
                "sdp": sdp,
                "clientCorrelator": username.preferred_username
            }
        };

        this.request(url, accessToken, cargo);
    }
}// @file websocketconnectionseconduser.js
class WebSocketConnectionSecondUser {
    constructor() {
        // this.container = document.querySelector("#websocket");
        // this.xhrLog = new XHRLog(this.container);
        // this.status = new Status(this.container.querySelector(".status"));
        this.ws = null;
    }
    set proceedTo(fn) {
        this.proceed = fn;
    }

    set messageTo(fn) {
        this.messageResponse = fn;
    }

    onSuccess(data) {
        //this.status.success();
        //this.xhrLog.initialize(data);
        this.proceed(data);
    }

    onMessage(data) {
        //this.status.success();
        //this.xhrLog.initialize(data);
        this.messageResponse(data);
    }

    onFailure() {
        //this.status.failure();
    }
    onError() {
        //this.status.error();
    }
    destroy() {
        // this.status.failure();
        // this.xhrLog.destroy();
    }

    closeSocket() {
        console.log("close websockt of user 2");
        if (this.ws.close) {
            console.log("close websockt of user 2 If condition");
            this.ws.close();
            //this.ws.disconnect();
        } else {
            console.log("close websockt of user 2 Else condition");
            this.ws.onclose = null;
        }

        this.ws.onmessage = null;
        this.ws.onopen = null;
        this.ws.onerror = null;
    }
    request(url) {
        var self = this;
        if ("WebSocket" in window) {
            console.log("WebSocket is supported by your browser!");
            this.ws = new WebSocket(url);
            let status = {
                status: "success"
            };
            this.ws.onopen = function() {
                // Web Socket is connected, send data using send()
                // ws.send("Message to send");
                self.onSuccess(JSON.stringify(status));
            };

            this.ws.onmessage = function(evt) {
                var received_msg = evt.data;
                //alert("user 2 Message is received...");
                console.log("user 2 Message is received...");
                self.onMessage(JSON.parse(received_msg));
            };

            this.ws.onerror = function() {
                self.onError();
            };
        } else {
            self.onError();
            console.log("WebSocket is not supported by your browser!");
        }
    }
    initialize(baseUrl, idToken, accessToken, callbackURL) {
        console.log("WebSocketConnection Second User, initialize");
        let username = Extract.username(idToken);
        let url = "wss://[0]/cpaas/notificationchannel/v1/[1]/channels/[2]/websocket?access_token=[3]".graft(
            baseUrl,
            username.preferred_username,
            callbackURL,
            accessToken
        );
        console.log("websocketseconduser url " + url);
        this.request(url);
    }
}// @file smssend.js
class SmsSend {
    constructor() {
        this.container = document.querySelector("#sendsms");
        this.xhrLog = new XHRLog(this.container);
        this.status = new Status(this.container.querySelector(".status"));
    }
    set proceedTo(fn) {
        this.proceed = fn;
    }
    set skipTo(fn) {
        this.skip = fn;
    }
    onSuccess(data) {
        this.status.success();
        this.xhrLog.initialize(JSON.stringify(data, null, 4));
        this.proceed(data);
    }
    onFailure() {
        this.status.failure();
        this.skip();
    }
    onError() {
        this.status.error();
        this.skip();
    }
    destroy() {
        this.status.failure();
        this.xhrLog.destroy();
    }
    request(url, accessToken, cargo) {
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 400)
                self.onSuccess(JSON.parse(this.responseText));
            else
                self.onFailure();
        };
        xhr.onerror = self.onError;
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.timeout = 15000; // in milliseconds
        xhr.ontimeout = function () {
            console.log('Send SMS, timeout');
            self.onError();
        }
        xhr.send(JSON.stringify(cargo));
    }

    initialize(cpaasUrl, idToken, accessToken) {
        console.log('SMS Send, initialize');
        let username = Extract.username(idToken);
        let url = cpaasUrl + 'auth/v1/' + username.preferred_username + '/codes';
        console.log('via SMS URL: ' + cpaasUrl);
        let cargo = {
            "code": {
                "address": [Preferences.smsVerificationNumber],
                "method": "sms",
                "format": {
                    "length": 6,
                    "type": "numeric"
                },
                "expiry": 120,
                "message": "Your code is {code}"
            }
        };
        this.request(url, accessToken, cargo);
    }
}// @file smsverify.js
class SmsVerify {
    constructor() {
        this.container = document.querySelector("#verifysms");
        this.xhrLog = new XHRLog(this.container);
        this.status = new Status(this.container.querySelector(".status"));
    }
    set proceedTo(fn) {
        this.proceed = fn;
    }
    set skipTo(fn) {
        this.skip = fn;
    }
    onSuccess(data) {
        this.status.success();
        this.xhrLog.initialize(JSON.stringify(data, null, 4));
        this.proceed(data);
    }
    onFailure() {
        this.status.failure();
        this.skip();
    }
    onError() {
        this.status.error();
        this.skip();
    }
    destroy() {
        this.status.failure();
        this.xhrLog.destroy();
    }
    request(url, accessToken, cargo) {
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", url, true);
        xhr.onload = function () {
            if (this.status == 204 || this.status == 404)
                self.onSuccess("OTP verified sussessfully");
            else
                self.onFailure();
        };
        xhr.onerror = self.onError;
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.timeout = 15000; // in milliseconds
        xhr.ontimeout = function () {
            console.log('Send SMS, timeout');
            self.onError();
        }
        xhr.send(JSON.stringify(cargo));
    }

    initialize(cpaasUrl, idToken, accessToken) {
        console.log('SMS verify, initialize');
        let url = cpaasUrl + '/verify';
        console.log('via SMS verify URL: ' + cpaasUrl);
        let cargo = {
            "code": {
                "verify": '123456'
            }
        };
        this.request(url, accessToken, cargo);
    }
}// @file emailsend.js
class EmailSend {
    constructor() {
        this.container = document.querySelector("#sendemail");
        this.xhrLog = new XHRLog(this.container);
        this.status = new Status(this.container.querySelector(".status"));
    }
    set proceedTo(fn) {
        this.proceed = fn;
    }
    set skipTo(fn) {
        this.skip = fn;
    }
    onSuccess(data) {
        this.status.success();
        this.xhrLog.initialize(JSON.stringify(data, null, 4));
        this.proceed(data);
    }
    onFailure() {
        this.status.failure();
        this.skip();
    }
    onError() {
        this.status.error();
        this.skip();
    }
    destroy() {
        this.status.failure();
        this.xhrLog.destroy();
    }
    request(url, accessToken, cargo) {
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 400)
                self.onSuccess(JSON.parse(this.responseText));
            else
                self.onFailure();
        };
        xhr.onerror = self.onError;
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.timeout = 15000; // in milliseconds
        xhr.ontimeout = function () {
            console.log('Send SMS, timeout');
            self.onError();
        }
        xhr.send(JSON.stringify(cargo));
    }

    initialize(cpaasUrl, idToken, accessToken) {
        console.log('Email Send, initialize');
        let username = Extract.username(idToken);
        let url = cpaasUrl + 'auth/v1/' + username.preferred_username + '/codes';
        console.log('via Email URL: ' + cpaasUrl);
        let cargo = {
            code: {
                address: [Preferences.emailVerificationId],
                method: "email",
                format: {
                    length: 10,
                    type: "alphanumeric"
                },
                expiry: 3600,
                message: "Your code is {code}",
                subject: "Auth code from ribbon"
            }
        };
        this.request(url, accessToken, cargo);
    }
}// @file emailverify.js
class EmailVerify {
    constructor() {
        this.container = document.querySelector("#verifyemail");
        this.xhrLog = new XHRLog(this.container);
        this.status = new Status(this.container.querySelector(".status"));
    }
    set proceedTo(fn) {
        this.proceed = fn;
    }
    set skipTo(fn) {
        this.skip = fn;
    }
    onSuccess(data) {
        this.status.success();
        this.xhrLog.initialize(JSON.stringify(data, null, 4));
        this.proceed(data);
    }
    onFailure() {
        this.status.failure();
        this.skip();
    }
    onError() {
        this.status.error();
        this.skip();
    }
    destroy() {
        this.status.failure();
        this.xhrLog.destroy();
    }
    request(url, accessToken, cargo) {
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", url, true);
        xhr.onload = function () {
            if (this.status == 204 || this.status == 404)
                self.onSuccess("OTP verified sussessfully");
            else
                self.onFailure();
        };
        xhr.onerror = self.onError;
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.timeout = 15000; // in milliseconds
        xhr.ontimeout = function () {
            console.log('Send SMS, timeout');
            self.onError();
        }
        xhr.send(JSON.stringify(cargo));
    }

    initialize(cpaasUrl, idToken, accessToken) {
        console.log('Email verify, initialize');
        let url = cpaasUrl + '/verify';
        console.log('via email verify URL: ' + cpaasUrl);
        let cargo = {
            "code": {
                "verify": '123456'
            }
        };
        this.request(url, accessToken, cargo);
    }
}// @file main.js
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
    var makeCall = new MakeCall();
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
        makeCall.destroy();
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

        endCall.proceedTo = function (data) {
            console.log('endCall:', data);
            appBar.abortMonitor();
        }
        endCall.skipTo = function() {
            console.log('endCall, skipped');
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
            (Preferences.toMonitor) ? smsSend.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token
            ): appBar.abortMonitor();

        }
        answerCall.skipTo = function () {
            console.log('answerCall: skipped');
            (Preferences.toMonitor) ? smsSend.initialize(cpaasUrl,
                userToken.tokenData.id_token,
                userToken.tokenData.access_token
            ): appBar.abortMonitor();
        }

        makeCall.proceedTo = function (data) {
            console.log('makeCallStatus:', data);
        }
        makeCall.skipTo = function () {
            console.log('makeCall: skipped');
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
                (Preferences.toMonitor && Preferences.enableVoice) ? makeCall.initialize(cpaasUrl,
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