const fs = require("fs");
const input = fs.readFileSync('./input.txt', 'utf8');
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
    side = 1;
    do {
        line = finNavigate(results)
        results = takeNavigate(line, instruction[side]);

        howManySteps += 1;
        side = side === instruction.length-1 ? 0 : side + 1;
    } while (!endWhen.includes(results));
    return howManySteps
}
function part1() {
    const endWhen = 'ZZZ'
    const startWith = 'AAA'
    let howManySteps = 0;
    howManySteps += doStep(startWith,[endWhen])

    console.log('finalNumber part1', howManySteps+1); //16043
}

function part2() {
    let currentNodes = lines.filter(line => line[0][2] === 'A').map(line => line[0]);

    let stepsArray = [];
    for (let i = 0; i < currentNodes.length; i++) {
        let stepToReachEnd = 0;
        let instructionIndex = 0;
        let current = currentNodes[i];

        while (!current.endsWith("Z")) {
            if (instructionIndex === instruction.length) {
                instructionIndex = 0;
            }

            let direction = instruction[instructionIndex]
            current = direction === "L" ? finNavigate(current)[0][1] : finNavigate(current)[0][2];
            stepToReachEnd++;
            instructionIndex++;
        }
        stepsArray.push(stepToReachEnd);
    }

    const stepToReachEnd = stepsArray.reduce((acc, curr) => nww(acc, curr), 1);

    console.log("Part 2: ", stepToReachEnd);
}
function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
}

function nww(a, b) {
    return (a * b) / gcd(a, b);
}
part1();
part2();
