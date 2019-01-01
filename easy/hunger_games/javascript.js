function readline() {
    var readlineSync = require('readline-sync');
    return readlineSync.question('');
}
function print(text) {
    console.log(text);
}

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
var kills = {}
var deaths = {}
var player_names = []

const tributes = parseInt(readline());
for (let i = 0; i < tributes; i++) {
    const playerName = readline();
    kills[playerName] = [];
    deaths[playerName] = null;
    player_names.push(playerName);
}
const turns = parseInt(readline());
for (let i = 0; i < turns; i++) {
    const info = readline();
    var tokens = info.split(" ");
    var killer = tokens[0];
    for (let j = 2; j < tokens.length; j++) {
        var killed = tokens[j].replace(",", "");
        kills[killer].push(killed);
        deaths[killed] = killer;
    }
}

var end = "";
player_names.sort()
player_names.forEach(function(playerName) {
    print(end + 'Name: ' + playerName);
    end = "\n";
    var killedString = "";

    if (kills[playerName].length == 0) {
        killedString = "None";
    } else {
        kills[playerName].sort()
        var separator = "";
        kills[playerName].forEach(function(killed) {
            killedString += separator + killed;
            separator = ", ";
        });
    }
    print('Killed: ' + killedString);
    if (deaths[playerName] != null) {
        print('Killer: ' + deaths[playerName]);
    } else {
        print('Killer: Winner');
    }
});

