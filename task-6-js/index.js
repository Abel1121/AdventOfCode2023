const fs = require("fs");
const input = fs.readFileSync('./input.txt', 'utf8');
const data = input.replaceAll('\r', '').split("\n");

const numbers = data.map(line => line.split(' ').filter(item => item.replace('Time:', '').replace('Distance:', '') !== ''))
const times = numbers[0]
const distances = numbers[1]

function part1() {
    const trials= [];
    for (let i = 0; i < times.length; i++) {
        let trial = 0
        for (let j = 0; j < times[i]; j++) {
            if(distances[i] < (times[i]-j) * j) {trial++}
        }
        trials.push(trial++);
    }
    const finalNumber = trials.reduce((a,b) => a*b)
    console.log('finalNumber part1', finalNumber)
}
function part2() {
    const time = times.reduce((a,b) => a+b);
    const distance = distances.reduce((a,b) => a+b);
    let trial = 0
    for (let i = 0; i < time; i++) {
        if(distance < (time-i) * i) {trial++}
    }

    console.log('finalNumber part2', trial)
}
part1();
part2();
