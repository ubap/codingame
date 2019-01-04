function readline() {
    var readlineSync = require('readline-sync');
    return readlineSync.question('');
}
function print(text) {
    console.log(text);
}
//////////////////////////////////////////////////////////////////
function readMNumber() {
    var num = [];
    const S1 = parseInt(readline());
    var line ="";
    for (let i = 0; i < S1; i++) {
        line += readline();
        if (line.length == L*H) {
            var digit = flatDigitsMtA[line];
            num.push(digit);
            line = "";
        }
    }
    var val = 0;
    for (var i = 0; i < num.length; i++) {
        val += (num[num.length-1-i] * Math.pow(20, i));
    }
    return val;
}

var inputs = readline().split(' ');
const L = parseInt(inputs[0]);
const H = parseInt(inputs[1]);
var lines = [];
for (let i = 0; i < H; i++) {
    const line = readline();
    lines.push(line);
}

// prepare flat string map, bi directional
var flatDigitsMtA = {};
var flatDigitsAtM = {};
for (let i = 0; i < 20; i++) {
    var x = i * L;
    var flatDigit = "";
    for (var y = 0; y < H; y++) {
        flatDigit += lines[y].substring(x, x + L);
    }
    flatDigitsAtM[i] = flatDigit;
    flatDigitsMtA[flatDigit] = i;
}

//
var num1 = readMNumber();
var num2 = readMNumber();

const operation = readline();
var result = 0;
if (operation == "+")
    result = num1 + num2;
else if (operation == "-")
    result = num1 - num2;
else if (operation == "*")
    result = num1 * num2;
else if (operation == "/")
    result = num1 / num2;

var resultDigits = [];
do {
    resultDigits.push(flatDigitsAtM[result % 20]);
    result = Math.floor(result / 20);
} while (result != 0);

for (var i = 0; i < resultDigits.length; i++) {
    var digit = resultDigits[resultDigits.length-i-1];
    for (var y = 0; y < H; y++) {
        print(digit.substring(y * L, (y+1) * L));
    }
}