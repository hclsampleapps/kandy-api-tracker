// @file controlsdb.js
class ControlsDepot {
    constructor(id) {
        this.storageId = id;
        this.toast = new Toast();
    }
    set onLoad(fn) {
        this.proceed = fn;
    }
    onLoadInChrome(result) {
        if (!!result) {
            if (this.storageId in result) {
                Preferences = JSON.parse(result[this.storageId]);
                this.proceed();
            } else {
                this.toast.show("Preferences are not saved yet in chrome storage");
                this.proceed();
            }
        } else {
            this.toast.show("Failed to load Preferences from chrome storage!");
            this.proceed();
        }
    }
    load() {
        if (!!window.localStorage) {
            if (this.storageId in window.localStorage) {
                Preferences = JSON.parse(window.localStorage.getItem(this.storageId));
                this.proceed();
            } else {
                this.toast.show("Preferences are not saved yet in browser storage");
                this.proceed();
            }
        } else if (!!window.chrome && !!window.chrome.storage) {
            chrome.storage.local.get([this.storageId], this.onLoadInChrome.bind(this));
        } else {
            this.toast.show("Failed to load Preferences from browser storage!");
            this.proceed();
        }
    }
    onSaveInChrome() {
        this.toast.show('Preferences saved in chrome storage');
    }
    save() {
        if (!!window.localStorage) {
            window.localStorage.setItem(this.storageId, JSON.stringify(Preferences));
            this.toast.show('Preferences saved in browser storage');
        } else if (!!window.chrome && !!window.chrome.storage) {
            let cargo = {};
            cargo[this.storageId] = JSON.stringify(Preferences);
            chrome.storage.local.set(cargo, this.onSaveInChrome.bind(this));
        } else {
            this.toast.show("Failed to save in browser storage!");
        }
    }
}