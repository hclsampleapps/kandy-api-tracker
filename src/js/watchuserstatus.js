// @file watchuserstatus.js
class WatchUserStatus {
    constructor(cpaasUrl) {
        this.cpaasUrl = cpaasUrl;
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
    initialize(idToken, accessToken, responsepresenceLists) {
        console.log('watchUserStatus, initialize');
        let username = Extract.username(idToken);
        let url = this.cpaasUrl + "presence/v1/" + username.preferred_username + "/presenceLists/" + responsepresenceLists + "/presenceContacts/ashish07@idx4.com";
        var cargo = {
            "presenceContact": {
                "presentityUserId": Preferences.presentityUserId
            }
        };
        this.request(url, accessToken, cargo);
    }
}