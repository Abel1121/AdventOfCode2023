const fs = require("fs");
const input = fs.readFileSync('./test3.txt', 'utf8');
const data = input.replaceAll('\r', '').split("\n");
const regex = /(?:,|=|\(|\))/gi
const lines = data.filter((line,index) => line !== '' && index !== 0).map(line => line.replaceAll(regex, '').split(' ').filter((item, index) => index !== 1))
const instruction = data[0]

function finNavigate(find) {
    return lines.filter(line => line[0] === find )
}
function takeNavigate(line, side) {
    let sides = side === 'L' ? 1 : 2;
    return line.flat()[sides]
}
function doStep(startWith,endWhen) {
    let howManySteps = 0;
    let results = ''
    let side = 0
    let line;
    line = finNavigate(startWith)
    results = takeNavigate(line, instruction[side]);
    console.log('results', results, instruction[side], side)
    side = 1;
    do {
        line = finNavigate(results)
        results = takeNavigate(line, instruction[side]);
        console.log('results', results, instruction[side], side)

        howManySteps += 1;
        side = side === instruction.length-1 ? 0 : side + 1;
    } while (endWhen.includes(results));
    return howManySteps
}
function part1() {
    const endWhen = 'ZZZ'
    const startWith = 'AAA'
    let howManySteps = 0;
    howManySteps += doStep(startWith,[endWhen])

    console.log('finalNumber part1', howManySteps+1); //16043
}

// function part2() {
//     const allEndedOnA = lines.filter(line => line[0][2] === 'A').map(line => line[0]);
//     const allEndedOnZ = lines.filter(line => line[0][2] === 'Z').map(line => line[0]);
//
//     console.log('allEndedOnA',allEndedOnA);
//     console.log('allEndedOnZ',allEndedOnZ);
//
//     let howManySteps = 0;
//     const allEnded = [...allEndedOnZ.map(() => false)]
//     const steps = [...allEndedOnA]
//     console.log(allEnded, steps)
//
//     do {
//         line = finNavigate(results)
//         results = takeNavigate(line, instruction[side]);
//         console.log('results', results, instruction[side], side)
//
//         howManySteps += 1;
//         side = side === instruction.length-1 ? 0 : side + 1;
//     } while (allEnded.every(item => item === true));
//
//
//     console.log('finalNumber part2', howManySteps); //16043
// }
//part1();
part2();
