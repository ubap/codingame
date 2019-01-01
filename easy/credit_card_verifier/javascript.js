
function readline() {
    var readlineSync = require('readline-sync');
    return readlineSync.question('');
}
function print(text) {
    console.log(text);
}
/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const n = parseInt(readline());
for (let i = 0; i < n; i++) {
    const card = readline().replace(/ /g, "");
    if (card.length != 16) {
        print("NO");
        continue;
    }
    var sum = 0;
    for (var j = 0; j < 15; j += 2) {
        var doubled = parseInt(card.charAt(j).toString()) * 2;
        if (doubled > 9)
            doubled -= 9;
        sum += doubled;
        sum += parseInt(card.charAt(j + 1).toString())
    }
    if (sum % 10 === 0)
        print("YES");
    else
        print("NO");
}