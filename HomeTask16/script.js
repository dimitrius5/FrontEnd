'use strict';

function isPrime(n) {
    if(!Number.isInteger(n) || n < 2) return false;
    const nSqrt = Math.floor(Math.sqrt(n))
    for(let i = 2; i <= nSqrt; i++) {
       if(n % i === 0) return false;
    }
    return true;
}
console.log(' -3:', isPrime(-3), ' -1:', isPrime(-1), ' 0:', isPrime(0), ' 1:', isPrime(1), ' 2:', 
            isPrime(2), ' 2.5:', isPrime(2.5), ' 3:', isPrime(3), ' 4:', isPrime(4), ' 5:', isPrime(5));

function getSumm(arr) {
    return arr
            .map(function (n) {
                return Math.abs(n)
            })
            .filter(isPrime)
            .reduce(function (acc, curr) {
                return acc + curr
      }, 0)
}

console.log('[1, 2, 3, 4, 5]: ', getSumm([1, 2, 3, 4, 5]));
console.log('[-1, 2, -3, 4, 5]: ', getSumm([-1, 2, -3, 4, 5]));

function getRange(arr, min, max) {
    return arr
            .filter(function (a) {
                return a >= min && a <= max;
            })
            .sort(function (a, b){
                return a - b;
            });
}

let arr1 = [5, 3, 8, 1];
let filtered = getRange(arr1, 1, 4);
console.log('[5, 3, 8, 1]: ', filtered);
let arr2 = [1000, 100, 3, -8, 1];
filtered = getRange(arr2, 1, 100);
console.log('[1000, 100, 3, -8, 1]: ', filtered);

function toLess(arr) {
    return arr.sort(function (a, b) {
        return b - a;
    });
}

let arr = [5, 2, 1, -10, 8];
console.log('[5, 2, 1, -10, 8]: ', toLess(arr));

function sortByAge(users) {
    return users.sort(function (a, b) {
        return a[1] - b[1];
    });
}

let bill = ["Билл", 25];
let mark = ["Марк", 30];
let linus = ["Линус", 28];

let users = [ bill, mark, linus ];
 
console.log(sortByAge(users));