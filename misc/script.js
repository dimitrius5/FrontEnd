'use strict';

const ulEl = document.querySelector('ul');
const mainImg = document.querySelector('.main-img');
const text = document.querySelector('.text');

function swapImage(event) {
    if(event.target.hasAttribute('src')) {
        mainImg.src = event.target.src;
        text.innerText = event.target.alt;
    }
}

function zoomImage(event) {
    event.preventDefault();
    let scale = event.target.style.transform ? +event.target.style.transform.replace(/[^\d.]/g, '') : 1;
    if(event.target.hasAttribute('src')) {
        if(scale > 2) {
            scale += event.deltaY * -0.005;
        } else {
            scale += event.deltaY * -0.001;
        }
        event.target.style.transform = `scale(${scale})`;
    }
}

ulEl.addEventListener('mouseover', swapImage, false);
ulEl.addEventListener('wheel', zoomImage, false);

