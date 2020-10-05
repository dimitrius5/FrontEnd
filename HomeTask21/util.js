'use strict';

function roundTo(num, n = 2) {
    return Math.round( num * (10 ** parseInt(n)) ) / (10 ** parseInt(n));
}