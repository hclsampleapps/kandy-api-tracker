// @file smsverify.js
class SmsVerify {
    constructor() {
        this.container = document.querySelector("#verifysms");
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
        xhr.open("PUT", url, true);
        xhr.onload = function () {
            if (this.status == 204 || this.status == 404)
                self.onSuccess("OTP verified sussessfully");
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
        console.log('SMS verify, initialize');
        let url = cpaasUrl + '/verify';
        console.log('via SMS verify URL: ' + cpaasUrl);
        let cargo = {
            "code": {
                "verify": '123456'
            }
        };
        this.request(url, accessToken, cargo);
    }
}