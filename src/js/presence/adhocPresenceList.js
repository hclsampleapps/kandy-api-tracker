// @file adhocPresenceList.js
class AdhocPresenceList {
    constructor() {
        this.container = document.querySelector("#adhocPresenceList");
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
        xhr.timeout = 15000; // Set timeout to 4 seconds (4000 milliseconds)
        xhr.ontimeout = function () {
            console.log("timeout");
            self.onFailure();
        }
        xhr.send(JSON.stringify(cargo));
    }
    initialize(cpaasUrl,idToken, accessToken,presentityUserId) {
        console.log('adhocPresenceList, initialize');
        let username = Extract.username(idToken);
        let url = ("[0]presence/v1/[1]/adhocPresenceList").graft(
            cpaasUrl,
            username.preferred_username
        );
        var cargo = { "adhocPresenceList": { "presentityUserId": [presentityUserId] } }

        this.request(url, accessToken, cargo);
    }
}