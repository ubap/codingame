// LOCAL ENVIRONMENT FUNCTONS
function readline() {
    var readlineSync = require('readline-sync');
    return readlineSync.question('');
}
function print(text) {
    console.log(text);
}
///////////////////////////////////////////////

function calc_dists(position, coords) {
    for (var i = 0; i < coords.length; i++) {
        var coord = coords[i];
        coord[2] = Math.sqrt(Math.pow(position[0] - coord[0], 2) + Math.pow(position[1] - coord[1], 2));
        coords[i] = coord; 
    }
}

var coords = [];

const N = parseInt(readline());
for (let i = 0; i < N; i++) {
    var inputs = readline().split(' ');
    const X = parseInt(inputs[0]);
    const Y = parseInt(inputs[1]);
    coords.push([X, Y, 0]);
}

var position = coords[0];
var start = position;
var dist = 0;

while (coords.length != 0) {
    position = coords[0];
    coords.splice(0, 1);
    dist += position[2];
    calc_dists(position, coords);
    coords.sort(function compare(a, b) {
        return a[2] - b[2];
    });
}

coords.push(start);
calc_dists(position, coords);
dist += coords[0][2];

print(Math.floor(dist + 0.5));