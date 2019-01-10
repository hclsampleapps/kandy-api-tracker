// @file callsubsciption.js
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
}