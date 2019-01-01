// LOCAL ENVIRONMENT FUNCTONS
function readline() {
    var readlineSync = require('readline-sync');
    return readlineSync.question('');
}
function print(text) {
    console.log(text);
}

/////////////////////////////////////////////////////

const numbers = [];
const N = parseInt(readline());
var inputs = readline().split(' ');
for (let i = 0; i < N; i++) {
    const x = parseInt(inputs[i]);
    numbers.push(x);
}

numbers.sort(function(a, b) { return b-a; });
var weights = 0;

while (numbers.length != 1) {
    var sum = numbers.pop() + numbers.pop();
    weights += sum;
    numbers.push(sum);
    numbers.sort(function(a, b) { return b-a; });
}

// print weights
print(weights);      