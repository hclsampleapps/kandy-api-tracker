// @file voicecall.js
class VoiceCall {
    constructor() {
        this.container = document.querySelector("#webrtcvoicecall");
        this.xhrLog = new XHRLog(this.container);
        this.status = new Status(this.container.querySelector(".status"));
    }
    set proceedTo(fn) {
        this.proceed = fn;
    }
    set skipTo(fn) {
        this.skip = fn;
    }
    get callResponse() {
        return this.makeCallResponse;
    }
    onSuccess(data) {
        this.makeCallResponse = data;
        this.status.success();
        this.xhrLog.initialize(JSON.stringify(data, null, 4));
        this.proceed(data);
    }
    onCallEndSuccess(data) {
        this.status.success();
        this.xhrLog.initialize(JSON.stringify(data, null, 4));
        this.proceedEnd(data);
    }
    onSuccessAnswerCall(data) {
        this.status.success();
        this.xhrLog.initialize(JSON.stringify(data, null, 4));
        this.proceedAnswer(data);
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

    initialize(cpaasUrl, idToken, accessToken, callbackURL, sdp) {
        console.log('Voice Call, initialize');
        let username = Extract.username(idToken);
        let url = cpaasUrl + "webrtcsignaling/v1/" + username.preferred_username + "/sessions";
        let cargo = {
            "wrtcsSession": {
                "tParticipantAddress": Preferences.callToUser,
                "offer": {
                    "sdp": sdp
                },
                "clientCorrelator": username.preferred_username
            }
        };
        this.request(url, accessToken, cargo);
    }
}