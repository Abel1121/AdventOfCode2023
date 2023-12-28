const fs = require("fs");
const input = fs.readFileSync('./input.txt', 'utf8');
const data = input.replaceAll('\r', '').split('\n').filter(item => item !== '').map(item => item.split(' '));

function changeArray(positionFrom, positionTo, a) {
    const array = a;

    if (positionFrom[1] !== positionTo[1]) {
        array[positionFrom[0]].map((item, index) => {
            if(index >= positionFrom[1] && index <= positionTo[1]) {
                return array[positionFrom[0]][index] = '#'
            }
        })
    } else {
        array.map((item, index) => {
            if(index >= positionFrom[0] && index <= positionTo[0]) {
                return array[index][positionFrom[1]] = '#'
            }
        })
    }
    return array;
}
function digInterior(a) {
    const array = a

    for (let row = 0; row < array.length; row++) {
        const arrayIndex = []
        array[row].map((item, index) => {
            if(item === '#') {
                return arrayIndex.push(index);
            }
        })
        console.log('arrayIndex',arrayIndex)
        const arrayIndexFiltered = []
        for (let i = 1; i < arrayIndex.length; i++) {
            //if((Math.abs(arrayIndex[i] - arrayIndex[i+1])) === 1) {
                arrayIndexFiltered.push([arrayIndex[i-1],arrayIndex[i]])
            //}
        }
        const filtered = arrayIndexFiltered.reverse().filter(item => (Math.abs(item[0] - item[1]) > 1)).filter((item, index) => !(index%2))
        console.log('arrayIndexFiltered', arrayIndexFiltered)
        console.log('filtered',filtered)
        for (let column = 0; column < array[column].length; column++) {
            const isForChange = filtered.filter(item => item[0] <= column && item[1] >= column)
            //console.log('isForChange', isForChange)
            if( isForChange.length) {
                array[row][column] = '#'
            }
        }
    }
    return array
}
function positionFn(data, a, pos) {
    let array = a
    let position = pos ?? [0,0]
    const positionArray = []
    for (let i = 0; i < data.length; i++) {
        if (data[i][0] === 'R') {
            const positionTo = [...position];
            positionTo[1] = positionTo[1] += +data[i][1]

            array ? array = changeArray(position, positionTo, array) : null
            position = positionTo
        }
        else if (data[i][0] === 'L') {
            const positionTo = [...position];
            positionTo[1] = positionTo[1] -= +data[i][1]
            array ? array = changeArray(positionTo, position, array) : null
            position = positionTo
        }
        else if (data[i][0] === 'D') {
            const positionTo = [...position];
            positionTo[0] = positionTo[0] += +data[i][1]
            array ? array = changeArray(position, positionTo, array) : null
            position = positionTo
        }
        else if (data[i][0] === 'U') {
            const positionTo = [...position];
            positionTo[0] = positionTo[0] -= +data[i][1]
            array ? array = changeArray(positionTo, position, array) : null
            position = positionTo
        }
        positionArray.push(position)
    }
    if(!array) {
        const leftRight = positionArray.map(item => item[0])
        const topDown = positionArray.map(item => item[1])
        const leftMin = Math.min(...leftRight)
        const leftMax = Math.max(...leftRight)
        const topMin = Math.min(...topDown)
        const topMax = Math.max(...topDown)
        return {leftMin, leftMax, topMin, topMax}
    }
    return {array, positionArray}
}
function part1() {
    //const size = checkHoleSize(data)

    const size = positionFn(data);
    console.log('size', size);
    let array = new Array(Math.abs(size.leftMin) + Math.abs(size.leftMax)+1).fill().map(() => (new Array(Math.abs(size.topMin) + Math.abs(size.topMax)+1).fill().map(() => ('.'))))
    array[Math.abs(size.leftMin)][Math.abs(size.topMin)] = '#'
    //console.log('array00', array)
    let position = [Math.abs(size.leftMin), Math.abs(size.topMin)]
    let positionArray = [position]
    array = positionFn(data, array, position).array


    //console.log('array0 \n', array.map(item => item.join() + '\n').join().replaceAll(',', ''))
    array = digInterior(array)
    console.log('array1 \n', array.map(item => item.join() + '\n').join().replaceAll(',', ''))
    let sum = 0;
    array.map(item => sum += item.filter(el => el === '#').length)
    console.log('finalNumber par1', sum);
}

function part2() {
}
part1();
//part2();
