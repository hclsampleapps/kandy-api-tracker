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

class Extract {
    static username(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
}

class UserToken {
    constructor(cpaasUrl, project, username, password) {
        this.cpaasUrl = cpaasUrl;
        this.project = project;
        this.username = username;
        this.password = password;
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
        var xhr = new XMLHttpRequest();
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
    initialize() {
        console.log('UserToken, initialize');
        this.status = new Status(document.getElementById("tokenstatus"));
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
    }
    set proceedTo(fn) {
        this.proceed = fn;
    }
    onSuccess(data) {
        this.status.success();
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
    initialize(idToken, accessToken) {
        console.log('UserChannel, initialize');
        this.status = new Status(document.getElementById("channelstatus"));
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

    var baseUrl = document.getElementById("baseurl").value;
    var cpaasUrl = 'https://' + baseUrl + '/cpaas/';

    var userToken = new UserToken(cpaasUrl, "PUB-My Sms Project 2", "d3smc2e0j3srxx0g", "3E7pCDsFqY1fn4p4");
    var userChannel = new UserChannel(cpaasUrl);

    userToken.proceed = function(data) {
        console.log('UserToken:', data);
        userChannel.initialize(data.id_token, data.access_token);
    }
    userToken.initialize();
});