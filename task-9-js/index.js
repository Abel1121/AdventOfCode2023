const fs = require("fs");
const input = fs.readFileSync('./input.txt', 'utf8');
const data = input.replaceAll('\r', '').split("\n").filter(item => item !== '');

function calculateAnotherNumber(array) {
    const lines = [array];
    let line = [];
    for (let i = 0; i < lines.length; i++) {
        let arrayLength
        let isAllZero = true;

        while(isAllZero) {
            arrayLength = lines.length-1
            isAllZero = lines[arrayLength].every(item => item === 0)
            if(isAllZero) {
                break;
            }
            for (let j = 0; j < lines[arrayLength].length-1; j++) {
                line.push(lines[arrayLength][j + 1] - lines[arrayLength][j])
            }
            lines.push(line)
            line = []
        }
    }
    lines[lines.length-1].push(0)
    for (let i = lines.length-2; i > 0; i--) {
        lines[i-1].push(lines[i][lines[i].length-1] + lines[i-1][lines[i-1].length-1])
    }
    //console.log('last number', lines[0][lines[0].length-1])
    return lines[0][lines[0].length-1]
}
function part1() {
    const array = data.map(item => item.split(' ').map(item => Number(item)))
    let sum = 0;

    for (let i = 0; i < array.length; i++) {
        sum += calculateAnotherNumber(array[i])
    }
    console.log('final number part1', sum)

}

function part2() {
    const array = data.map(item => item.split(' ').map(item => Number(item)))
    let sum = 0;

    for (let i = 0; i < array.length; i++) {
        sum += calculateAnotherNumber(array[i].reverse())
    }
    console.log('final number part2', sum)

}
part1();
part2();
