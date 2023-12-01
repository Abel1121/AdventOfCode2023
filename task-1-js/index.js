const fs = require('fs');

// const numberArray = [];
//
// let finalNumber = 0;
// const wordsObjectNumber = [{value: 'one', number: 1},{value: 'two', number: 2},{value: 'three', number: 3},{value: 'four', number: 4},{value: 'five', number: 5},{value: 'six', number: 6},{value: 'seven', number: 7},{value: 'eight', number: 8},{value: 'nine', number: 9},{value: 'ten', number: 10}]
// try {
//     const input = fs.readFileSync('./input.txt', 'utf8');
//     const splitInput = input.replaceAll('\r', '').split("\n");
//     console.log('splitInput', splitInput.length, splitInput[-1])
//     for (let i=0; i < splitInput.length; i++) {
//         const string = splitInput[i].match(/one|two|three|four|five|six|seven|eight|nine|ten/g);
//
//         const stringArray = [...splitInput[i]];
//         const array = [];
//         for (let j = 0; j < stringArray.length+1; j++) {
//             if (splitInput[i][j] > 0) {
//                 array.push(splitInput[i][j])
//             } else if (string?.length && (splitInput[i]?.indexOf(string?.[0]) === j)) {
//                 array.push(wordsObjectNumber.find((item) => item.value === string?.[0])?.number)
//             } else if (string?.length && (splitInput[i]?.lastIndexOf(string?.[string.length - 1]) === j)) {
//                 array.push(wordsObjectNumber.findLast((item) => item.value === string?.[string.length - 1])?.number)
//             }
//         }
//         console.log('string', stringArray, `${array[0]}${array[array.length-1]}`)
//         finalNumber = finalNumber + Number(`${array[0]}${array[array.length-1]}`)
//     }
//     console.log('finalNumber', finalNumber, numberArray)
// } catch (e) {
//     console.log('error', e)
// }
const input = fs.readFileSync('./input.txt', 'utf8');
const data = input.split("\n");

const getCalibrationTotal = (values) => {
    return values.reduce((sum, current) =>  sum + current.at(0) * 10 + current.at(-1)
        , 0)
}

const part1 = (data) => {
    const numbers = data.map(line => line.match(/\d/g)?.map(Number) || [0]);
    console.log(getCalibrationTotal(numbers))
};

const part2 = (data) => {
    const letterNumbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const numbers = data
        .map(line => [...line.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g)].map(match => match[1])
            .map(n => /\d/.test(n) ? Number(n) : letterNumbers.indexOf(n) + 1))
    console.log(getCalibrationTotal(numbers))
};

part1(data);
part2(data);

