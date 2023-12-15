const fs = require("fs");
const input = fs.readFileSync('./input.txt', 'utf8');
const data = input.replaceAll('\r', '').split("\n").filter(item => item !== '');
const stringToArray = data.map(item => item.split(''))
function numberOfRocksFn(array) {
    return array.map(item => item.filter(element => element === 'O').length)
}
function north(arrays, row, item) {
    const array = arrays
    if(row !== 0) {
        for (let i = row; 0 < i; i--) {
            if(i-1 === 0 && array[i-1][item] === '.') {
                array[row][item] = '.'
                array[i-1][item] = 'O'
                break;
            }
            if(array[i-1][item] === 'O' || array[i-1][item] === '#') {
                array[row][item] = '.'
                array[i][item] = 'O'
                break;
            }
        }
    }
    return array;
}
function west(arrays, row, item) {
    const array = arrays
    for (let i = item; 0 < i; i--) {
        if(i-1 === 0 && array[row][i-1] === '.') {
            array[row][item] = '.'
            array[row][i-1] = 'O'
            break;
        }
        if(array[row][i-1] === 'O' || array[row][i-1] === '#') {
            array[row][item] = '.'
            array[row][i] = 'O'
            break;
        }
    }
    return array;

}
function south(arrays, row, item) {
    const array = arrays;
    for (let i = row; i < array.length-1; i++) {
        if(i+1 === array.length-1 && array[i+1][item] === '.') {
            array[row][item] = '.'
            array[i+1][item] = 'O'
            break;
        }
        if(array[i+1][item] === 'O' || array[i+1][item] === '#') {
            array[row][item] = '.'
            array[i][item] = 'O'
            break;
        }
    }

    return array;
}
function east(arrays, row, item) {
    const array = arrays;
    for (let i = item; i < array[row].length-1; i++) {
        if(i+1 === array[row].length-1 && array[row][i+1] === '.') {
            array[row][item] = '.'
            array[row][i+1] = 'O'
            break;
        }
        if(array[row][i+1] === 'O' || array[row][i+1] === '#') {
            array[row][item] = '.'
            array[row][i] = 'O'
            break;
        }
    }

    return array;
}
function part1() {
    let array = stringToArray
    for (let row = 0; row < array.length; row++) {
        for (let item = 0; item < array[row].length; item++) {
            const rock = array[row][item]
            if(rock === 'O') {
                north(array,row, item)
            }
        }
    }
    const numberOfRocks = numberOfRocksFn(array)
    let sum = 0;
    for (let i = 0; i < numberOfRocks.length; i++) {
        sum += numberOfRocks[i] * (numberOfRocks.length -i)
    }
    console.log('finalNumber part1', sum) //part1 112046
}

function part2() {
    let array = stringToArray
    for (let i = 0; i < 1000; i++) {

        for (let row = 0; row < array.length; row++) {
            for (let item = 0; item < array[row].length; item++) {
                const rock = array[row][item]
                if (rock === 'O') {
                    north(array, row, item);
                }
            }
        }

        for (let row = 0; row < array.length; row++) {
            for (let item = 0; item < array[row].length; item++) {
                const rock = array[row][item]
                if (rock === 'O') {
                    west(array, row, item);
                }
            }
        }


        for (let row = array.length; 0 < row; row--) {
            for (let item = 0; item < array[row - 1].length; item++) {
                const rock = array[row - 1][item]
                if (rock === 'O') {
                    south(array, row - 1, item);
                }
            }
        }

        for (let row = 0; row < array.length; row++) {

            for (let item = array[row].length; 0 < item; item--) {
                const rock = array[row][item - 1]
                if (rock === 'O') {
                    east(array, row, item - 1);
                }
            }
        }
    }
    const numberOfRocks = numberOfRocksFn(array)
    let sum = 0;
    for (let i = 0; i < numberOfRocks.length; i++) {
        sum += numberOfRocks[i] * (numberOfRocks.length -i)
    }
    console.log('finalNumber part2', sum) //part1 104619
}
part1();
part2();
