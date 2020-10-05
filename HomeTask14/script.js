'use strict';

function mirrorTriangle(n) {
    for(let i = 1; i < n; i++) {
        buildLine(i);
    }
    for(let i = n; i > 0; i--) {
        buildLine(i);
    }
}

function buildLine(i) {
    let output = '';
    for(let j = 1; j <= i; j++) {
        output += '#';
    }
    console.log(output);
}

mirrorTriangle(7);

function fibonacci(n) {
    let numbers = [0, 1];
    for (let i = 2; i < n; i++) {
        numbers[i] = numbers[i - 2] + numbers[i - 1];
    }
    console.log(numbers.toString());
}

fibonacci(20);

function squareEq(a, b, c) {
    let D = b * b - 4 * a * c;
    let result = `${a}x^2 + ${b}x + ${c}: `;
    if(D > 0) {
        console.log(result + 'уравнение имеет 2 различных вещественных корня');
        }
        else if(D == 0) {
            console.log(result + 'уравнение имеет 1 корень (или же 2 совпадающих вещественных корня)');
            }
            else if(D < 0) {
                console.log(result + 'уравнение имеет 2 мнимых корня (т.е. вещественных корней нет)');
            }
}

squareEq(2, 3, 1);
squareEq(1, 2, 1);
squareEq(1, 2, 3);