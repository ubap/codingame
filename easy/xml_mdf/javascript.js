// LOCAL ENVIRONMENT FUNCTONS
function readline() {
    var readlineSync = require('readline-sync');
    return readlineSync.question('');
}
function print(text) {
    console.log(text);
}
///////////////////////////////////////////////

const sequence = readline();

var tags_weights = {};
var tags_stack = [];
var i = 0;
while (i < sequence.length) {
    var character = sequence[i];
    if (character !== "-") {
        tags_stack.push(character);
        if (tags_weights[character] === undefined) {
            tags_weights[character] = []
        }
        tags_weights[character].push(tags_stack.length);
    } else {
        i += 1;
        tags_stack.pop();
    }
    i += 1;
}

// calc heaviest character
var heaviest_character = "";
var heaviest_character_weight = -1;

for (var character in tags_weights) {
    var sum = 0;
    tags_weights[character].forEach(weight => {
        sum += 1.0 / weight;
    });
    if (sum > heaviest_character_weight) {
        heaviest_character = character;
        heaviest_character_weight = sum;
    }
}

print(heaviest_character);