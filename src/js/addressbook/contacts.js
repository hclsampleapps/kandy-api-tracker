// @file contacts.js
class Contacts {
    constructor(cpaasUrl) {
        this.cpaasUrl = cpaasUrl;
        this.container = document.querySelector("#contactstatus");
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
            console.log('Contacts, timeout');
            self.onFailure();
        }
        xhr.send(JSON.stringify(cargo));
    }
    initialize(idToken, accessToken) {
        console.log('Contacts, initialize');
        let username = Extract.username(idToken);
        let url = this.cpaasUrl + "addressbook/v1/" + username.preferred_username + "/default/contacts";
        let cargo = {
            "contact": {
                "attributeList": {
                    "attribute": [
                        {
                            "name": "primaryContact",
                            "value": Preferences.primaryContact
                        },
                        {
                            "name": "firstName",
                            "value": Preferences.firstName
                        },
                        {
                            "name": "lastName",
                            "value": Preferences.lastName
                        },
                        {
                            "name": "emailAddress",
                            "value": Preferences.emailAddress
                        },
                        {
                            "name": "homePhoneNumber",
                            "value": Preferences.homePhoneNumber
                        },
                        {
                            "name": "businessPhoneNumber",
                            "value": Preferences.businessPhoneNumber
                        },
                        {
                            "name": "buddy",
                            "value": Preferences.buddy
                        }
                    ]
                },
                "contactId": Preferences.contactId + Math.random()
            }
        };
        this.request(url, accessToken, cargo);
    }
}