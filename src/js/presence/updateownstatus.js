// @file updateownstatus.js
class UpdateOwnStatus {
    constructor(cpaasUrl) {
        this.cpaasUrl = cpaasUrl;
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
        xhr.onload = function () {
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
        console.log('UpdateOwnStatus, initialize');
        let username = Extract.username(idToken);
        let url = this.cpaasUrl + "presence/v1/" + username.preferred_username + "/presenceSources";
        var cargo = {
            "presenceSource": {
                "presence": {
                    "person": {
                        "overriding-willingness": { 
                            "overridingWillingnessValue": "Open" 
                        },
                        "activities": { 
                            "activityValue": Preferences.setstatuspresence 
                        }
                    }
                },
                "clientCorrelator": username.preferred_username
            }
        };
        this.request(url, accessToken, cargo);
    }
}