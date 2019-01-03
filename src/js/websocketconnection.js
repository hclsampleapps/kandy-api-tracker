// @file websocketconnection.js
class WebSocketConnection {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.container = document.querySelector("#websocket");
        this.xhrLog = new XHRLog(this.container);
        this.status = new Status(this.container.querySelector(".status"));
    }
    set proceedTo(fn) {
        this.proceed = fn;
    }
    onSuccess(data) {
        this.status.success();
        this.xhrLog.initialize(JSON.stringify(data, null, 4));
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

    request(url) {
        var self = this;
        if ("WebSocket" in window) {
            console.log("WebSocket is supported by your Browser!");
            var ws = new WebSocket(url);
            let status = {
                status: "success"
            };
            ws.onopen = function () {

                // Web Socket is connected, send data using send()
                //  ws.send("Message to send");
                self.onSuccess(JSON.stringify(status));
            };
            ws.onerror = function () {
                self.onFailure();
            };
        } else {
            self.onFailure();
            console.log("WebSocket NOT supported by your Browser!");
        }
    }
    initialize(idToken, accessToken, callbackURL) {
        console.log("webSocket:Connection Initialize");
        let username = Extract.username(idToken);
        let url = "wss://" + this.baseUrl + "/cpaas/notificationchannel/v1/"
            + username.preferred_username + "/channels/" + callbackURL + "/websocket?access_token=" + accessToken;
        this.request(url);
    }

}