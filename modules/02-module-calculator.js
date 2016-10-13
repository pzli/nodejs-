"use strict";


function convert (a) {
    return parseFloat(a);
}

function add(a, b) {
    return convert(a) + convert(b);
}

function subtract(a, b) {
    return convert(a) - convert(b);
}

function multiply(a, b) {
    return convert(a) * convert(b);
}

function divide(a, b) {
    return convert(a) / convert(b);
}


module.exports = {
    add,
    subtract,
    multiply,
    divide
}