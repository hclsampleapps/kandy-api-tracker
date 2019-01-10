// @file usertoken.js
class UserToken {
    constructor() {
        this.container = document.querySelector("#token");
        this.xhrLog = new XHRLog(this.container);
        this.status = new Status(this.container.querySelector(".status"));
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
        this.xhrLog.initialize(JSON.stringify(data, null, 4));
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
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 400)
                self.onSuccess(JSON.parse(this.responseText));
            else
                self.onFailure();
        };
        xhr.onerror = this.onError;
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.timeout = 15000; // in milliseconds
        xhr.ontimeout = function () {
            console.log('UserToken, timeout');
            self.onError();
        }
        xhr.send(Convert.jsonToUri(cargo));
    }
    destroy() {
        this.status.failure();
        this.xhrLog.destroy();
    }
    initialize(cpaasUrl,projectName,username,password) {
        console.log('UserToken, initialize');
        let cargo = {
            client_id: encodeURIComponent(projectName),
            username: username,
            password: password,
            grant_type: 'password',
            scope: 'openid'
        };
        this.request(cpaasUrl + "auth/v1/token", cargo);
    }
}
