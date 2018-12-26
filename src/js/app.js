var responsechannelglobal;
var xhttp = new XMLHttpRequest();

var baseURL = "nvs-cpaas-oauth.kandy.io";
var cpaasUrl = 'https://' + baseURL + '/cpaas/';
var cpaasAuthUrl = cpaasUrl.concat("auth/v1/token");
var api_timer;
var api_timerchat;
var api_timerpresence;
//declareURL();
//function declareURL(){
//   baseURL = document.getElementById("base_url").value;
// cpaasUrl = 'https://'+baseURL+'/cpaas/';
// cpaasAuthUrl = cpaasUrl.concat("auth/v1/token");
//}
var tokenobj;
var alldata = ["PUB-My Sms Project 2", "d3smc2e0j3srxx0g", "3E7pCDsFqY1fn4p4"];
var alldatamessage = ["+12084877834", "+17433333068", "hello"];
var alldatachat = ["ashish07@hcl107.MPb0QLfe.att.com", "hello"];

function myFunctionshow(id) {
    var x = document.getElementById(id);
    x.style.display = "block";
}

function myFunctionhide(id) {
    var x = document.getElementById(id);
    x.style.display = "none";
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

var timeintervalSMS = 11000;
var timeintervalChat = 17000;
var timeintervalPresence = 19000;

function refreshAPI() {
    userToken();
    myFunctionhide("startapi");
    myFunctionshow("stopapi");
    if (document.getElementById('smscheckbox').checked) {
        api_timer = setInterval(function() {
            OutBoundSms(tokenobj);
        }, timeintervalSMS);
    }
    if (document.getElementById('chatcheckbox').checked) {
        api_timer = setInterval(function() {
            callSubscription(tokenobj, responsechannelglobal);
        }, timeintervalSMS);
    }
    if (document.getElementById('presencecheckbox').checked) {
        api_timer = setInterval(function() {
            callPresence(tokenobj, responsechannelglobal);
        }, timeintervalSMS);
    }


}

function stopAPI() {
    myFunctionhide("stopapi");
    myFunctionshow("startapi");
    clearInterval(api_timer);
    clearInterval(api_timerchat);
    clearInterval(api_timerpresence);
}


function userToken() {
    console.log("Start Monitoring login");
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && (this.status === 200 || this.status === 201)) {
            var obj = JSON.parse(this.responseText);
            document.getElementById("tokenstatus").innerHTML = "PASS";
            userChanells(obj);
        } else {
            document.getElementById("tokenstatus").innerHTML = "FAIL";
        }
    };
    xhttp.open("POST", cpaasAuthUrl, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var stt = "client_id=" + (encodeURIComponent((alldata[0]).trim()));
    stt = stt + ("&username=" + (alldata[1]));
    stt = stt + ("&password=" + (alldata[2]));
    stt = stt + ("&grant_type=password&scope=openid");
    console.log(stt);
    xhttp.send(stt);
}

function userChanells(obj) {
    console.log("Start Monitoring channel");
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && (this.status === 200 || this.status === 201)) {
            var responsechannel = JSON.parse(this.responseText);
            document.getElementById("channelstatus").innerHTML = "PASS";
            webSocketTest(responsechannel, obj);
        } else {
            document.getElementById("channelstatus").innerHTML = "FAIL";
        }
    };
    var username = parseJwt(obj.id_token);
    xhttp.open("POST", cpaasUrl + ("notificationchannel/v1/" + username.preferred_username + "/channels"), true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Authorization", "Bearer ".concat(obj.access_token));

    var notificationChannel = {
        "channelLifetime": 3600,
        "channelType": "Websockets",
        "clientCorrelator": "sampleCorrelator",
        "x-connCheckRole": "client"
    };
    var bodypoarams = { "notificationChannel": notificationChannel };
    xhttp.send(JSON.stringify(bodypoarams));
}

function webSocketTest(responsechannel, obj) {
    tokenobj = obj;
    responsechannelglobal = responsechannel;
    console.log("call");
    var username = parseJwt(obj.id_token);
    if ("WebSocket" in window) {
        console.log("WebSocket is supported by your Browser!");
        var socketurl = "wss://" + baseURL + "/cpaas/notificationchannel/v1/" +
            username.preferred_username + "/channels/" + (responsechannel.notificationChannel.callbackURL) +
            ("/websocket?access_token=").concat(obj.access_token);
        console.log(socketurl);
        console.log(socketurl);
        var ws = new WebSocket(socketurl);
        document.getElementById("websocketstatus").innerHTML = "PASS";
    } else {
        document.getElementById("channelstatus").innerHTML = "FAIL";
        console.log("WebSocket NOT supported by your Browser!");
    }
}
//=============================================SMS===============================
function OutBoundSms(obj) {
    console.log(JSON.stringify(obj));
    // var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && (this.status === 200 || this.status === 201)) {
            var responsechannel1 = JSON.parse(this.responseText);

            document.getElementById("outboundsms").innerHTML = "PASS";
        } else {
            document.getElementById("outboundsms").innerHTML = "FAIL";
        }
    };
    var username = parseJwt(obj.id_token);
    xhttp.open("POST", cpaasUrl + ("smsmessaging/v1/" + username.preferred_username + "/outbound/") +
        (alldatamessage[0]) + ("/requests"), true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Authorization", "Bearer " + (obj.access_token));
    var message = {
        "message": alldatamessage[2]
    }
    var outboundSMSMessageRequest = {
        "address": [alldatamessage[1]],
        "clientCorrelator": "sampleCorrelator",
        "outboundSMSTextMessage": message
    }
    var bodypoarams = { "outboundSMSMessageRequest": outboundSMSMessageRequest };
    xhttp.send(JSON.stringify(bodypoarams));
}
//=============================================CHAT===============================

function callSubscription(obj, responsechannel) {

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && (this.status === 200 || this.status === 201)) {
            var responseSubscription = JSON.parse(this.responseText);
            document.getElementById("subscriptionstatus").innerHTML = "PASS";
            sendmessage(obj);
        } else {
            document.getElementById("subscriptionstatus").innerHTML = "FAIL";
        }
    };
    var username = parseJwt(obj.id_token);
    xhttp.open("POST", cpaasUrl + ("chat/v1/" + username.preferred_username + "/subscriptions"), true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Authorization", "Bearer ".concat(obj.access_token));

    var callbackReference = { "notifyURL": responsechannel.notificationChannel.callbackURL };
    var chatNotificationSubscription = {
        "callbackReference": callbackReference,
        "clientCorrelator": username.preferred_username
    };
    var bodypoarams = { "chatNotificationSubscription": chatNotificationSubscription };
    xhttp.send(JSON.stringify(bodypoarams));
}

function sendmessage(obj) {
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && (this.status === 200 || this.status === 201)) {
            var responsechatstatus = JSON.parse(this.responseText);
            document.getElementById("chatstatus").innerHTML = "PASS";

        } else {
            document.getElementById("chatstatus").innerHTML = "FAIL";
        }
    };
    var username = parseJwt(obj.id_token);
    xhttp.open("POST", cpaasUrl + ("chat/v1/" + username.preferred_username + "/oneToOne/" +
        alldatachat[0] + "/adhoc/messages"), true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Authorization", "Bearer ".concat(obj.access_token));

    var chatMessage = { "text": alldatachat[1] };

    var bodypoarams = { "chatMessage": chatMessage };
    xhttp.send(JSON.stringify(bodypoarams));
}



//=============================================Presence===============================
function callPresence(obj, responsechannel) {

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && (this.status === 200 || this.status === 201)) {
            var responseSubscription = JSON.parse(this.responseText);
            document.getElementById("presenceliststatus").innerHTML = "PASS";
            //   callpresenceListSubscriptions(obj, responsechannel);
        } else {
            document.getElementById("presenceliststatus").innerHTML = "FAIL";
        }
    };
    var username = parseJwt(obj.id_token);


    xhttp.open("GET", cpaasUrl + ("presence/v1/" + username.preferred_username + "/presenceLists"), true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Authorization", "Bearer ".concat(obj.access_token));

    // var callbackReference = { "notifyURL": responsechannel.notificationChannel.callbackURL };
    // var chatNotificationSubscription = {
    //   "callbackReference": callbackReference,
    //   "clientCorrelator": username.preferred_username
    // };
    // var bodypoarams = { "chatNotificationSubscription": chatNotificationSubscription };
    xhttp.send();
}

function callpresenceListSubscriptions(obj, responsechannel) {

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && (this.status === 200 || this.status === 201)) {
            var responseSubscription = JSON.parse(this.responseText);
            document.getElementById("presenceliststatus").innerHTML = "PASS";
            //  sendmessage(obj);
        } else {
            document.getElementById("presenceliststatus").innerHTML = "FAIL";
        }
    };
    var username = parseJwt(obj.id_token);


    xhttp.open("POST", cpaasUrl + ("presence/v1/" + username.preferred_username + "/subscriptions/presenceListSubscriptions/"), true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Authorization", "Bearer ".concat(obj.access_token));

    var callbackReference = { "notifyURL": responsechannel.notificationChannel.callbackURL };
    var presenceListSubscription = {
        "callbackReference": callbackReference,
        "clientCorrelator": username.preferred_username,
        "duration": 86400
    };
    var bodypoarams = { "presenceListSubscription": presenceListSubscription };
    xhttp.send(JSON.stringify(bodypoarams));
}