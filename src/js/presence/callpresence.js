// @file callpresence.js
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
        
        let code = this.presence.presenceListCollection.presenceList[0].resourceURL;
        console.log("resourceURL======"+code);
        return code.substr(code.lastIndexOf('/') + 1);
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
    }
    destroy() {
        this.status.failure();
        this.xhrLog.destroy();
    }
    request(url, accessToken) {
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
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
        xhr.send();
    }
    initialize(cpaasUrl,idToken, accessToken) {
        console.log('CallPresence, initialize');
        let username = Extract.username(idToken);
        let url = cpaasUrl + "presence/v1/" + username.preferred_username + "/presenceLists";
        this.request(url, accessToken);
    }
  
}