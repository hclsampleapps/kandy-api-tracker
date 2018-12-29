var Preferences = {
    toMonitor: false,
    enableSMS: false,
    enableChat: false,
    enablePresence: false,
    baseUrl: "nvs-cpaas-oauth.kandy.io",
    projectName: "PUB-My Sms Project 2",
    username: "d3smc2e0j3srxx0g",
    password: "3E7pCDsFqY1fn4p4"
};

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
}

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
}

class Extract {
    static username(token) {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
}

class AppBar {
    constructor() {}
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
        this.runMonitor = fn;
    }
    startMonitor(evt) {
        evt.preventDefault();
        this.defaultState();
        Preferences.toMonitor = true;
        this.runMonitor();
        Effect.hide(this.menuPlay);
        Effect.show(this.menuPause);
    }
    stopMonitor(evt) {
        evt.preventDefault();
        Preferences.toMonitor = false;
    }
    finishMonitor() {
        Effect.show(this.menuPlay);
        Effect.hide(this.menuPause);
        Preferences.toMonitor = false;
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
}

class Controls {
    constructor() {}
    save(evt) {
        Preferences.enableSMS = !!this.enableSMS.checked;
        Preferences.enableChat = !!this.enableChat.checked;
        Preferences.enablePresence = !!this.enablePresence.checked;

        Preferences.baseUrl = this.baseUrl.value;
        Preferences.projectName = this.projectName.value;
        Preferences.username = this.username.value;
        Preferences.password = this.password.value;
    }
    defaultState() {
        this.enableSMS.checked = Preferences.enableSMS;
        this.enableChat.checked = Preferences.enableChat;
        this.enablePresence.checked = Preferences.enablePresence;

        this.baseUrl.value = Preferences.baseUrl;
        this.projectName.value = Preferences.projectName;
        this.username.value = Preferences.username;
        this.password.value = Preferences.password;
    }
    attachEvents() {
        this.savePreference.addEventListener("click", (evt) => this.save(evt));
    }
    initialize() {
        this.enableSMS = document.getElementById("enablesms");
        this.enableChat = document.getElementById("enablechat");
        this.enablePresence = document.getElementById("enablepresence");

        this.baseUrl = document.getElementById("baseurl");
        this.projectName = document.getElementById("projectname");
        this.username = document.getElementById("username");
        this.password = document.getElementById("password");

        this.savePreference = document.getElementById("savepreference");
        this.attachEvents();

        this.defaultState();
    }
}

class UserToken {
    constructor(cpaasUrl, project, username, password) {
        this.cpaasUrl = cpaasUrl;
        this.project = project;
        this.username = username;
        this.password = password;

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
    onSuccess(data) {
        this.status.success();
        this.token = data;
        this.xhrLog.initialize(JSON.stringify(data, null, 4));
        this.proceed(data);
    }
    onFailure() {
        this.status.failure();
    }
    onError() {
        this.status.error();
    }
    request(url, cargo) {
        var self = this;
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 400)
                self.onSuccess(JSON.parse(this.responseText));
            else
                self.onFailure();
        };
        xhr.onerror = this.onError;
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(Convert.jsonToUri(cargo));
    }
    destroy() {
        this.status.failure();
        this.xhrLog.destroy();
    }
    initialize() {
        console.log('UserToken, initialize');
        let cargo = {
            client_id: encodeURIComponent(this.project.trim()),
            username: this.username,
            password: this.password,
            grant_type: 'password',
            scope: 'openid'
        };
        this.request(this.cpaasUrl + "auth/v1/token", cargo);
    }
}

class UserChannel {
    constructor(cpaasUrl) {
        this.cpaasUrl = cpaasUrl;

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
    onSuccess(data) {
        this.status.success();
        this.channel = data;
        this.xhrLog.initialize(JSON.stringify(data, null, 4));
        this.proceed(data);
    }
    onFailure() {
        this.status.failure();
    }
    onError() {
        this.status.error();
    }
    request(url, accessToken, cargo) {
        var self = this;
        let xhr = new XMLHttpRequest();
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
    destroy() {
        this.status.failure();
        this.xhrLog.destroy();
    }
    initialize(idToken, accessToken) {
        console.log('UserChannel, initialize');
        let username = Extract.username(idToken);
        let url = this.cpaasUrl + "notificationchannel/v1/" + username.preferred_username + "/channels";
        let cargo = {
            notificationChannel: {
                channelLifetime: 3600,
                channelType: "Websockets",
                clientCorrelator: "sampleCorrelator",
                'x-connCheckRole': "client"
            }
        };
        this.request(url, accessToken, cargo);
    }
}

whenReady(function() {
    console.log('begin');

    var cpaasUrl = 'https://' + Preferences.baseUrl + '/cpaas/';

    var userToken = new UserToken(cpaasUrl, Preferences.projectName, Preferences.username, Preferences.password);
    var userChannel = new UserChannel(cpaasUrl);

    var controls = new Controls();
    controls.initialize();

    var appBar = new AppBar();
    appBar.execute = function() {
        userToken.destroy();
        userChannel.destroy();

        userChannel.proceedTo = function(data) {
            console.log('UserChannel:', data);
            appBar.finishMonitor();
        };
        userToken.proceedTo = function(data) {
            console.log('UserToken:', data);
            (Preferences.toMonitor) ? userChannel.initialize(data.id_token, data.access_token) : appBar.finishMonitor();
        };
        (Preferences.toMonitor) ? userToken.initialize() : appBar.finishMonitor();
    }
    appBar.initialize();
});