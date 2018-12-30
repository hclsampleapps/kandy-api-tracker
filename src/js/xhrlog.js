// @file xhrlog.js
class XHRLog {
    constructor(elmRef) {
        this.container = elmRef;
    }
    createBox(msg) {
        this.modal = document.createElement('div');
        this.modal.setAttribute("class", "xhrlog");
        this.modal.innerHTML = '<div class="mui--text-title modal-title">Output</div><pre>' + msg + '</pre>';
    }
    openLog() {
        mui.overlay('on', this.modal);
    }
    destroy() {
        this.container.removeEventListener('click', this._openLog);
        Style.removeClass(this.container, 'clickable');
    }
    initialize(msg) {
        this.createBox(msg);
        this._openLog = this.openLog.bind(this);
        this.container.addEventListener('click', this._openLog);
        Style.addClass(this.container, 'clickable');
    }
}
