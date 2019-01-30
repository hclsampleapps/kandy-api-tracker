// @file callpresencelistsubscriptions.js
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
                "clientCorrelator": username.preferred_username,
                "duration": 86400
            }
        };
        this.request(url, accessToken, cargo);
    }
}