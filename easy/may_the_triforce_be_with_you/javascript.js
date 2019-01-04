function readline() {
    var readlineSync = require('readline-sync');
    return readlineSync.question('');
}
function print(text) {
    console.log(text);
}
//////////////////////////////////
function removeTrailingWhitespaces(str) {
    return str.replace(/\s+$/g, '');
}
//////////////////////////////////

function insertTriangle(rows, startx, starty, size) {
    for (var i = 0; i < size; i++) {
        var x = startx - i;
        var y = starty + i;
        for (var j = 0; j < (i*2) +1; j++) {
            rows[y][x + j] = '*';
        }
    }
}

// parse input
var rows = [];
const N = parseInt(readline());

// prepare mem buffs
for (var i = 0; i < N * 2; i++) {
    rows.push([]);
    for (var j = 0; j < ((N*4) - 1); j++) {
        rows[i].push(' ');
    }
}
rows[0][0] = '.';

// insert triangles
insertTriangle(rows, (2*N) - 1, 0, N);
insertTriangle(rows, N-1, N, N);
insertTriangle(rows, (3*N) - 1, N, N);
// print triangles
for (var i = 0; i < N * 2; i++) {
    var row = removeTrailingWhitespaces(rows[i].join(""));
    print(row);
}