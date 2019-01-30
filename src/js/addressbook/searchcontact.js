// @file searchcontact.js
class SearchContact {
    constructor() {
        this.container = document.querySelector("#searchcontact");
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
    request(url, accessToken) {
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
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
            console.log('SearchContact, timeout');
            self.onError();
        }
        xhr.send();
    }
    initialize(cpaasUrl, idToken, accessToken, searchfirstname) {
        console.log('SearchContact, initialize');
        let username = Extract.username(idToken);
        let url = "[0]directory/v1/[1]/default/search?order=asc&sortBy=name&userName=[2]".graft(
            cpaasUrl,
            username.preferred_username,
            searchfirstname
        );

        this.request(url, accessToken);
    }
}