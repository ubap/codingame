"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline_sync_1 = require("readline-sync");
function readline() {
    return readline_sync_1.question('');
}
//---------------
function followPath(map, startRow, startCol) {
    var currRow = startRow;
    var currCol = startCol;
    var pathLength = 0;
    do {
        if (currCol < 0 || currRow < 0 || currRow >= map.length || currCol >= map[currRow].length)
            throw new Error();
        var currentTile = map[currRow].charAt(currCol);
        if (currentTile === '^') {
            currRow--;
            pathLength++;
        }
        else if (currentTile === 'v') {
            currRow++;
            pathLength++;
        }
        else if (currentTile === '<') {
            currCol--;
            pathLength++;
        }
        else if (currentTile === '>') {
            currCol++;
            pathLength++;
        }
        else if (currentTile === 'T')
            return pathLength;
        else
            throw new Error();
    } while (true);
}
var inputs = readline().split(' ');
var width = parseInt(inputs[0]);
var height = parseInt(inputs[1]);
var inputs = readline().split(' ');
var startRow = parseInt(inputs[0]);
var startCol = parseInt(inputs[1]);
var numberOfMaps = parseInt(readline());
var maps = [];
for (var i = 0; i < numberOfMaps; i++) {
    var map = [];
    for (var j = 0; j < height; j++) {
        var mapRow = readline();
        map.push(mapRow);
    }
    maps.push(map);
}
var pathLengths = [];
for (var i = 0; i < numberOfMaps; i++) {
    try {
        var pathLen = followPath(maps[i], startRow, startCol);
        pathLengths.push(pathLen);
    }
    catch (e) {
        pathLengths.push(null);
    }
}
// Write an answer using console.log()
// To debug: console.error('Debug messages...');
console.log('mapIndex');
//# sourceMappingURL=helloworld.js.map