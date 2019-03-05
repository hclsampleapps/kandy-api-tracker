// @file userchannel.js
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
    initialize(cpaasUrl, idToken, accessToken) {
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
        this.request(url, accessToken, cargo);
    }
}