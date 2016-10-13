
"use strict";

const args = process.argv.slice(2);

if (args.length != 3) {

    console.log("你的参数有问题");
    throw new Error("你的参数有问题啊");

}

let para1 = args[0];
let operator = args[1];
let para2 = args[2];

const calculator = require("./modules/02-module-calculator.js");

let result = 0;

switch (operator) {
    case "+":
    result = calculator.add(para1, para2);
    break;

    case "-":   
    result = calculator.subtract(para1, para2);
    break;
    
    case "x":
    case "*":
    result = calculator.multiply(para1, para2);
    break;
    
    case "÷":
    case "/":
    result = calculator.divide(para1, para2);
    break;

    default:
    throw new Error("出错了啊");

}


console.log(`你的结果是${result}~`);
