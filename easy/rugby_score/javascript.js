function readline() {
    var readlineSync = require('readline-sync');
    return readlineSync.question('');
}
function print(text) {
    console.log(text);
}
//////////////////////////////////////////////////////////////////

function calcScore(combination) {
    return combination[0] * 5 + combination[1] * 2 + combination[2] * 3;
}

const n = parseInt(readline());

var combinations = [];
var tries = -1;
while (true) {
    tries += 1;
    if (calcScore([tries, 0, 0]) == n) {
        combinations.push([tries, 0, 0]);
        continue;
    }
    if (calcScore([tries, 0, 0]) > n)
        break;
    
    for (var transformation = 0; transformation < tries+1; transformation++) {
        if (calcScore([tries, transformation, 0]) == n) {
            combinations.push([tries, transformation, 0]);
            continue;
        }
        if (calcScore([tries, transformation, 0]) > n)
            break;
        var penalty = 0;
        while (true) {
            penalty += 1;
            if (calcScore([tries, transformation, penalty]) == n) {
                combinations.push([tries, transformation, penalty]);
                continue;
            }
            if (calcScore([tries, transformation, penalty]) > n)
                break;
        }
    }
}

combinations.forEach(function consumer(combination) {
    print(combination.join(" "));
});