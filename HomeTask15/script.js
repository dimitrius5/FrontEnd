'use strict';

function min(a, b) {
    return Math.min(a, b);
}
console.log(min(2, 5));  // 2
console.log(min(3, -1)); // -1
console.log(min(1, 1));  // 1

function ucFirst(str) {
    return str[0].toUpperCase() + str.slice(1);
}
console.log(ucFirst("вася")); // "Вася"

function truncate(str, maxlength) {
    return str.length >= maxlength ? str.slice(0, 19) + '..' : str;
}
console.log(truncate("Вот, что мне хотелось бы сказать на эту тему:", 20)); // "Вот, что мне хотело…"
console.log(truncate("Всем привет!", 20)); // "Всем привет!"

function camelize(str) {
    const words = str.split('-');
    let result = '';
    for(const word of words) {
        if(word.length > 0) {
            result += word[0].toUpperCase() + word.slice(1);
        }
    }
    if(str[0] !== '-') {
        result = result[0].toLowerCase() + result.slice(1);
    }
    return result;
}

console.log(camelize("background-color"));   // 'backgroundColor'
console.log(camelize("list-style-image"));   // 'listStyleImage'
console.log(camelize("-webkit-transition")); // 'WebkitTransition'

const arr = ["Не", "макбук", "делает", "из",  "тебя",  "мастера"];
console.log(arr.map(function(word) {
    return word.length
}));
