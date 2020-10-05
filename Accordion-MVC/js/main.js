import { Accordion } from './accordion.js';

const accordions = new Accordion({
    activeAccordion: 1,
    slideDuration: 300
});

accordions.on('change', function(curr, prev) {
    console.log('curr:', curr);
    console.log('prev:', prev);
    console.log(accordions.getData())
});