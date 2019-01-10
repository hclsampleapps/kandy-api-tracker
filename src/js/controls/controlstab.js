// @file controlstab.js
class ControlsTab {
    constructor(id) {
        this.currPos = 0;
        this.container = document.getElementById(id);
        this.tabElements = this.container.querySelectorAll('li a[data-mui-toggle="tab"]');
        this.prepareIdList();
        this.attachEvents();
    }
    prepareIdList() {
        this.tabList = [];
        for(let i=0; i<this.tabElements.length; i++) {
            let tabId = this.tabElements[i].getAttribute('data-mui-controls');
            this.tabList.push(tabId);
        }
    }
    onClick(evt) {
        let currId = evt.target.getAttribute('data-mui-controls');
        this.currPos = this.tabList.indexOf(currId);
    }
    attachEvents() {
        for(let i=0; i<this.tabElements.length; i++) {
            this.tabElements[i].addEventListener('click', (evt) => this.onClick(evt));
        }
    }
    activateNext() {
        this.currPos = (this.currPos + 1) % this.tabElements.length;
        let nextPosId = this.tabList[this.currPos];
        mui.tabs.activate(nextPosId);
    }
}