// @file controlsmenu.js
class ControlsMenu {
    constructor(id) {
        this.container = document.getElementById(id);
        this.menuElements = this.container.querySelectorAll('li a[data-toggle="tab"]');
        this.prepareIdList();
        this.attachEvents();
    }
    prepareIdList() {
        this.menuList = [];
        for(let i=0; i<this.menuElements.length; i++) {
            let tabId = this.menuElements[i].getAttribute('data-controls');
            this.menuList.push(tabId);
        }
    }
    onClick(evt) {
        let currId = evt.target.getAttribute('data-controls');
        mui.tabs.activate(currId);
    }
    attachEvents() {
        for(let i=0; i<this.menuElements.length; i++) {
            this.menuElements[i].addEventListener('click', (evt) => this.onClick(evt));
        }
    }
}