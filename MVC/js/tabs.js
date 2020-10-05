import { EventEmiter } from './core.js';

let toggleBtnSelector = '.tabs-toggle__item';
let toggleActiveClass = 'tabs-toggle__item_active';

let tabsItemSelector = '.tabs-content___item';
let tabsItemActiveClass = 'tabs-content___item_active';

class TabsModel extends EventEmiter {
    constructor() {
        super();

        this._activeTab = 1;
        this._tabLength = undefined;
    }

    getActiveTab() {
        return this._activeTab;
    }

    setActiveTab(index) {
        this._activeTab = index;
    }

    getTabLength() {
        return this._tabLength;
    }
}

class TabsView extends EventEmiter {
    constructor(model) {
        super();

        this._model = model;

        $(toggleBtnSelector).on('click', event => this.emit('changedTab', $(event.currentTarget).attr('data-toggle')));
    }

    initTabs() {
        $(toggleBtnSelector).each(function(i, el) {
            $(el).attr('data-toggle', i);
        });

        $(tabsItemSelector).each(function(i, el) {
            $(el).attr('data-toggle', i);
        });

        this._model._tabLength = $(toggleBtnSelector).length;
    }

    activateTab(index) {
        const $btn = $(toggleBtnSelector);
        const $tab = $(tabsItemSelector);

        $btn.removeClass(toggleActiveClass);
        $btn.filter(`[data-toggle="${index}"]`).addClass(toggleActiveClass);

        $tab.removeClass(tabsItemActiveClass)
        $tab.hide();
        
        $tab.filter(`[data-toggle="${index}"]`).addClass(tabsItemActiveClass)
        $tab.filter(`[data-toggle="${index}"]`).show();
    }

    render() {
        this.initTabs();

        this.activateTab( this._model.getActiveTab() )
    }
}

class TabsController {
    constructor(model, view) {
        this._model = model;
        this._view = view;

        this.change = function() {};

        view.on('changedTab', index => this.changeTab(index));
    }

    prevTab() {
        const curr = this._model.getActiveTab();
        const length = this._model.getTabLength();

        const target = curr > 0 ? curr - 1 : length - 1;

        this.changeTab(target);
    }

    nextTab() {
        const curr = this._model.getActiveTab();
        const length = this._model.getTabLength();

        const target = curr >= length - 1 ? 0 : curr + 1;

        this.changeTab(target);
    }

    changeTab(index) {
        index = parseInt(index);

        const prevIndex = this._model.getActiveTab();
        
        this._view.activateTab(index);
        this._model.setActiveTab(index);

        const currIndex = this._model.getActiveTab();

        this.change(currIndex, prevIndex);
    }
}

export class Tabs {
    constructor(params) {
        // {
        //     activeTab: 0
        // }
        const model = new TabsModel();
        const view = new TabsView(model);

        // if (params && params.activeTab) {
        //     const length = model.getTabLength();
        //     const fix = params.activeTab < 0 ? 0 : params.activeTab > length - 1 ? length - 1 : params.activeTab;
            
        //     console.log(length)
            
        //     model.setActiveTab(fix);
        // }

        const controller = new TabsController(model, view);

        this.model = model;
        this.view = view;
        this.controller = controller;

        view.render();
    }

    getData() {
        return {
            activeTab: this.model.getActiveTab(),
            activeBtnElem: $(toggleBtnSelector).filter(`.${toggleActiveClass}`)[0],
            activeTabElem: $(tabsItemSelector).filter(`.${tabsItemActiveClass}`)[0]
        };
    }

    prev() {
        this.controller.prevTab();
    }

    next() {
        this.controller.nextTab();
    }

    setActiveTab(index) {
        this.controller.changeTab(index);
    }

    on(event, callback) {
        this.controller[event] = callback;
    }
}