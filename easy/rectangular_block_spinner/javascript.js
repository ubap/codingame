function readline() {
    var readlineSync = require('readline-sync');
    return readlineSync.question('');
}
function print(text) {
    console.log(text);
}
//////////////////////////////////////////////////////////////////
// helper methods
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
//////////////////////////////////////////////////////////////////

const size = parseInt(readline());
const angle = parseInt(readline());
var rows = [];
for (let i = 0; i < size; i++) {
    const line = readline().replaceAll(" ", "").split('');
    rows.push(line);
}

// how many times rotate
var rotate = Math.floor(angle / 90);
rotate %= 4;

for (var i = 0; i < rotate; i++) {
    var tmp_rows = [];
    // init tmp rows
    for (var row = 0; row < size; row++) {
        tmp_rows[row] = [];
    }

    for (var row = 0; row < size; row++) {
        for (var col = 0; col < size; col++) {
            tmp_rows[size-col-1][row] = rows[row][col];
        }
    }
    rows = tmp_rows;
}

// print diamond

// upper part
for (var i = 1; i < size+1; i++) {
    var outputline = "";
    // start padding
    for (var j = 0; j < size-i; j++) {
        outputline += " ";
    }
    var separator = "";
    for (var j = 0; j < i; j++) {
        var y = j;
        var x = size+j-i;
        outputline += separator + rows[y][x];
        separator = " ";
    }
    // end padding
    for (var j = 0; j < size-i; j++) {
        outputline += " ";
    }
    print(outputline);
}

// lower part
for (var i = 1; i < size; i++) {
    var outputline = "";
    // start padding
    for (var j = 0; j < i; j++) {
        outputline += " ";
    }
    var separator = "";
    for (var j = i; j < size; j++) {
        y = j;
        x = j-i;
        outputline += separator + rows[y][x];
        separator = " ";
    }
    // end padding
    for (var j = 0; j < i; j++) {
        outputline += " ";
    }
    print(outputline);
}
