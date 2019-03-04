// @file websocketconnectionseconduser.js
class WebSocketConnectionSecondUser {
    constructor() {
        // this.container = document.querySelector("#websocket");
        // this.xhrLog = new XHRLog(this.container);
        // this.status = new Status(this.container.querySelector(".status"));
    }
    set proceedTo(fn) {
        this.proceed = fn;
    }

    
    set messageTo(fn){
        this.messageResponse = fn;
    }

    onSuccess(data) {
        //this.status.success();
        //this.xhrLog.initialize(data);
        this.proceed(data);
    }

    onMessage(data) {
        //this.status.success();
        //this.xhrLog.initialize(data);
        this.messageResponse(data);
    }

    onFailure() {
        //this.status.failure();
    }
    onError() {
        //this.status.error();
    }
    destroy() {
       // this.status.failure();
       // this.xhrLog.destroy();
    }
    request(url) {
        var self = this;
        if ("WebSocket" in window) {
            console.log("WebSocket is supported by your browser!");
            var ws = new WebSocket(url);
            let status = {
                status: "success"
            };
            ws.onopen = function() {
                // Web Socket is connected, send data using send()
                // ws.send("Message to send");
                self.onSuccess(JSON.stringify(status));
            };

            ws.onmessage = function (evt) { 
                var received_msg = evt.data;
                //alert("user 2 Message is received...");
                self.onMessage(JSON.parse(received_msg));
             };

            ws.onerror = function() {
                self.onError();
            };
        } else {
            self.onError();
            console.log("WebSocket is not supported by your browser!");
        }
    }
    initialize(baseUrl, idToken, accessToken, callbackURL) {
        console.log("WebSocketConnection Second User, initialize");
        let username = Extract.username(idToken);
        let url = "wss://[0]/cpaas/notificationchannel/v1/[1]/channels/[2]/websocket?access_token=[3]".graft(
            baseUrl,
            username.preferred_username,
            callbackURL,
            accessToken
        );
        this.request(url);
    }
}