// @file watchuserstatus.js
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
}