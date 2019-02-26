// @file appbar.js
class AppBar {
    constructor() {
        this.toast = new Toast();
    }
    openHome(evt) {
        evt.preventDefault();
        this.defaultState();
    }
    openSetting(evt) {
        evt.preventDefault();
        Effect.hide(this.menuSetting);
        Effect.show(this.menuHome);
        Effect.show(this.viewSetting);
        Effect.hide(this.viewHome);
    }
    set execute(fn) {
        this.proceed = fn;
    }

    set stopStream(fn) {
        this.stopCall = fn;
    }

    set startStream(fn) {
        this.startCall = fn;
    }

    startMonitor(evt) {
        evt.preventDefault();
        this.defaultState();
        Preferences.toMonitor = true;
        if (Preferences.enableVoice) {
            this.startCall();
        }
        this.proceed();
        Effect.hide(this.menuPlay);
        Effect.show(this.menuPause);
        this.toast.show('Monitoring started');
    }
    stopMonitor(evt) {
        evt.preventDefault();
        Preferences.toMonitor = false;
        Effect.hide(this.menuPause);
        Effect.show(this.menuPlay);
        this.toast.show('Monitoring stopped');
        this.stopCall();
    }
    abortMonitor() {
        Effect.show(this.menuPlay);
        Effect.hide(this.menuPause);
        Preferences.toMonitor = false;
        this.toast.show('Monitoring over');
        this.stopCall();
    }
    showPasswordGrant() {
        Preferences.passwordGrant = true;
        Effect.hide(this.accountClientCredentials);
        Effect.show(this.accountPasswordGrant);
    }
    showClientCredentials() {
        Preferences.passwordGrant = false;
        Effect.show(this.accountClientCredentials);
        Effect.hide(this.accountPasswordGrant);
    }
    defaultState() {
        Effect.show(this.menuSetting);
        Effect.hide(this.menuHome);
        Effect.hide(this.viewSetting);
        Effect.show(this.viewHome);
        Effect.show(this.menuPlay);
        Effect.hide(this.menuPause);
    }
    initialize() {
        this.viewHome = document.getElementById('checkupreport');
        this.viewSetting = document.getElementById('preferencecontrols');

        this.menuHome = document.getElementById('menuhome');
        this.menuHome.addEventListener('click', (evt) => this.openHome(evt));

        this.menuSetting = document.getElementById('menusetting');
        this.menuSetting.addEventListener('click', (evt) => this.openSetting(evt));

        this.menuPlay = document.getElementById('menuplay');
        this.menuPlay.addEventListener('click', (evt) => this.startMonitor(evt));

        this.menuPause = document.getElementById('menupause');
        this.menuPause.addEventListener('click', (evt) => this.stopMonitor(evt));

        this.defaultState();
    }
}