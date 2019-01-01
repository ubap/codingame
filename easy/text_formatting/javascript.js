// LOCAL ENVIRONMENT FUNCTONS
function readline() {
    var readlineSync = require('readline-sync');
    return readlineSync.question('');
}
function print(text) {
    console.log(text);
}

//////////////////////////////////////////////////////////////////
// HELPERS
var isAlpha = function(ch) {
    return /^[A-Z]$/i.test(ch);
}
//////////////////////////////////////////////////////////////////

var intext = readline();

finished = false;
while (!finished) {
    finished = true;
    // * Only a single space between words (remove excessive spaces);
    while (true) {
        var edited = intext.replace("  ", " ");
        if (edited === intext) break;
        intext = edited;
    }

    // * No spaces before punctuation marks;
    var punctuation_marks = [",", "."];
    punctuation_marks.forEach(function(punctuation_mark) {
        while (true) {
            var edited = intext.replace(" " + punctuation_mark, punctuation_mark);
            if (edited === intext) break;
            intext = edited;
        }
    });

    intext = intext.toLowerCase();
    // add whitespaces after punctation marks
    intext = intext.split('')
    var i = 0;
    while (i < intext.length - 1) {
        if (punctuation_marks.includes(intext[i]) && intext[i+1] != ' ') {
            intext.splice(i+1, 0, " ");
            i+=1;
        }
        i+=1;
    }

    // Use only lowercase letters, except for the beginning of the sentence (after a dot);
    intext[0] = intext[0].toUpperCase();
    for (var i = 0; i < intext.length - 2; i++) {
        if (intext[i] == ".") {
            intext[i+2] = intext[i+2].toUpperCase();
        }
    }

    // Remove duplicate punctation marks
    for (var i = 0; i < intext.length - 2; i++) {
        if (punctuation_marks.includes(intext[i]) && !isAlpha(intext[i+2])) {
            intext[i] = " ";
            finished = false;
        }
    }

    intext = intext.join("");
}

print(intext);