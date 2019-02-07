// @file endcall.js
class EndCall {
    constructor() {
        this.container = document.querySelector("#webrtcEndCall");
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
        this.makeCallResponse = data;
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
    }
    destroy() {
        this.status.failure();
        this.xhrLog.destroy();
    }
    request(url, accessToken, cargo) {
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", url, true);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 400)
                self.onSuccess("NA");
                //self.onSuccess(JSON.parse(this.responseText));
            else
                self.onFailure();
        };
        xhr.onerror = self.onError;
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.send();
    }

    
    initialize(cpaasUrl,idToken, accessToken,resourceUrl){
        console.log('Answer Call, initialize');

        console.log('Voice End Call, initialize');
        let username = Extract.username(idToken);
        let url = cpaasUrl + resourceUrl;
       
        this.request(url, accessToken, null);
    }
}