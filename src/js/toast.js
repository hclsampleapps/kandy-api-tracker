// @file toast.js
class Toast {
    constructor() {
        this.initialize();
    }
    show(msg) {
        Effect.show(this.container);
        this.message.innerHTML = msg;
        setTimeout(this.hide.bind(this), 3000);
    }
    hide() {
        Effect.hide(this.container);
        this.message.innerHTML = '';
    }
    initialize() {
        this.container = document.getElementById('toastbox');
        this.message = this.container.querySelector('.toast-box-msg');

        this.hide();
    }
}