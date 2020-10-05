'use strict';

for(let i = 1; i <= 7; i++) {
    let output = '';
    for(let j = 1; j <= i; j++) {
        output += '#';
    }
    console.log(output);
}

for(let i = 1; i <= 100; i++) {
    if(i % 3 == 0 && i % 5 == 0)
        console.log('FizzBuzz')
        else if(i % 3 == 0)
            console.log('Fizz');
            else if(i % 5 == 0)
                console.log('Buzz')
                else
                    console.log(i);
    }

let output = '';

for(let i = 0; i < 8; i++) {
    for(let j = 0; j < 8; j++) {
        if((i + j) % 2 != 0)
            output += ' ';
            else
                output += '#';
    }
    output += '\n';
}
console.log(output);