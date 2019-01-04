function readline() {
    var readlineSync = require('readline-sync');
    return readlineSync.question('');
}
function print(text) {
    console.log(text);
}
//////////////////////////////////////////////////////////////////
function ip4dot2num(dot) {
    var d = dot.split(".");
    return ((((((+d[0])*256)+(+d[1]))*256)+(+d[2]))*256)+(+d[3]);
}
function ip4num2dot(int) {
    var part1 = int & 255;
    var part2 = ((int >> 8) & 255);
    var part3 = ((int >> 16) & 255);
    var part4 = ((int >> 24) & 255);
    return part4 + "." + part3 + "." + part2 + "." + part1;
}
//////////////////////////////////////////////////////////////////
const line = readline();
var [ip, mask] = line.split("/");

mask = parseInt(mask);
var maskBytes = 0;
for (var i = 0; i < mask; i++) {
    maskBytes = maskBytes | (1 << 31-i);
}

var ip_num = ip4dot2num(ip);

var network_address = ip_num & maskBytes;

var broadcast = network_address | (0xFFFFFFFF^maskBytes);

print(ip4num2dot(network_address));
print(ip4num2dot(broadcast));