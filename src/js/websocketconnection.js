// @file websocketconnection.js
class WebSocketConnection {
    constructor() {
        this.container = document.querySelector("#websocket");
        this.xhrLog = new XHRLog(this.container);
        this.status = new Status(this.container.querySelector(".status"));
        this.ws = null;
    }
    set proceedTo(fn) {
        this.proceed = fn;
    }
    set messageTo(fn) {
        this.messageResponse = fn;
    }

    onMessage(data) {
        this.messageResponse(data);
    }

    onSuccess(data) {
        this.status.success();
        this.xhrLog.initialize(data);
        this.proceed(data);
    }
    onFailure() {
        this.status.failure();
    }
    onError() {
        this.status.error();
    }
    destroy() {
        this.status.failure();
        this.xhrLog.destroy();

    }

    closeSocket() {
        console.log("this.ws again",this.ws);
        if (this.ws != null) {
            console.log("Web Socket close user 1");
            //this.ws.close();
            this.ws.onclose  = function(event) {
                console.log("Connection is closed...1");
            };
        }
    }

    request(url) {
        var self = this;
        if ("WebSocket" in window) {
            console.log("WebSocket is supported by your browser!");
            this.ws = new WebSocket(url);
            let status = {
                status: "success"
            };
            this.ws.onopen = function () {
                // Web Socket is connected, send data using send()
                // ws.send("Message to send");
                self.onSuccess(JSON.stringify(status));
            };

            this.ws.onmessage = function (evt) {
                var received_msg = evt.data;
                console.log("user 1 Message is received...");
                self.onMessage(JSON.parse(received_msg));
            };

            this.ws.onerror = function () {
                self.onError();
            };

            console.log("this.ws ",this.ws);
        } else {
            self.onError();
            console.log("WebSocket is not supported by your browser!");
        }
    }
    initialize(baseUrl, idToken, accessToken, callbackURL) {
        console.log("WebSocketConnection, initialize");
        let username = Extract.username(idToken);
        let url = "wss://[0]/cpaas/notificationchannel/v1/[1]/channels/[2]/websocket?access_token=[3]".graft(
            baseUrl,
            username.preferred_username,
            callbackURL,
            accessToken
        );
        console.log("websocket url " + url);
        this.request(url);
    }
}