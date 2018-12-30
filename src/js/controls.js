// @file controls.js
class Controls {
    constructor() {}
    save(evt) {
        Preferences.enableSMS = !!this.enableSMS.checked;
        Preferences.enableChat = !!this.enableChat.checked;
        Preferences.enablePresence = !!this.enablePresence.checked;

        Preferences.baseUrl = this.baseUrl.value;
        Preferences.projectName = this.projectName.value;
        Preferences.username = this.username.value;
        Preferences.password = this.password.value;
    }
    defaultState() {
        this.enableSMS.checked = Preferences.enableSMS;
        this.enableChat.checked = Preferences.enableChat;
        this.enablePresence.checked = Preferences.enablePresence;

        this.baseUrl.value = Preferences.baseUrl;
        this.projectName.value = Preferences.projectName;
        this.username.value = Preferences.username;
        this.password.value = Preferences.password;
    }
    attachEvents() {
        this.savePreference.addEventListener("click", (evt) => this.save(evt));
    }
    initialize() {
        this.enableSMS = document.getElementById("enablesms");
        this.enableChat = document.getElementById("enablechat");
        this.enablePresence = document.getElementById("enablepresence");

        this.baseUrl = document.getElementById("baseurl");
        this.projectName = document.getElementById("projectname");
        this.username = document.getElementById("username");
        this.password = document.getElementById("password");

        this.savePreference = document.getElementById("savepreference");
        this.attachEvents();

        this.defaultState();
    }
}
