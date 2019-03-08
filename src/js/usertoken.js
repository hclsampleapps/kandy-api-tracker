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

    get tokenDataSecondUser() {
        return this.tokenSecondUser;
    }

    onSuccess(data,userType) {
        
        if(userType == Preferences.userFirst){
            this.token = data;
            this.status.success();
            this.xhrLog.initialize(JSON.stringify(data, null, 4));
        }else{
            this.tokenSecondUser = data;
        }        
        this.proceed(data,userType);
    }
    onFailure() {
        this.status.failure();
    }
    onError() {
        this.status.error();
    }
    request(url, cargo,userType) {
        var self = this;
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 400)
                self.onSuccess(JSON.parse(this.responseText),userType);
            else
                self.onFailure();
        };
        xhr.onerror = this.onError;
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.timeout = 15000; // in milliseconds
        xhr.ontimeout = function() {
            console.log('UserToken, timeout');
            self.onError();
        }
        xhr.send(Convert.jsonToUri(cargo));
    }
    destroy() {
        this.status.failure();
        this.xhrLog.destroy();
    }
    initialize(cpaasUrl, projectName, username, password,userType) {
        console.log('UserToken '+ userType +' initialize');

        let cargo = {
            client_id: encodeURIComponent(projectName),
            username: username,
            password: password,
            grant_type: 'password',
            scope: 'openid'
        };
        this.request(cpaasUrl + "auth/v1/token", cargo,userType);

    }
    initializeSecret(cpaasUrl, client_id, client_secret) {
        console.log('UserToken, initialize');

        let cargo = {
            client_id: client_id,
            client_secret: client_secret,
            grant_type: 'client_credentials',
            scope: 'openid'
        };
        this.request(cpaasUrl + "auth/v1/token", cargo);
    }
}