// @file emailsend.js
class EmailSend {
    constructor() {
        this.container = document.querySelector("#sendEmail");
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
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 400)
                self.onSuccess(JSON.parse(this.responseText));
            else
                self.onFailure();
        };
        xhr.onerror = self.onError;
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.timeout = 15000; // in milliseconds
        xhr.ontimeout = function () {
            console.log('Send SMS, timeout');
            self.onError();
        }
        xhr.send(JSON.stringify(cargo));
    }

    initialize(cpaasUrl, idToken, accessToken) {
        console.log('Email Send, initialize');
        let username = Extract.username(idToken);
        let url = cpaasUrl + 'auth/v1/' + username.preferred_username + '/codes';
        console.log('via Email URL: ' + cpaasUrl);
        let cargo = {
            code: {
                address: [Preferences.emailVerificationId],
                method: "email",
                format: {
                    length: 10,
                    type: "alphanumeric"
                },
                expiry: 3600,
                message: "Your code is {code}",
                subject: "Auth code from ribbon"
            }
        };
        this.request(url, accessToken, cargo);
    }
}