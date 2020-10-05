import { EventEmiter } from './core.js';

let accordionsSelector = '.accordions__item';
let accordionsActiveClass = 'accordions__item_active';

class AccordionsModel extends EventEmiter {
    constructor(activeAccordion, slideDuration, singleMode) {
        super();
        this._activeAccordion = activeAccordion ? activeAccordion : 0;
        this._slideDuration = slideDuration ? slideDuration : 300;
        this._singleMode = singleMode;
    }

    getActiveAccordion() {
        return this._activeAccordion;
    }

    setActiveAccordion(index) {
        this._activeAccordion = index;
    }

    getSlideDuration() {
        return this._slideDuration;
    }

    setSlideDuration(slideDuration) {
        this._slideDuration = slideDuration;
    }

    getSingleMode() {
        return this._singleMode;
    }

    setOpen(index, $el) {
        const open = {
            id: index,
            itemElem: $el.get(),
            titleElem: $el.find('h2').get(),
            contentElem: $el.find('p').get()
        }

        if(this._singleMode) {
            this._open = open
        } else {
            if(!this._open) this._open = [];
            const found = this._open.some(item => item.id == open.id);
            if(found) this._open = this._open.filter(item => item.id != open.id);
                else this._open.push(open);
        }
    }

    getOpen() {
        return this._open;
    }
}

class AccordionsView extends EventEmiter {
    constructor(model) {
        super();

        this._model = model;

        $(accordionsSelector + ' h2').on('click', event => 
            this.emit('changedAccordion', $(event.currentTarget).parent().attr('data-toggle')));
    }

    initAccordions() {
        $(accordionsSelector).each(function(i, el) {
            $(el).attr('data-toggle', i);
            $(el).find('p').hide();
        });
    }

    toggleAccordion(index) {
        const $accordion = $(accordionsSelector);
        const $togglingAccordion = $($accordion.filter(`[data-toggle="${index}"]`)[0]);

        $togglingAccordion.toggleClass(accordionsActiveClass);
        $togglingAccordion.find('p').slideToggle(this._model.getSlideDuration());
        this._model.setOpen(index, $togglingAccordion);
    }

    render() {
        this.initAccordions();

        this.toggleAccordion( this._model.getActiveAccordion() )
    }
}

class AccordionsController {
    constructor(model, view) {
        this._model = model;
        this._view = view;

        this.change = function() {};
        view.on('changedAccordion', index => this.changeAccordion(index));
    }

    changeAccordion(index) {
        index = parseInt(index);
        const prevIndex = this._model.getActiveAccordion();

        if(this._model.getSingleMode())
            this._view.toggleAccordion(prevIndex);
        if(!this._model.getSingleMode() || index != prevIndex)
            this._view.toggleAccordion(index);
        this._model.setActiveAccordion(index);

        this.change(index, prevIndex);
    }
}

export class Accordion {
    constructor(params) {
        const model = new AccordionsModel(params.activeAccordion, params.slideDuration);
        const view = new AccordionsView(model);
        const controller = new AccordionsController(model, view);

        this.model = model;
        this.view = view;
        this.controller = controller;

        view.render();
    }

    getData() {
        return this.model.getOpen();
    }

    setActiveAccordion(index) {
        this.controller.changeAccordion(index);
    }

    on(event, callback) {
        this.controller[event] = callback;
    }
}