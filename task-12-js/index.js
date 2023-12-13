const fs = require("fs");
const input = fs.readFileSync('./input.txt', 'utf8');
const data = input.replaceAll('\r', '').split("\n").filter(item => item !== '');
const stringToArray = data.map(item => item.split(''))

function part1() {

}
