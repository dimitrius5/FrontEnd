'use strict';

console.log(document.querySelector('#age-table'));
console.log(document.querySelectorAll('#age-table label'));
console.log(document.querySelector('#age-table td'));
console.log(document.querySelector('form[name="search"]'));
console.log(document.querySelector('form[name="search"] input'));
console.log(document.querySelectorAll('form[name="search"] input')[2]);

const LIST_TEMPLATE = document.querySelector('#list-template');

// let input = prompt('Text to add:');
// while(input) {
//     const newLi = document.createElement('li');
//     newLi.innerText = input;
//     LIST_TEMPLATE.appendChild(newLi);
//     input = prompt('Text to add:');
// }