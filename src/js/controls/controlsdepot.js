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
        if (!!result && this.storageId in result) {
            Preferences = JSON.parse(result[this.storageId]); 
            this.proceed();
        }
    }
    load() {
        if (window.chrome && chrome.app && chrome.app.runtime) {
            chrome.storage.local.get([this.storageId], this.onLoadInChrome.bind(this));
        } else if (!!window.localStorage) {
            if (this.storageId in window.localStorage) {
                Preferences = JSON.parse(window.localStorage.getItem(this.storageId)); 
                this.proceed();
            }
        } else {
            this.toast.show("Error: Can't be saved!");
        }
    }
    onSaveInChrome() {
        this.toast.show('Preferences saved!');
    }
    save() {
        if (window.chrome && chrome.app && chrome.app.runtime) {
            let cargo = {};
            cargo[this.storageId] = JSON.stringify(Preferences);
            chrome.storage.local.set(cargo, this.onSaveInChrome.bind(this));
        } else if (!!window.localStorage) {
            window.localStorage.setItem(this.storageId, JSON.stringify(Preferences));
            this.toast.show('Preferences saved!');
        } else {
            this.toast.show("Error: Can't be saved!");
        }
    }
}