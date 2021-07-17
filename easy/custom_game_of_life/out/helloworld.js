"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline_sync_1 = require("readline-sync");
function readline() {
    return readline_sync_1.question('');
}
function getCounts(row) {
    var numbers = [];
    for (var i = 0; i < row.length; i++) {
        var char = row.charAt(i);
        if (char == '1') {
            numbers.push(i);
        }
    }
    return numbers;
}
function getNumberOfNeighbours(map, x, y) {
    var numberOfNeighbours = 0;
    if (x - 1 >= 0 && y - 1 >= 0 && map[y - 1][x - 1] === 'O')
        numberOfNeighbours++;
    if (x - 1 >= 0 && map[y][x - 1] === 'O')
        numberOfNeighbours++;
    if (x - 1 >= 0 && y + 1 < map.length && map[y + 1][x - 1] === 'O')
        numberOfNeighbours++;
    if (y - 1 >= 0 && map[y - 1][x] === 'O')
        numberOfNeighbours++;
    if (y + 1 < map.length && map[y + 1][x] === 'O')
        numberOfNeighbours++;
    if (x + 1 < map[y].length && y - 1 >= 0 && map[y - 1][x + 1] === 'O')
        numberOfNeighbours++;
    if (x + 1 < map[y].length && map[y][x + 1] === 'O')
        numberOfNeighbours++;
    if (x + 1 < map[y].length && y + 1 < map.length && map[y + 1][x + 1] === 'O')
        numberOfNeighbours++;
    return numberOfNeighbours;
}
var inputs = readline().split(' ');
var h = parseInt(inputs[0]);
var w = parseInt(inputs[1]);
var n = parseInt(inputs[2]);
var alive = readline();
var dead = readline();
var aliveCounts = getCounts(alive);
var deadCounts = getCounts(dead);
// parse map into memory
var map = [];
for (var i = 0; i < h; i++) {
    var line = readline();
    map.push([]);
    for (var j = 0; j < line.length; j++) {
        var char = line.charAt(j);
        map[i].push(char);
    }
}
// process turns
for (var turn = 0; turn < n; turn++) {
    var mapAfterTurn = [];
    for (var i = 0; i < map.length; i++) {
        mapAfterTurn.push([]);
        for (var j = 0; j < map[i].length; j++) {
            var numberOfNeighbours = getNumberOfNeighbours(map, j, i);
            if (map[i][j] === 'O') {
                if (aliveCounts.indexOf(numberOfNeighbours) == -1) {
                    mapAfterTurn[i].push('.');
                }
                else {
                    mapAfterTurn[i].push('O');
                }
            }
            if (map[i][j] === '.') {
                if (deadCounts.indexOf(numberOfNeighbours) == -1) {
                    mapAfterTurn[i].push('.');
                }
                else {
                    mapAfterTurn[i].push('O');
                }
            }
        }
    }
    map = mapAfterTurn;
}
for (var i = 0; i < map.length; i++) {
    var row = "";
    for (var j = 0; j < map[i].length; j++) {
        row = row + map[i][j];
    }
    console.log(row);
}
//# sourceMappingURL=helloworld.js.map