// @file contacts.js
class Contacts {
    constructor() {
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
            console.log('Contacts, timeout');
            self.onError();
        }
        xhr.send(JSON.stringify(cargo));
    }
    initialize(cpaasUrl,idToken, accessToken,primaryContact,firstName,lastName,emailAddress,homePhoneNumber,businessPhoneNumber,
    buddy,contactId) {
        console.log('Contacts, initialize');
        let username = Extract.username(idToken);
        let url = cpaasUrl + "addressbook/v1/" + username.preferred_username + "/default/contacts";
        let cargo = {
            "contact": {
                "attributeList": {
                    "attribute": [
                        {
                            "name": "primaryContact",
                            "value": primaryContact
                        },
                        {
                            "name": "firstName",
                            "value": firstName
                        },
                        {
                            "name": "lastName",
                            "value": lastName
                        },
                        {
                            "name": "emailAddress",
                            "value": emailAddress
                        },
                        {
                            "name": "homePhoneNumber",
                            "value": homePhoneNumber
                        },
                        {
                            "name": "businessPhoneNumber",
                            "value": businessPhoneNumber
                        },
                        {
                            "name": "buddy",
                            "value": buddy
                        }
                    ]
                },
                "contactId": contactId + Math.random()
            }
        };
        this.request(url, accessToken, cargo);
    }
}