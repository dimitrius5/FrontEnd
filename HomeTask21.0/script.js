'use strict';

const accordion = document.querySelector('#accordion');

accordion.addEventListener('click', onAccordionClick, false);

function onAccordionClick(event) {
    if(event.target.classList.contains('header'))
        toggleBlock(event.target.parentNode);
    else if(event.target.parentNode.classList.contains('header'))
        toggleBlock(event.target.parentNode.parentNode);
}

function toggleBlock(block) {
    const headerEl = block.querySelector('div:first-of-type');
    headerEl.classList.toggle('active');

    const controlEl = block.querySelector('span');
    controlEl.innerText = controlEl.innerText == '+' ? '-' : '+';

    const contentEl = block.querySelector('div:last-of-type');
    contentEl.classList.toggle('open');
}



