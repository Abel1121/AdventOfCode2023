const fs = require("fs");
const input = fs.readFileSync('./input.txt', 'utf8');
const data = input.replaceAll('\r\n', '').replaceAll('\n', '').split(',').filter(item => item !== '');


function hashAlgorithm(char, sum) {
    return (char.charCodeAt(0) + sum) * 17 % 256
}
function stepToNumber(step) {
    return step.split('').reduce((acc, value) => hashAlgorithm(value, acc), 0)
}
function findInArray(array, data) {
    for (let i = 0; i < array?.length; i++) {
        let arrayI = array[i].slice(0, -2)
        if (arrayI === data) {
            return i
        }
    }
    return null
}
function part1() {
    console.log('finalNumber par1', data.reduce((acc, value) => acc + stepToNumber(value), 0)) // 510203
}

function part2() {
    const boxes = new Array(256).fill().map(() => ([]));
    const inputLength = data.length;
    for (let i = 0; i < inputLength; i++) {
        if (data[i].includes('-')) {
            const box = stepToNumber(data[i].slice(0, -1))
            stepToNumber(data[i].slice(0, -1))
            const indexToDelete = findInArray(boxes[box], data[i].slice(0, -1))
            if(typeof indexToDelete === "number") {
                boxes[box].splice(indexToDelete,1)
            }
        } else {
            const box = stepToNumber(data[i].slice(0, -2))
            const lens = data[i].replace('=', ' ')
            const indexToDelete = findInArray(boxes[box], data[i].slice(0, -2))
            if(typeof indexToDelete === "number") {
                boxes[box][indexToDelete] = lens
            } else {
                boxes[box].push(lens)
            }
        }
    }
    let sumLens = 0;
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].map((item, index) => {
            sumLens += (i+1) * (index + 1) * item[item.length-1]
        })
    }
    console.log('finalNumber par2', sumLens)
}
part1();
part2();
