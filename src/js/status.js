// @file status.js
class Status {
    constructor(elmRef) {
        this.container = elmRef;
    }
    success() {
        Style.removeClass(this.container, 'symbol-error');
        Style.removeClass(this.container, 'symbol-failure');
        Style.addClass(this.container, 'symbol-success');
    }
    failure() {
        Style.removeClass(this.container, 'symbol-error');
        Style.removeClass(this.container, 'symbol-success');
        Style.addClass(this.container, 'symbol-failure');
    }
    error() {
        Style.removeClass(this.container, 'symbol-failure');
        Style.removeClass(this.container, 'symbol-success');
        Style.addClass(this.container, 'symbol-error');
    }
}