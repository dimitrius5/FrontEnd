'use strict';

function isPrime(n) {
    if(!Number.isInteger(n) || n < 2) return false;
    const nSqrt = Math.floor(Math.sqrt(n))
    for(let i = 2; i <= nSqrt; i++) {
       if(n % i === 0) return false;
    }
    return true;
}

function fibonacci(n) {
    let numbers = [0, 1];
    for (let i = 2; i < n; i++) {
        numbers[i] = numbers[i - 2] + numbers[i - 1];
    }
    return numbers;
}

function JohnyOniNaDerevyah1(from, to) {
    const numbers = fibonacci(to)
                .slice(from ? from - 1 : from)
                .filter(isPrime);
    
    let i = 0
    let timer = setInterval(() => {
        console.log(numbers[i]);
        i++;
        if(i >= numbers.length) {
            clearInterval(timer);
        };
    }, 1000);
}

function JohnyOniNaDerevyah2(from, to) {
    const numbers = fibonacci(to)
                .slice(from ? from - 1 : from)
                .filter(isPrime);

    let i = 0;
    setTimeout(function run() {
        console.log(numbers[i]);
        i++;
        if(i < numbers.length) {
            setTimeout(run, 1000);
        };
      }, 1000);
}

function pseudoLoader() {
    let i = 1;
    setTimeout(function run() {
        console.clear();
        const deltaPercent = parseInt(Math.random() * 10) + 1;
        const timeout = parseInt(Math.random() * 1000)
        if(i < 100) {
            console.log(`${i}%  |${'='.repeat(i)} ${'_'.repeat(100 - i)}|`);
            i += deltaPercent;
            setTimeout(run, timeout);
        } else {
            console.log(`100% |${'='.repeat(100)}|`)
        };
      }, 100);
}

pseudoLoader();